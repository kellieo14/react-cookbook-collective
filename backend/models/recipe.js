const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RecipeSchema = new Schema({
    title: String, 
    author: String, 
    ingredients: Array, 
    directions: Array,
    notes: String, 
    categories: Array,
    thumbtacked: Boolean,
    image: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Image'
        }
    },
    owner: {
        id: {
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'User'
        }
    }, 
    image: String, 

})

const Recipe = mongoose.model('recipe', RecipeSchema);

module.exports = Recipe;



// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;

// const RecipeSchema = new Schema({
//     title: String, 
//     author: String, 
//     ingredients: Array, 
//     directions: Array,
//     notes: String, 
//     categories: Array,
//     image: String,
//     owner: {
//         id: {
//             type: mongoose.Schema.Types.ObjectId, 
//             ref: 'User'
//         }
//     }, 
//     image: String, 
//     thumbtacked: Boolean
// })

// const Recipe = mongoose.model('recipe', RecipeSchema);

// module.exports = Recipe;