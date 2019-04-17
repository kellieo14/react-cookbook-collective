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
import Logout from './components/authentication/logout/Logout';
import {axiosSetup, axiosGetRequest} from './axiosRequest';


axiosSetup();

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: ''
        }
    }
    async componentDidMount() {
        const user = await axiosGetRequest(`http://localhost:8081/`);
        this.setState({
            user: user,
        })
    }

    loginUser = async () => {
        const newUser = await axiosGetRequest(`http://localhost:8081/`);
        this.setState({
            user: newUser
        })
    }
    
    logoutUser = async () => {
        this.setState({
            user: null
        })
    }

    render() {
        return (
            <div>
                <RecipeNavbar logoutUser={this.logoutUser} user={this.state.user} />
                <Switch>
                    <Route exact path='/recipes/new' component={AddRecipe} />
                    <Route exact path='/recipes/:recipeId' component={Recipe} />
                    <Route exact path='/recipes/:recipeId/edit' component={EditRecipe} />
                    <Route exact path='/' component={HomePage} />
                    <Route exact path='/recipes' component={Recipes} />
                    <Route exact path='/register' render={props => !this.state.user ? <Register /> : <Logout {...props} logoutUser={this.logoutUser} user={this.state.user}/>}  />
                    <Route exact path='/login' 
                        render={props => !this.state.user ? <Login {...props} loginUser={this.loginUser}/> : <Logout {...props} logoutUser={this.logoutUser} user={this.state.user}/>} />
                    <Route component={NotFoundPage} />
                </Switch>
            </div>
        );
    }
}

export default App;
