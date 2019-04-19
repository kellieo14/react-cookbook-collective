import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Button} from 'react-bootstrap';
import RecipeButton from '../../buttons/RecipeButton';
import AddIconButton from '../../buttons/AddIconButton.js';
import './recipes.css';
import { axiosGetRequest } from '../../../axiosRequest';
import SearchBar from '../searchBar/SearchBar';
import SearchIconButton from '../../buttons/SearchIconButton';



class Recipes extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            recipes: [], 
            search: '', 
            parameter: 'title',
            visibleSearch: false,
            categories: []
        }
    }

    async componentDidMount() {
        const recipes = await axiosGetRequest('recipes')
        this.setState({
            recipes: recipes
        });
    }

    updateSearch = (e) => {
        const search = e.target.value
        this.setState({ search })
    }

    updateParameter = (selection) => {
        const parameter = selection;
        this.setState({ parameter })
    }

    handleVisibleSearch = () => {
        this.setState(function(prevState) {
            return {visibleSearch: !prevState.visibleSearch}
        })
    }

    handleCategoryChange = (input) => {
        const categories =  input;
        this.setState({ categories })
    }

    render() {
        let filteredRecipes = this.state.recipes.filter((recipe) => {
            if (this.state.parameter === 'title') {
                return recipe.title.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1
            } else if (this.state.parameter === 'author') {
                return recipe.author.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1
            } else if (this.state.parameter ==='categories') {
                return recipe.categories.filter((category) => {
                    return this.state.categories.indexOf(category) !== -1
                }).length > 0
            }
            return false;
        });

        if (this.state.recipes === null) {
            setTimeout(function(){ return <p>Loading Recipes...</p> }, 1000);
        }
        if (this.state.recipes.length === 0) {
            setTimeout(() => {
                return (
                    <div className='container'>
                    <p>No Recipes Found</p>
                    <Link to={'/recipe/new'}><RecipeButton buttonName='Add Recipe' /></Link>
                    </div>
                )
            }, 1000)}

        
        return (
            <div className='container'>
                <div className='add-icon-row'>
                    <Link to={'/recipe/new'}><AddIconButton/></Link>
                    <SearchIconButton onClick={this.handleVisibleSearch}></SearchIconButton>
                </div>
                <div className='row'>
                    <h3 className='center'>Recipes</h3>
                </div>
                {this.state.visibleSearch && (
                    <div className='search-bar center'>
                        <SearchBar 
                            updateSearch={this.updateSearch}
                            updateParameter={this.updateParameter}
                            handleCategoryChange={this.handleCategoryChange}
                            recipes={this.state.recipes}
                            search ={this.state.search}
                        />
                    </div>
                )}
                
                <div className='row center-recipes'>
                
                {!this.state.visibleSearch && this.state.recipes.sort( (a, b) => a.title.localeCompare(b.title)).map(recipe => (
                    <div key={recipe._id} className='col-sm-12 col-md-6'>
                        <Link to={`/recipe/${recipe._id}`}>
                            <Button className='button'>
                                <div className='mb-3 title'>
                                    <div>{recipe.title}</div>
                                </div>
                            </Button>
                        </Link>
                    </div>))}

                    {this.state.visibleSearch && filteredRecipes.sort( (a, b) => a.title.localeCompare(b.title)).map(recipe => (
                        <div key={recipe._id} className='col-sm-12 col-md-6'>
                            <Link to={`/recipe/${recipe._id}`}>
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
                    <Link to={'/recipe/new'}><RecipeButton buttonName='Add Recipe'/></Link>
                </div>
                
            </div>
        )
    }
}

export default Recipes;

