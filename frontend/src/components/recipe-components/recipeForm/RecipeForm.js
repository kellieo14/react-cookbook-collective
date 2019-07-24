import React from 'react';
import './recipeForm.css';
import {Redirect} from 'react-router-dom';
import {Form, Container, Row} from 'react-bootstrap';
import axios from 'axios';
import SaveIconButton from '../../buttons/SaveIconButton';
import BorderBoxButton from '../../buttons/BoderBoxButton';
import BorderBoxButtonSmall from '../../buttons/BorderBoxButtonSmall';
import RecipeConfirmDeleteModal from '../recipeConfirmDeleteModal/RecipeConfirmDeleteModal';




class RecipeForm extends React.Component {



    constructor(props) {
        super(props);
        this.state = {
            redirect: false, 
            title: props.recipe ? props.recipe.title : '',
            author: props.recipe ? props.recipe.author : '',
            ingredients: props.recipe ? props.recipe.ingredients : '',
            directions: props.recipe ? props.recipe.directions : '',
            notes: props.recipe ? props.recipe.notes : '',
            categories: props.recipe ? props.recipe.categories : [],
            button: props.recipe ? 'Save' : 'Add Recipe', 
            deleteButton: props.recipe ? true : false,
            modalShow: false, 
            image: props.recipe ? props.recipe.image : '', 
            thumbtacked: props.recipe ? props.recipe.thumbtacked : false
        }
    }

   handleFileSelected = (e) => {
       this.setState({
           image: e.target.files[0]
       })
   }
    onTitleChange = (e) => {
        const title = e.target.value;
        this.setState({ title })
    }
    onAuthorChange = (e) => {
        const author = e.target.value;
        this.setState(() => ({ author }))
    }

    onIngredientsChange = (e) => {
        const ingredients = e.target.value;
        this.setState(() => ({ ingredients }))
    }
    onDirectionsChange = (e) => {
        const directions = e.target.value;
        this.setState(() => ({ directions }))
    }
    onNotesChange = (e) => {
        const notes = e.target.value;
        this.setState(() => ({ notes }))
    }

    handleDeleteRecipe = async (e) => {
        e.preventDefault();
        await axios.delete(`http://localhost:8081/recipes/${this.props.recipe._id}`);
        this.setState(({ redirect: true}))
    }



    // submit = async (e) => {
    //     e.preventDefault();
    //     let categories = [];
    //     let items = document.getElementsByClassName('category');
    //     for (let i = 0; i < items.length; i++) {
    //         if (items[i].checked) {
    //             categories.push(items[i].value);
    //         }
    //     }
    //     let data = new FormData();
    //     let recipe = {
    //         title: this.state.title, 
    //         author: this.state.author, 
    //         ingredients: this.state.ingredients, 
    //         directions: this.state.directions, 
    //         notes: this.state.notes, 
    //         categories: categories, 
    //         image: this.state.image
    //     }
    //     data.append('recipe', recipe);
    //     await this.props.onSubmit({
    //         data
    //     })
    //     this.setState({ redirect: true })
    // }

    submit = async (e) => {
        e.preventDefault();
        let categories = [];
        let items = document.getElementsByClassName('category');
        for (let i = 0; i < items.length; i++) {
            if (items[i].checked) {
                categories.push(items[i].value);
            }
        }
        let data = new FormData();
        data.append('file', this.state.image);
        data.append('title', this.state.title);
        data.append('author', this.state.author);
        data.append('ingredients', this.state.ingredients);
        data.append('directions', this.state.directions);
        data.append('notes', this.state.notes);
        data.append('categories', categories);
        data.append('thumbtacked', this.state.thumbtacked)
        await this.props.onSubmit({
            title: data,
            author: data,
            ingredients: data,
            directions: data,
            notes: data,
            categories: data,
            image: data,
            thumbtacked: data
        })
        this.setState({ redirect: true })
    }
    render() {
        let modalClose = () => this.setState({ modalShow: false });

        const { redirect } = this.state;
        const categories = ['pie','bread', 'cake', 'cheesecake', 'cupcake', 'ice cream', 'brownie', 'cookie', 'cobbler', 'chocolate', 'fruit', 'caramel', 'other' ].sort()
        return (
            <Container fluid id='container-recipe-form'>
                <div className='button-bar'>
                <div className='back-button-underline-div'>
                    <SaveIconButton onClick={this.props.goBack} className='custom-underline' iconName={'fas fa-angle-double-left'} buttonName='Go Back'></SaveIconButton>
                </div>
                  
                    <div className='row save-delete-row-large'>
                        <div className='border-box-link' onClick={this.submit}>
                            <BorderBoxButton buttonName={this.state.button} className={(this.state.button === 'Save') ? 'fas fa-save' : 'fas fa-plus'}/>

                        </div>
                        {this.state.deleteButton && (
                            <div className='border-box-link' onClick={() => this.setState({modalShow: true})}>

                            <BorderBoxButton buttonName='Delete' className='fas fa-trash-alt' />
            
                            </div>
                        )}
                        <RecipeConfirmDeleteModal
                            show={this.state.modalShow}
                            handleDeleteRecipe={this.handleDeleteRecipe}
                            onHide={modalClose}
                            title={this.state.title}
                        />
                    </div>
                    <div className='row save-delete-row-small'>
                            <div className='border-box-link' onClick={this.submit}>
                                <BorderBoxButtonSmall type='submit' className={(this.state.button === 'Save') ? 'fas fa-save' : 'fas fa-plus'} />
                            </div>
                      
                        {this.state.deleteButton && (
                            <div className='border-box-link' onClick={() => this.setState({modalShow: true})}>
                                <BorderBoxButtonSmall className='fas fa-trash-alt' />
                            </div>
                      
                        )}
                        <RecipeConfirmDeleteModal
                            show={this.state.modalShow}
                            handleDeleteRecipe={this.handleDeleteRecipe}
                            onHide={modalClose}
                            title={this.state.title}
                        />
                    </div>
                </div>
                <Form className='recipe-form' onSubmit={this.submit} encType='multipart/form-data'>
                    <div className='recipe-header text-center'>
                        <h2 className='header'>{this.props.header}</h2>
                    </div>
                    <Form.Group>
                        <Form.Label>RECIPE TITLE</Form.Label>
                        <Form.Control
                            type='text'
                            name='title'
                            value={this.state.title}
                            onChange={this.onTitleChange}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>AUTHOR</Form.Label>
                        <Form.Control
                            type='text'
                            name='author'
                            value={this.state.author}
                            onChange={this.onAuthorChange}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>INGREDIENTS</Form.Label>
                        <Form.Control 
                            as='textarea' 
                            rows='4'
                            name='ingredients'
                            value={this.state.ingredients}
                            onChange={this.onIngredientsChange}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>DIRECTIONS</Form.Label>
                        <Form.Control 
                            as='textarea' 
                            rows='4'
                            name='directions'
                            value={this.state.directions}
                            onChange={this.onDirectionsChange}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>ADDITIONAL NOTES</Form.Label>
                        <Form.Control 
                            as='textarea' 
                            rows='4'
                            name='notes'
                            value={this.state.notes}
                            onChange={this.onNotesChange}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>IMAGE</Form.Label>
                        <Row>
                            <input 
                                className='add-image-input'
                                name='image'
                                type='file' 
                                onChange={this.handleFileSelected}
                                />
                        </Row>
 
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>CATEGORIES</Form.Label>
                        <div className='row category-rows'>
                            {categories.map((category) => {
                                return (
                                    <div className='col-lg-2 col-md-3 col-sm-4' key={category}>
                                        <label>
                                            <input
                                                type='checkbox'
                                                name='category'
                                                value={category}
                                                className='category'
                                                defaultChecked={!!this.state.categories.filter(c => c === category).length}
                                            />
                                            {`     ` + category}
                                        </label>
                                    </div>
                                )
                            })}
                        </div>
                    </Form.Group>
                    <hr className='recipe-form-hr' />
                    <div className='submit-div' onClick={this.submit}>
                    <BorderBoxButton buttonName={this.state.button} className={(this.state.button === 'Save') ? 'fas fa-save' : 'fas fa-plus'} />
                        {/* <SaveIconButton className='form-bottom-save-add-button' onClick={this.submit} type='submit' buttonName={(this.state.button === 'Save') ? 'Save' : 'Add Recipe'} /> */}
                     </div>
                    </Form>
                {redirect && (
                    <Redirect to={`/recipes/${(new Date()).getTime()}`} />
                )}
            </Container>
        )
    }
}


export default RecipeForm;





