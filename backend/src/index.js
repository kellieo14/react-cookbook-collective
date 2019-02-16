const    express     = require('express');
const    mongoose    = require('mongoose');
const    bodyParser  = require('body-parser');
const    cors        = require('cors');
const    helmet      = require('helmet');
const    morgan      = require('morgan');
const    Recipe      = require('../models/recipe');
// import Recipes from '../../frontend/src/components/recipes/Recipes';
require('dotenv').config();


const app = express();

const port = process.env.PORT || 8081;

mongoose.connect(process.env.DB, { useNewUrlParser: true })
  .then(() => console.log(`Database connected successfully`))
  .catch(err => console.log(err));

mongoose.Promise = global.Promise;

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});



// const recipes = [];

app.use(helmet());
app.use(bodyParser.json());
app.use(cors());
app.use(morgan('combined'));

app.use((err, req, res, next) => {
    console.log(err);
    next();
  });



//------------------------------ROUTES------------------------------------

//GET ALL RECIPES
app.get('/recipes', (req, res, next) => {
    Recipe.find({}, function(err, recipes){
        if(err){
            res.redirect('/')
        } else {
            res.send(recipes)
        }
    })
})


// GET RECIPE
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
app.post('/recipes', (req, res) => {
    const {title, author, ingredients, directions, notes, categories} = req.body;
    const newRecipe = {
        title, 
        author, 
        ingredients,
        directions,
        notes, 
        categories
    }
    Recipe.create(newRecipe);
    res.status(200).send();
})
//EDIT RECIPE
app.get('/recipes/:id/edit', function(req, res) {
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

// app.delete('/recipes/:id', (req, res) => {
//     recipes = [];
    // res.send(recipes);
    // for (let i = 0; i < recipes.length; i++) {
    //     if (recipes[i].id === req.params.id) {
    //         recipes.splice(i, 1);
    //     }
    
    // }
// });

// app.listen(8081, ()=> {
//     console.log('listening on port 8081');
// })

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
  });





// curl -X POST -H 'Content-Type: application/json' -d '{
//     "title": "Chocolate Chip Cookies",
//     "author": "Kellie",
//     "ingredients": ["butter", "eggs", "sugar"],
//     "directions": ["mix", "bake", "eat"],
//     "notes": "enjoy", 
//     "categories": ["chocolate", "cookies"]
//   }' localhost:8081/recipes

//   curl -X POST -H 'Content-Type: application/json' -d '{
//     "title": "Shortcake",
//     "author": "Linda",
//     "ingredients": ["butter", "egg whites", "sugar"],
//     "directions": ["mix", "bake", "eat"],
//     "notes": "Do not over-mix", 
//     "categories": ["cake"]
//   }' localhost:8081/recipes

//===================================================================================================

// const    express     = require('express');
// const    bodyParser  = require('body-parser');
// const    cors        = require('cors');
// const    helmet      = require('helmet');
// const    morgan      = require('morgan');
// const    Recipe      = require('../models/recipe');
// require('dotenv').config();


// const app = express();


// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });



// const recipes = [];

// app.use(helmet());
// app.use(bodyParser.json());
// app.use(cors());
// app.use(morgan('combined'));

//------------------------------ROUTES------------------------------------

//GET ALL RECIPES
// app.get('/recipes', (req, res) => {
//     const arrayLength = recipes.length;
//     const rs = recipes.map(r => ({
//         id: r.id,
//         title: r.title, 
//         author: r.author,
//         ingredients: r.ingredients.length,
//         directions: r.directions.length,
//         notes: r.notes, 
//         categories: r.categories.length
//     }))
//     res.send(rs);
// })


// GET RECIPE
// app.get('/recipes/:id', (req, res) => {
//     const recipe = recipes.filter(r => (r.id === parseInt(req.params.id)));
//     if (recipe.length > 1) return res.status(500).send();
//     if (recipe.length === 0) return res.status(404).send();
//     res.send(recipe[0]);
// })


//POST NEW RECIPE
// app.post('/recipes', (req, res) => {
//     const {title, author, ingredients, directions, notes, categories} = req.body;
//     const newRecipe = {
//         id: recipes.length + 1,
//         title, 
//         author, 
//         ingredients,
//         directions,
//         notes, 
//         categories
//     }
//     recipes.push(newRecipe);
//     res.status(200).send();
// })

//FIND RECIPE TO EDIT
// app.get('/recipes/:id/edit', (req, res) => {
//     const recipe = recipes.filter(r => (r.id === parseInt(req.params.id)));
//     if (recipe.length > 1) return res.status(500).send();
//     if (recipe.length === 0) return res.status(404).send();
//     res.send(recipe[0]);
// })

//DELETE RECIPE
// app.delete('/recipes/:id', (req, res) => {
//     recipes = [];
    // res.send(recipes);
    // for (let i = 0; i < recipes.length; i++) {
    //     if (recipes[i].id === req.params.id) {
    //         recipes.splice(i, 1);
    //     }
    
    // }
// });

// app.listen(8081, ()=> {
//     console.log('listening on port 8081');
// })


// curl -X POST -H 'Content-Type: application/json' -d '{
//     "title": "Chocolate Chip Cookies",
//     "author": "Kellie",
//     "ingredients": ["butter", "eggs", "sugar"],
//     "directions": ["mix", "bake", "eat"],
//     "notes": "enjoy", 
//     "categories": ["chocolate", "cookies"]
//   }' localhost:8081/recipes

//   curl -X POST -H 'Content-Type: application/json' -d '{
//     "title": "Shortcake",
//     "author": "Linda",
//     "ingredients": ["butter", "egg whites", "sugar"],
//     "directions": ["mix", "bake", "eat"],
//     "notes": "Do not over-mix", 
//     "categories": ["cake"]
//   }' localhost:8081/recipes