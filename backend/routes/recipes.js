
const   express     = require('express'),
        passport    = require('passport'),
        Recipe      = require('../models/recipe');
const app = express();
require('../config/passport');

// //GET ALL RECIPES
app.get('/recipes',
passport.authenticate('jwt', {session: false}),
    (req, res) => {
           Recipe.find({}, function(err, recipes){
               if(err){
                    res.redirect('/')
                } else {
                    res.send(recipes)
                }
           })
    }   
)

// GET RECIPE BY ID
app.get('/recipes/:id', (req, res) => {
    Recipe.findById(req.params.id, function(err, recipe){
        if(err || !recipe) {
            res.redirect('/')
        } else {
            res.send(recipe);
        }
    })
})

//POST NEW RECIPE
app.post('/recipes', 
    (req, res) => {
    
    const {title, author, ingredients, directions, notes, categories} = req.body;

    const newRecipe = {
        title, 
        author, 
        ingredients,
        directions,
        notes, 
        categories, 
    }
    Recipe.create(newRecipe);
    res.status(200).send();
})

//EDIT RECIPE
app.get('/recipes/:id/edit', function (req, res) {
    Recipe.findById(req.params.id, function(err, recipe){
        if(err || !recipe) {
            res.redirect('/')
        } else {
            res.send(recipe);
        }
    })
})

//UPDATE RECIPE
app.put('/recipes/:id', (req, res) => {
    Recipe.findByIdAndUpdate({_id:req.params.id}, req.body, function(err){
        if (err) {
            res.send('error');
        }
    })
})

//DELETE RECIPE
app.delete('/recipes/:id', (req, res) => {
    Recipe.findByIdAndRemove(req.params.id, function(err){
        if (err) {
            res.send(err);
        }
    
    })
})

module.exports = app;
