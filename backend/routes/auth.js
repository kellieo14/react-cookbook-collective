require('dotenv').config();
require('../config/passport');

const   express     = require('express'),
        cookieParser = require('cookie-parser'),
        passport    = require('passport'),
        bcrypt      = require('bcrypt'),
        db          = require('../models'),
        jwt         = require('jsonwebtoken'), 
        Recipe      = require('../models/recipe');
        verifyToken = require('../middleware/middleware');

const app = express();
app.use(cookieParser());
app.use(express.json());

const User = db.User;



//REGISTER NEW USER
app.post('/register', async (req, res) => {
    const { username, password } = req.body;
    const hashCost = 10;
    if (password.length > 0 && username.length > 0) {
      try {
        const passwordHash = await bcrypt.hash(password, hashCost);
        const userDocument =  new User({ username, passwordHash });
        await userDocument.save()
        res.sendStatus(200);
    } catch (error) {
        console.log('error from back end', error)
        if (error.code === 11000) {
          res.status(400).send({
            error: `The username \'${username}\' already exists.`
          });
        }
    }
    } else {
      res.status(400).send({
        error: 'You must input a password'
      })
    }

})


//LOGIN USER
app.post('/login', (req, res) => {
    passport.authenticate(
      'local',
      { session: false },
      (error, user) => {
        if (error || !user) {
          res.status(400).json({ error });
        } 
        
        /** This is what ends up in our JWT */
        const payload = {
          username: user.username,
          id: user._id,
        };

        /** assigns payload to req.user */
        req.login(payload, {session: false}, (error) => {
          if (error) {
            res.status(400).send({ error });
          }
        //   /** generate a signed json web token and return it in the response */
          const token = jwt.sign(payload, process.env.SECRET);
         
          
          /** assign our jwt to the cookie */
          res.cookie('access_token', token, {
            httpOnly: true,
            maxAge: 90000000000000, 
          });
     
          res.status(200).end();

        });
      },
    )(req, res);
  });

  //LOGOUT USER
  app.get('/logout', (req, res) => {
    req.logout();
    res.status(200).cookie('access_token', '', {maxAge: 0, expires: Date.now(), httpOnly: true}).end()
  })


//GET USER PROFILE
  app.get('/profile/:id', verifyToken, 
  (req, res) => {
    const token = req.cookies.access_token;
    const decoded = jwt.verify(token, process.env.SECRET);
    User.findById(req.params.id, function(err, user) {
      if(err || !user) {
        console.log('error from :id route:', req.url);
    } else if (user.id != decoded.id) {
        res.sendStatus(401);
    } else {
        Recipe.find({'owner.id': user._id, 'thumbtacked': true}, function(err, recipes) {
          if (err) {
            console.log(err);
          } else {
            res.send({username: user.username, userId: user._id, recipes});

          }
        })
    }
    })
  }
)

//DELETE USER ACCOUNT
app.delete('/profile/:id', verifyToken, 
    (req, res) => {
        const token = req.cookies.access_token;
        const decoded = jwt.verify(token, process.env.SECRET);
    User.findByIdAndRemove(req.params.id, function(err, user){
        if (err) {
            res.send(err);
        } else if (req.params.id != decoded.id) {
            res.sendStatus(401);
        }
        res.status(200).cookie('access_token', '', {maxAge: 0, expires: Date.now(), httpOnly: true}).end()
    })
})

  module.exports = app;