
require('../config/passport');
const   express     = require('express'),
        cookieParser= require('cookie-parser'),
        bodyParser  = require('body-parser'),
        jwt         = require('jsonwebtoken'),
        verifyToken = require('../middleware/middleware'),
        Recipe      = require('../models/recipe');
        
const app = express();
app.use(cookieParser());
app.use(bodyParser.json());



app.get('/', async (req, res) => {
    const token = req.cookies.access_token;
        if (token) {
            const decoded = jwt.verify(token, process.env.SECRET);
            res.send(decoded);
        } else {
            res.send(null)
        }
})

// GET ALL RECIPES
app.get('/recipes', verifyToken,
    (req, res) => {
        const token = req.cookies.access_token;
        const decoded = jwt.verify(token, process.env.SECRET);
        Recipe.find({ 'owner.id': decoded.id }, function(err, recipes){
            if(err){
                console.log(err)
            } else {
                res.send(recipes);
            }
        })
    }   
)

// CHECK TOKEN FOR NEW ROUTE
app.get('/recipes/new', verifyToken,
    (req, res) => {
    const token = req.cookies.access_token;
    const decoded = jwt.verify(token, process.env.SECRET);
    res.sendStatus(200);
    }
)


// GET RECIPE BY ID
app.get('/recipes/:id', verifyToken,
(req, res) => {
    const token = req.cookies.access_token;
    const decoded = jwt.verify(token, process.env.SECRET);
 
    Recipe.findById(req.params.id, function(err, recipe){
        if(err || !recipe) {
            console.log('error from :id route:', req.url);
        } else if (recipe.owner.id != decoded.id) {
            res.sendStatus(401);
        } else {
            res.send(recipe);
        }
    })
})


//POST NEW RECIPE
app.post('/recipes', verifyToken, 
    (req, res) => {
        const token = req.cookies.access_token;
        const decoded = jwt.verify(token, process.env.SECRET);

    const {title, author, ingredients, directions, notes, categories} = req.body;
    const owner = {
            id: decoded.id
        }
    const newRecipe = {
        title, 
        author, 
        ingredients,
        directions,
        notes, 
        categories, 
        owner: owner
    }
    Recipe.create(newRecipe);
    res.sendStatus(200);
})

//EDIT RECIPE
app.get('/recipes/:id/edit', verifyToken, 
    (req, res) => {
        const token = req.cookies.access_token;
        const decoded = jwt.verify(token, process.env.SECRET);
    Recipe.findById(req.params.id, function(err, recipe){
        if(err || !recipe) {
            res.redirect('/')
        } else if (recipe.owner.id != decoded.id) {
            res.sendStatus(401);
        } else {
            res.send(recipe);
        }
    })
})



//UPDATE RECIPE
app.put('/recipes/:id', verifyToken, 
    (req, res) => {
        const token = req.cookies.access_token;
        const decoded = jwt.verify(token, process.env.SECRET);
    Recipe.findByIdAndUpdate({_id:req.params.id}, req.body, function(err, recipe){
        if (err) {
            res.send('error');
        } else if (recipe.owner.id != decoded.id) {
            res.sendStatus(401);
        }
        res.sendStatus(200);
    })
})

//DELETE RECIPE
app.delete('/recipes/:id', verifyToken, 
    (req, res) => {
        const token = req.cookies.access_token;
        const decoded = jwt.verify(token, process.env.SECRET);
    Recipe.findByIdAndRemove(req.params.id, function(err, recipe){
        if (err) {
            res.send(err);
        } else if (recipe.owner.id != decoded.id) {
            res.sendStatus(401);
        }
        res.sendStatus(200);
    })
})

module.exports = app;
