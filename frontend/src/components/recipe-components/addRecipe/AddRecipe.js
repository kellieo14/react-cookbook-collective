import React, {Component} from 'react';
import RecipeForm from '../recipeForm/RecipeForm';
import {axiosPostRequest, axiosGetRequest} from '../../../axiosRequest';



class AddRecipe extends Component {

    async componentDidMount() {
        await axiosGetRequest(`recipes/new`);
    }

    async onSubmit(recipe) {
        await axiosPostRequest('recipes',
         {
            title: recipe.title,
            author: recipe.author,
            ingredients: recipe.ingredients,
            directions: recipe.directions,
            notes: recipe.notes,
            categories: recipe.categories
        })
    }

    goBack = () => {
        this.props.history.goBack('/');
    }

    render() {
        return (
            <div>
            <RecipeForm 
                goBack={this.goBack}
                header='Add Recipe'
                onSubmit={this.onSubmit} />
        </div>
        )
    }
}


export default AddRecipe;