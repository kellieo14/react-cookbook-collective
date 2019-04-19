import React, { Component } from 'react';
import './recipe.css';
import { Link, Redirect } from 'react-router-dom';
import {Card, Container, Button} from 'react-bootstrap';
import EditIconButton from '../../buttons/EditIconButton';
import RecipeButton from '../../buttons/RecipeButton';
import { axiosGetRequest }  from '../../../axiosRequest';
import PrintIconButton from '../../buttons/PrintIconButton';



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
        const recipe = await axiosGetRequest(`recipes/${params.recipeId}`);
        this.setState({
            recipe: recipe,
        });
    }

    goBack = () => {
        this.props.history.goBack('/recipes');
    }


    print = () => {
        window.print(document.getElementsByClassName('print-content'))
    }


    render() {
        const { recipe } = this.state;
        if (recipe === null) return <p>Loading Recipe...</p>;
        return (
            <Container>
            {this.state.redirect && (
                <Redirect to='/recipes' />
            )}
                <div className='button-row'>
                    <Button onClick={this.goBack} className='back-button'><i className='fas fa-angle-double-left'></i> Go Back</Button>
                        <div className='row edit-print-row'>
                            <Link to={`/recipe/${recipe._id}/edit`}><EditIconButton></EditIconButton></Link>
                            <PrintIconButton onClick={this.print} />
                        </div>

                </div>
                <div className='row'>
                    <Card id='print-content'>
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
                            <Link to={`/recipe/${recipe._id}/edit`}><RecipeButton buttonName='Edit'/></Link>
                        </div>
                    </Card> 
                </div>
            </Container>
        )
    }
}





export default Recipe;
