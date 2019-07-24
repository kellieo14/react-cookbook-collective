
require('dotenv').config();
require('../config/passport');

const   express     = require('express'),
        mongoose    = require('mongoose'),
        bodyParser  = require('body-parser'),
        Cors        = require('cors'),
        cookieParser = require('cookie-parser'),
        passport    = require('passport');

console.log(__dirname);
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
    // res.setHeader('Cache-Control', 'no-cache', 'no-store', 'must-revalidate');
    res.setHeader('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');    
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
