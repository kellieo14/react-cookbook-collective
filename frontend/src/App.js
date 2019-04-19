import React, { Component } from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';
import Navigation from './components/navigation/Navigation';
import Recipes from './components/recipe-components/recipes/Recipes';
import Recipe from './components/recipe-components/recipe/Recipe';
import HomePage from './components/homePage/HomePage';
import AddRecipe from './components/recipe-components/addRecipe/AddRecipe';
import NotFoundPage from './components/notFoundPage/NotFoundPage';
import EditRecipe from './components/recipe-components/editRecipe/EditRecipe';
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
        const user = await axiosGetRequest('');
        this.setState({
            user: user,
        })
    }

    loginUser = async () => {
        const newUser = await axiosGetRequest('');
        this.setState({
            user: newUser
        })
    }
    
    logoutUser = () => {
        this.setState({
            user: null
        })   
    }

    render() {
        return (
            <div>
        
                <Navigation logoutUser={this.logoutUser} user={this.state.user} />
                <Switch>
                    <Route exact path='/recipe/new' component={AddRecipe} />
                    <Route exact path='/recipe/:recipeId' component={Recipe} />
                    <Route exact path='/recipe/:recipeId/edit' component={EditRecipe} />
                    <Route exact path='/recipes/:pageId?' render={props => {
                        return (<Recipes key={props.match.params.pageId} {...props} />)
                    }} />
                    <Route exact path='/' component={HomePage} />
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

