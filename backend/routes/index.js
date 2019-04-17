
require('../config/passport');
const   express     = require('express'),
        cookieParser= require('cookie-parser'),
        bodyParser  = require('body-parser');
        
const app = express();
app.use(cookieParser());
app.use(bodyParser.json());



// //GET ALL RECIPES
app.get('*', 
    (req, res) => {
        res.render(req.url);
    }   
)

module.exports = app;
