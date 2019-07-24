import React, {Component} from 'react';
import RecipeForm from '../recipeForm/RecipeForm';
import {axiosPostRequest, axiosGetRequest} from '../../../axiosRequest';



class AddRecipe extends Component {

    async componentDidMount() {
        await axiosGetRequest(`recipes/new`);
    }

    async onSubmit(recipe) {
        await axiosPostRequest('recipes', recipe.image, recipe.thumbtacked, recipe.title, recipe.author, recipe.ingredients, recipe.directions, recipe.notes,recipe.categories,
         {
            // title: recipe.title,
            // author: recipe.author,
            // ingredients: recipe.ingredients,
            // directions: recipe.directions,
            // notes: recipe.notes,
            // categories: recipe.categories, 
            // image: recipe.image
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
                header='ADD RECIPE'
                onSubmit={this.onSubmit} />
        </div>
        )
    }
}


export default AddRecipe;




// import React, {Component} from 'react';
// import RecipeForm from '../recipeForm/RecipeForm';
// import {axiosPostRequest, axiosGetRequest} from '../../../axiosRequest';



// class AddRecipe extends Component {

//     async componentDidMount() {
//         await axiosGetRequest(`recipes/new`);
//     }

//     async onSubmit(recipe) {
//         // console.log(recipe.image)
//         await axiosPostRequest('recipes',  recipe.image, recipe.title, recipe.author, recipe.ingredients, recipe.directions, recipe.notes,recipe.categories,  
//          {
//             // title: recipe.title,
//             // author: recipe.author,
//             // ingredients: recipe.ingredients,
//             // directions: recipe.directions,
//             // notes: recipe.notes,
//             // categories: recipe.categories, 
//         })
//     }

//     goBack = () => {
//         this.props.history.goBack('/');
//     }

//     render() {
//         return (
//             <div>
//             <RecipeForm 
//                 goBack={this.goBack}
//                 header='Add Recipe'
//                 onSubmit={this.onSubmit} />
//         </div>
//         )
//     }
// }


// export default AddRecipe;