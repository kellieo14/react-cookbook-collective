require('dotenv').config();
const passport      = require('passport'),
      LocalStrategy = require('passport-local').Strategy,
      db            = require('../models'),
      User          = db.User,
      JwtStrategy   = require('passport-jwt').Strategy,
      ExtractJwt    = require('passport-jwt').ExtractJwt,
      bcrypt        = require('bcrypt');
    //   ExtractJwt    = passportJWT.ExtractJwt;

passport.use(new LocalStrategy({
  usernameField: 'username',
  passwordField: 'password',
}, async (username, password, done) => {
  try {
      const userDocument =  await User.findOne({username: username}).exec();
      const passwordsMatch = await bcrypt.compare(password, userDocument.passwordHash);
      if (passwordsMatch) {
          return done(null, userDocument);
      } else {
          return done('Incorrect Username / Password');
      }
  } catch (error) {
      done(error)
  }
}));

const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('access_token');
opts.secretOrKey = process.env.SECRET
passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
    console.log(jwt_payload);
    User.findOne({id: jwt_payload.sub}, function(err, user) {
        if (err) {
            return done(err, false);
        }
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
            // or you could create a new account
        }
    });
        
   
        return done (null, jwt_payload);
        
}))









// const passport      = require('passport'),
//       LocalStrategy = require('passport-local').Strategy,
//       db            = require('../models'),
//       User          = db.User,
//       passportJWT   = require('passport-jwt'),
//       JWTStrategy   = passportJWT.Strategy,
//       bcrypt        = require('bcrypt'),
//       ExtractJwt    = passportJWT.ExtractJwt;


// const jwtSecret = require ( './jwtConfig');
// const bcrypt =require('bcrypt');
// const db = require('../models');

// const BCRYPT_SALT_ROUNDS = 12;

// const passport = require('passport'),
//   localStrategy = require('passport-local').Strategy,
//   User = db.User,
//   JWTstrategy = require('passport-jwt').Strategy,
//   ExtractJWT = require('passport-jwt').ExtractJwt;

// passport.use(
//   'register',
//   new localStrategy(
//     {
//       usernameField: 'username',
//       passwordField: 'password',
//       session: false,
//     },
//     (username, password, done) => {
//       try {
//         User.findOne({
//           where: {
//             username: username,
//           },
//         }).then(user => {
//           if (user != null) {
//             console.log('username already taken');
//             return done(null, false, { message: 'username already taken' });
//           } else {
//             bcrypt.hash(password, BCRYPT_SALT_ROUNDS).then(hashedPassword => {
//               User.create({ username, password: hashedPassword }).then(user => {
//                 console.log('user created');
//                 // note the return needed with passport local - remove this return for passport JWT to work
//                 return done(null, user);
//               });
//             });
//           }
//         });
//       } catch (err) {
//         done(err);
//       }
//     },
//   ),
// );

// passport.use(
//   'login',
//   new localStrategy(
//     {
//       usernameField: 'username',
//       passwordField: 'password',
//       session: false,
//     },
//     (username, password, done) => {
//       try {
//         User.findOne({
//           where: {
//             username: username,
//           },
//         }).then(user => {
//           if (user === null) {
//             return done(null, false, { message: 'bad username' });
//           } else {
//             bcrypt.compare(password, user.password).then(response => {
//               if (response !== true) {
//                 console.log('passwords do not match');
//                 return done(null, false, { message: 'passwords do not match' });
//               }
//               console.log('user found & authenticated');
//               // note the return needed with passport local - remove this return for passport JWT
//               return done(null, user);
//             });
//           }
//         });
//       } catch (err) {
//         done(err);
//       }
//     },
//   ),
// );

// const opts = {
//   jwtFromRequest: ExtractJWT.fromAuthHeaderWithScheme('JWT'),
//   secretOrKey: jwtSecret.secret,
// };

// passport.use(
//   'jwt',
//   new JWTstrategy(opts, (jwt_payload, done) => {
//     try {
//       User.findOne({
//         where: {
//           username: jwt_payload.id,
//         },
//       }).then(user => {
//         if (user) {
//           console.log('user found in db in passport');
//           // note the return removed with passport JWT - add this return for passport local
//           done(null, user);
//         } else {
//           console.log('user not found in db');
//           done(null, false);
//         }
//       });
//     } catch (err) {
//       done(err);
//     }
//   }),
// );