import React, { Component } from 'react';
import {Route, Switch} from 'react-router-dom';
import RecipeNavbar from './components/recipeNavbar/RecipeNavbar';
import Recipes from './components/recipes/Recipes';
import Recipe from './components/recipe/Recipe';
import HomePage from './components/homePage/HomePage';
import AddRecipe from './components/addRecipe/AddRecipe';
import NotFoundPage from './components/NotFoundPage/NotFoundPage';
import EditRecipe from './components/editRecipe/EditRecipe';
import Register from './components/authentication/register/Register';
import Login from './components/authentication/login/Login';

class App extends Component {
  render() {
    return (
      <div>
        <RecipeNavbar />
        <Switch>
            <Route exact path='/recipes/new' component={AddRecipe} />
            <Route exact path='/recipes/:recipeId' component={Recipe} />
            <Route exact path='/recipes/:recipeId/edit' component={EditRecipe} />
            <Route exact path='/' component={HomePage} />
            <Route exact path='/recipes' component={Recipes} />
            <Route exact path='/register' component={Register} />
            <Route exact path='/login' component={Login} />
            <Route component={NotFoundPage} />
        </Switch>



      </div>
    );
  }
}

export default App;
