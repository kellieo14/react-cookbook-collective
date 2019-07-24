
require('../config/passport');
const   express     = require('express'),
        cookieParser= require('cookie-parser'),
        bodyParser  = require('body-parser'),
        jwt         = require('jsonwebtoken'),
        verifyToken = require('../middleware/middleware'),
        multer      = require('multer'), 
        path        = require('path'),
        // upload     = multer({ dest: 'uploads/'})
        Recipe      = require('../models/recipe');

const app = express();
// app.use(express.static(path.join(__dirname, '../../frontend/src/components/recipe-components/recipe/Recipe')));
// app.use(__dirname + '../uploads', express.static(path.join(__dirname, '../../frontend/src/components/recipe-components/recipe/Recipe')));
// app.use('/recipe/', express.static(path.join(__dirname, '../../frontend/src/components/recipe-components/recipe/Recipe')));

app.use(cookieParser());
app.use(bodyParser.json());


// const storage = multer.diskStorage({
//     destination: function(req, file, cb) {
//         cb(null, '../../frontend/src/uploads')
//     },
//     filename: function(req, file, cb) {
//         cb(null, new Date().toISOString() + file.originalname);
//     }
// });

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads')
    },
    filename: function(req, file, cb) {
        cb(null, new Date().toISOString() + file.originalname);
    }
});


const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpeg'){
        cb(null, true);
    } else {
        cb(null, false)
    }
}

const upload = multer({
    storage: storage, 
    limits: {
        fileSize: 1024 * 1024 * 5,     
    }, 
    fileFilter: fileFilter
});

const upload2 = multer({
    storage: storage, 
    limits: {
        fileSize: 1024 * 1024 * 5,     
    }, 
    fileFilter: fileFilter
}).single('file');


//GET HOMEPAGE
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
// app.get('/recipes', verifyToken,
//     (req, res) => {
//         const token = req.cookies.access_token;
//         const decoded = jwt.verify(token, process.env.SECRET);
//         Recipe.find({ 'owner.id': decoded.id }, function(err, recipes){
//             if(err){
//                 console.log(err)
//             } else {
//                 res.send({recipes: recipes.slice(0,10), totalRecipes: recipes.length});
//             }
//         })
//     }   
// )

//GET ALL RECIPES PAGINATION
app.get('/recipes', verifyToken,
    (req, res) => {
        const token = req.cookies.access_token;
        const decoded = jwt.verify(token, process.env.SECRET);
        Recipe.find({ 'owner.id': decoded.id }, function(err, recipes){
            if(err){
                res.send(err)
            } else {
                const perPage = 12;
                let sortedRecipes = recipes.sort( (a, b) => a.title.localeCompare(b.title));
                let recipeCount = recipes.length;
                let pageCount = Math.ceil(recipeCount / perPage);
                let page = parseInt(req.query.p);

                let to = ((page-1) * perPage);
                let from = to + 12;
                if (from > recipeCount) from = recipeCount;
 
                let pagerNumbers = [];
                if (page === 1) {
                    pagerNumbers.push(1, 2, 3);
                } else if (page === pageCount) {
                    pagerNumbers.push(pageCount - 2, pageCount -1, pageCount);
                } else {
                     pagerNumbers.push(page - 1, page, page + 1);
                }
                res.send({recipes: sortedRecipes.slice(to, from), page, recipeCount, pageCount, pagerNumbers, allRecipes: sortedRecipes});
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

// GET RECIPE IMAGE BY ID
app.get('/recipes/:id/image', verifyToken,
(req, res) => {
    const token = req.cookies.access_token;
    const decoded = jwt.verify(token, process.env.SECRET);
 
    Recipe.findById(req.params.id, function(err, recipe){
        if(err || !recipe) {
            res.send(recipe.image)
            console.log('error from :id route:', req.url);
        } else if (recipe.owner.id != decoded.id) {
            res.sendStatus(401);
        } else {
            res.sendFile(path.join(__dirname, `../${recipe.image}`));
        }
    })
})




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
            console.log(recipe.image)
            // res.sendFile('../' + recipe.image);
            res.send(recipe);
        }
    })
})


//POST NEW RECIPE
app.post('/recipes', verifyToken, upload.single('file'),
    (req, res) => {
        const token = req.cookies.access_token;
        const decoded = jwt.verify(token, process.env.SECRET);
        const {title, author, ingredients, directions, notes, categories} = req.body;
       
        const owner = {
                id: decoded.id
            }
            // const host = req.hostname;
            // console.log(req.protocol + '://' + host + '/' + req.file.path);
        const newRecipe = {
            title,
            author, 
            ingredients,
            directions,
            notes, 
            categories, 
            owner: owner, 
            image: !req.file ? null : req.file.path,
            thumbtacked: false
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
app.put('/recipes/:id', verifyToken, function(req, res) {
    
    upload2(req, res, function(err) {
        const token = req.cookies.access_token;
        const decoded = jwt.verify(token, process.env.SECRET);
        if (!req.file) {
            Recipe.findByIdAndUpdate({_id:req.params.id}, req.body, function(err, recipe){
                if (err) {
                    res.send('error');
                } else if (recipe.owner.id != decoded.id) {
                    res.sendStatus(401);
                }
                res.sendStatus(200);
            })
            return;
        } 
        else {
        Recipe.findByIdAndUpdate({_id:req.params.id}, {image: req.file.path, ...req.body}, function(err, recipe){
            if (err) {
                res.send('error');
            } else if (recipe.owner.id != decoded.id) {
                res.sendStatus(401);
            }
            // recipe.image
            res.sendStatus(200);
        })
    }
    })
})


    




//UPDATE RECIPE
// app.put('/recipes/:id', verifyToken, upload.single('file'),

//     (req, res) => {
//         const token = req.cookies.access_token;
//         const decoded = jwt.verify(token, process.env.SECRET);
//         console.log('body', req.file)
//     Recipe.findByIdAndUpdate({_id:req.params.id}, req.body, req.file, function(err, recipe){
//         if (err) {
//             res.send('error');
//         } else if (recipe.owner.id != decoded.id) {
//             res.sendStatus(401);
//         }
//         res.sendStatus(200);
//     })
// })

// UPDATE RECIPE
// app.put('/recipes/:id', verifyToken, 
//     (req, res) => {
//         const token = req.cookies.access_token;
//         const decoded = jwt.verify(token, process.env.SECRET);
//     Recipe.findByIdAndUpdate({_id:req.params.id}, req.body, function(err, recipe){
//         if (err) {
//             res.send('error');
//         } else if (recipe.owner.id != decoded.id) {
//             res.sendStatus(401);
//         }
//         res.sendStatus(200);
//     })
// })



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



//GET USER PROFILE
// app.get('/profile', verifyToken,
//     (req, res) => {
//         const token = req.cookies.access_token;
//         const decoded = jwt.verify(token, process.env.SECRET);
//         console.log(decoded);

//     }
// )

module.exports = app;


