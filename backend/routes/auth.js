require('dotenv').config();
require('../config/passport');

const   express     = require('express'),
        cookieParser = require('cookie-parser'),
        passport    = require('passport'),
        bcrypt      = require('bcrypt'),
        db          = require('../models'),
        jwt         = require('jsonwebtoken');

const app = express();
app.use(cookieParser());
app.use(express.json());

const User = db.User;


app.post('/register', async (req, res) => {
    const { username, password } = req.body;
    const hashCost = 10;
    try {
        const passwordHash = await bcrypt.hash(password, hashCost);
        const userDocument =  new User({ username, passwordHash });
        await userDocument.save()
        console.log(username)
        res.status(200).send({ username });
    } catch (error) {
        res.status(400).send({
            error: 'req body should take the form {username, password}',
        });
    }
})

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

  app.get('/logout', (req, res) => {
    req.logout();
    res.status(200).cookie('access_token', '', {maxAge: 0, expires: Date.now(), httpOnly: true}).end()
  })

  module.exports = app;