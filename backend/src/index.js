
require('dotenv').config();
require('../config/passport');

const   express     = require('express'),
        mongoose    = require('mongoose'),
        bodyParser  = require('body-parser'),
        Cors        = require('cors'),
        cookieParser = require('cookie-parser'),
        passport    = require('passport');

const app = express();
app.use(cookieParser());
app.use(express.json());
mongoose.Promise = global.Promise;

app.use(Cors({ origin: 'http://localhost:3000', credentials: true}));

const port = process.env.PORT || 8081;

//to config API to use body body-parser and look for JSON in req.body
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(passport.initialize());

//  Prevent CORS errors
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
  
// //  Remove caching
    res.setHeader('Cache-Control', 'no-cache', 'no-store', 'must-revalidate');
    next();
  });

// Require Routes
const   recipeRoutes    = require('../routes/recipes'),
        authRoutes      = require('../routes/auth');


app.use(recipeRoutes);
app.use(authRoutes);

app.use((err, req, res, next) => {
  res.json(err);
})


app.listen(port, () => {
    console.log(`Server running on port ${port}`)
  });



// require('dotenv').config();
// require('../config/passport');
// const   express     = require('express');
// const   mongoose    = require('mongoose');
// const   bodyParser  = require('body-parser');
// const   Cors        = require('cors');
// const   db          = require('../models');
// const   Recipe      = require('../models/recipe');
// const   passport    = require('passport');
// const   LocalStrategy = require('passport-local').Strategy;
// const   passportJWT = require('passport-jwt');
// const   JWTStrategy = passportJWT.Strategy;
// const   ExtractJwt = passportJWT.ExtractJwt;
// const   bcrypt      = require('bcrypt');
// const   jwt         = require('jsonwebtoken');

// const app = express();
// mongoose.Promise = global.Promise;

// app.use(Cors());

// const User = db.User;
// const port = process.env.PORT || 8081;



// //to config API to use body body-parser and look for JSON in req.body
// app.use(bodyParser.urlencoded({extended: false}));
// app.use(bodyParser.json());

// app.use(passport.initialize());


// passport.use(new LocalStrategy({
//     usernameField: 'username',
//     passwordField: 'password',
// }, async (username, password, done) => {
//     try {
//         const userDocument =  await User.findOne({username: username}).exec();
//         const passwordsMatch = await bcrypt.compare(password, userDocument.passwordHash);
//         if (passwordsMatch) {
//             return done(null, userDocument);
//         } else {
//             return done('Incorrect Username / Password');
//         }
//     } catch (error) {
//         done(error)
//     }
// }));

// //   //Prevent CORS errors
// app.use(function (req, res, next) {
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     res.setHeader('Access-Control-Allow-Credentials', 'true');
//     res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
//     res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
  
// //     //Remove caching
//     res.setHeader('Cache-Control', 'no-cache');
//     next();
//   });

// const opts = {}
// opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('JWT');
// opts.secretOrKey = process.env.SECRET
// passport.use(new JWTStrategy(opts, (jwt_payload, done) => {
//     console.log(jwt_payload);
//     if (Date.now() > jwt_payload.expires) {
//         console.log('expired');
//         return done ('jwt expired');
//     }
//         // User.findById({_id:jwt_payload.id})
//         console.log('jwt_payload', jwt_payload);
//         return done (null, jwt_payload);
        
// })),

  
// // app.use((err, req, res, next) => {
// //     console.log(err);
// //     next();
// //   });



// //------------------------------ROUTES------------------------------------


// //GET ALL RECIPES
// app.get('/recipes',
// passport.authenticate('jwt', {session: false}),
//     (req, res) => {
//             Recipe.find({}, function(err, recipes){
//                 if(err){
//                     res.redirect('/')
//                 } else {
//                     res.send(recipes)
//                 }
//             })
//     }   
// )

// // GET RECIPE BY ID
// app.get('/recipes/:id', (req, res) => {
//     Recipe.findById(req.params.id, function(err, recipe){
//         if(err || !recipe) {
//             res.redirect('/')
//         } else {
//             res.send(recipe);
//         }
//     })
// })

// //POST NEW RECIPE
// app.post('/recipes', 
//     (req, res) => {
    
//     const {title, author, ingredients, directions, notes, categories} = req.body;

//     const newRecipe = {
//         title, 
//         author, 
//         ingredients,
//         directions,
//         notes, 
//         categories, 
//     }
//     Recipe.create(newRecipe);
//     res.status(200).send();
// })

// //EDIT RECIPE
// app.get('/recipes/:id/edit', function (req, res) {
//     Recipe.findById(req.params.id, function(err, recipe){
//         if(err || !recipe) {
//             res.redirect('/')
//         } else {
//             res.send(recipe);
//         }
//     })
// })

// //UPDATE RECIPE
// app.put('/recipes/:id', (req, res) => {
//     Recipe.findByIdAndUpdate({_id:req.params.id}, req.body, function(err){
//         if (err) {
//             res.send('error');
//         }
//     })
// })

// //DELETE RECIPE
// app.delete('/recipes/:id', (req, res) => {
//     Recipe.findByIdAndRemove(req.params.id, function(err){
//         if (err) {
//             res.send(err);
//         }
    
//     })
// })


// //=============================USER ROUTES==================

// app.post('/register', async (req, res) => {
//     const { username, password } = req.body;
//     const hashCost = 10;
//     try {
//         const passwordHash = await bcrypt.hash(password, hashCost);
//         const userDocument =  new User({ username, passwordHash });
//         await userDocument.save()
//         console.log(username)
//         res.status(200).send({ username });
//     } catch (error) {
//         res.status(400).send({
//             error: 'req body should take the form {username, password}',
//         });
//     }
// })

// app.post('/login', (req, res) => {
//     passport.authenticate(
//       'local',
//       { session: false },
//       (error, user) => {
        
//         if (error || !user) {
//           res.status(400).json({ error });
//         } 
        
//         /** This is what ends up in our JWT */
//         const payload = {
//           username: user.username,
//           id: user._id,
//           expires: Date.now() + parseInt(process.env.JWT_EXPIRATION_MS),
//         };
//         console.log("payload", payload);
  
//         /** assigns payload to req.user */
//         req.login(payload, {session: false}, (error) => {
//           if (error) {
//             res.status(400).send({ error });
//           }
  
//         //   /** generate a signed json web token and return it in the response */
//           const token = jwt.sign(payload, process.env.SECRET);
//           console.log('token', token);
          
//           /** assign our jwt to the cookie */
//         //   res.cookie('jwt', token, { httpOnly: true, secure: true });
//           return res.json({ token })
//             // res.status(200).send({ token });
//         });
//       },
//     )(req, res);
//   });



// app.listen(port, () => {
//     console.log(`Server running on port ${port}`)
//   });
