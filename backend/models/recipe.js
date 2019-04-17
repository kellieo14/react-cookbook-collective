const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RecipeSchema = new Schema({
    title: String, 
    author: String, 
    ingredients: Array, 
    directions: Array,
    notes: String, 
    categories: Array,
    owner: {
        id: {
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'User'
        }
    }
})

const Recipe = mongoose.model('recipe', RecipeSchema);

module.exports = Recipe;