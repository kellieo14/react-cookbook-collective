import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import {Button} from 'react-bootstrap';
import RecipeButton from '../buttons/RecipeButton';
import AddIconButton from '../buttons/AddIconButton.js';
import './recipes.css';


class Recipes extends Component {
    _isMounted = false;
    constructor(props){
        super(props);
        this.state = {
            recipes: null, 
        }
    }

    async componentDidMount() {
        this._isMounted = true;
        await axios.get('http://localhost:8081/recipes')
        .then(recipes => {
            if (this._isMounted) {
                this.setState({
                    recipes: recipes.data
                })
            }
        })
    }

    async componentDidUpdate() {
        this._isMounted = true;
        await axios.get('http://localhost:8081/recipes')
        .then(recipes => {
            if (this._isMounted) {
                this.setState({
                    recipes: recipes.data
                })
            }
        })
    }

    componentWillUnmount() {
        this._isMounted = false;
    }
    // async componentDidUpdate() {
    //     const recipes =  (await axios.get('http://localhost:8081/recipes')).data;
    //     this.setState({
    //             recipes: recipes
    //     });
    // }

    render() {
        if (this.state.recipes === null) return <p>Loading Recipes...</p>;
        if (this.state.recipes.length === 0) return (
            <div className='container'>
                <p>No Recipes Found</p>
                <Link to={'/recipes/new'}><RecipeButton buttonName='Save Recipe' /></Link>
            </div>
        ) 

        return (
            <div className='container'>
                <div className='add-icon-row'>
                    <Link to={'/recipes/new'}><AddIconButton/></Link>
                </div>
                <div className='row'>
                    <h3 className='center'>Recipes</h3>
                </div>
                <div className='row center-recipes'>
                    {this.state.recipes && this.state.recipes.map(recipe => (
                        <div key={recipe._id} className='col-sm-12 col-md-6'>
                            <Link to={`recipes/${recipe._id}`}>
                                <Button className='button'>
                                    <div className='mb-3 title'>
                                        <div>{recipe.title}</div>
                                    </div>
                                </Button>
                            </Link>
                        </div>
                    ))}
                </div>
                <div className='center add-recipe'>
                    <Link to={'/recipes/new'}><RecipeButton buttonName='Add Recipe'/></Link>
                </div>
                
            </div>
        )
    }
}

export default Recipes;



