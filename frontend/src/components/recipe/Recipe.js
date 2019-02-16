import React, {Component} from 'react';
import './recipe.css';
import axios from 'axios';
import {Link, Redirect} from 'react-router-dom';
import {Card, Container, Button} from 'react-bootstrap';
import EditIconButton from '../buttons/EditIconButton';
import RecipeButton from '../buttons/RecipeButton';


class Recipe extends Component {
    constructor(props) {
        super(props);
        this.state = {
            recipe: null,
            redirect: false
        }
    }

    async componentDidMount() {
        const { match: { params } } = this.props;
        const recipe = (await (axios.get(`http://localhost:8081/recipes/${params.recipeId}`))).data;
        this.setState({
            recipe: recipe,
        });
    }

    goBack = () => {
        this.props.history.goBack('/recipes');
    }

    // async componentDidUpdate() {
    //     const { match: { params } } = this.props;
    //     const recipe = (await axios.get(`http://localhost:8081/recipes/${params.recipeId}`)).data;
    //     this.setState({
    //         recipe: recipe,
    //     });
    // }


    render() {
        const { recipe } = this.state;
        if (recipe === null) return <p>Loading Recipe...</p>;
        return (
            <Container>
            {this.state.redirect && (
                <Redirect to='/recipes' />
            )}
                <div className='row button-row'>
                    <Button onClick={this.goBack} className='back-button'><i className='fas fa-angle-double-left'></i> Go Back</Button>
                    <Link to={`/recipes/${recipe._id}/edit`}><EditIconButton></EditIconButton></Link>
                </div>
                <div className='row'>
                    <Card>
                        <div>
                            <h4 className='display-3 text-center'>{recipe.title}</h4>
                            <h5 className='text-center'>By: {recipe.author}</h5>
                            <hr/>
                        </div>
                        <Container className='recipe-body'>
                            <h4>Ingredients</h4>
                            <div className='no-white-space'>
                                {recipe.ingredients}
                            </div>
                            <hr/>
                            <h4>Directions</h4>
                            <div className='no-white-space'>
                                {recipe.directions}
                            </div>
                            <hr/>
                            <h4 >Notes</h4>
                            <p>{recipe.notes}</p>
                            <hr/>
                            <h6>Categories:</h6>
                            {recipe.categories.map((category) => (
                                <p key={category}>{category}</p>
                            ))}
                        </Container>
                        <hr />
                        <div className='edit-button-row'>
                            <Link to={`/recipes/${recipe._id}/edit`}><RecipeButton buttonName='Edit'/></Link>
                        </div>
                    </Card> 
                </div>
            </Container>
        )
    }
}

export default Recipe;



    // async handleDeleteRecipe() {
    //     const { match: { params } } = this.props;
    //     await axios.delete(`http://localhost:8081/recipes/${params.recipeId}`)
    //     .then(() => {
    //         this.setState(({ redirect: true}))
    //       });
    // }