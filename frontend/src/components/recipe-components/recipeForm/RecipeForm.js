import React from 'react';
import './recipeForm.css';
import {Redirect} from 'react-router-dom';
import {Form, Container, Button} from 'react-bootstrap';
import axios from 'axios';
import DeleteIconButton from '../../buttons/DeleteIconButton';
import SaveIconButton from '../../buttons/SaveIconButton';
import RecipeConfirmDeleteModal from '../recipeConfirmDeleteModal/RecipeConfirmDeleteModal';


class RecipeForm extends React.Component {

//     constructor(props) {
//         super(props);
//         this.state = {
//             validated: false,
//             redirect: false, 
//             title: props.recipe ? props.recipe.title : '',
//             author: props.recipe ? props.recipe.author : '',
//             ingredients: props.recipe ? props.recipe.ingredients : '',
//             directions: props.recipe ? props.recipe.directions : '',
//             notes: props.recipe ? props.recipe.notes : '',
//             categories: props.recipe ? props.recipe.categories : [],
//             button: props.recipe ? 'Save' : 'Add Recipe', 
//             deleteButton: props.recipe ? true : false,
//             modalShow: false 
//         };
//     }

//     onTitleChange = (e) => {
//         const title = e.target.value;
//         this.setState({ title })
//     }
//     onAuthorChange = (e) => {
//         const author = e.target.value;
//         this.setState(() => ({ author }))
//     }

//     onIngredientsChange = (e) => {
//         const ingredients = e.target.value;
//         this.setState(() => ({ ingredients }))
//     }
//     onDirectionsChange = (e) => {
//         const directions = e.target.value;
//         this.setState(() => ({ directions }))
//     }
//     onNotesChange = (e) => {
//         const notes = e.target.value;
//         this.setState(() => ({ notes }))
//     }
        
//     handleDeleteRecipe = async (e) => {
//         e.preventDefault();
//         await axios.delete(`http://localhost:8081/recipes/${this.props.recipe._id}`)
//         .then(this.setState(({ redirect: true})))
//         .catch((err) => {
//             console.log(err);
//         })
//     }

//     submit = async (e) => {
//         const form = e.currentTarget;
//         if (form.checkValidity() === false) {
//           e.preventDefault();
//           e.stopPropagation();
//         } else {
//             this.setState({ validated: true });
//         let categories = [];
//         let items = document.getElementsByClassName('category');
//         for (let i = 0; i < items.length; i++) {
//             if (items[i].checked) {
//                 categories.push(items[i].value);
//             }
//         }
//         await this.props.onSubmit({
//             title: this.state.title,
//             author: this.state.author,
//             ingredients: this.state.ingredients,
//             directions: this.state.directions,
//             notes: this.state.notes,
//             categories: categories,
//         })
//         .then(this.setState({ redirect: true })).catch((err) => {
//             console.log(err);
//         })
//         }
//     }
    
//     render() {
//         const { validated } = this.state;
//         let modalClose = () => this.setState({ modalShow: false });
//         const { redirect } = this.state;
//         const categories = ['pie', 'cake', 'cheesecake', 'cupcake', 'ice cream', 'brownie', 'cookie', 'cobbler', 'chocolate', 'fruit', 'caramel', 'other' ].sort()
        
//         return (
//             <Container>
//                 <div className='button-bar'>
//                     <Button onClick={this.props.goBack} className='back-button'><i className='fas fa-angle-double-left'></i> Go Back</Button>
//                         <div className='row save-delete-row'>
//                             <SaveIconButton className='submit-button' onClick={this.submit} type='submit'>{this.state.button}</SaveIconButton>
//                             {this.state.deleteButton && (
//                                 <DeleteIconButton  onClick={() => this.setState({ modalShow: true })} />
//                             )}
//                             <RecipeConfirmDeleteModal
//                                 show={this.state.modalShow}
//                                 handleDeleteRecipe={this.handleDeleteRecipe}
//                                 onHide={modalClose}
//                                 title={this.state.title}
//                             />
//                         </div>
//                 </div>
//                 <Form
//                     className='recipe-form'
//                     noValidate
//                     validated={validated}
//                     onSubmit={e => this.submit(e)}
//                 >
//                     <div className='recipe-header text-center'>
//                         <h2 className='header'>{this.props.header}</h2>
//                     </div>
//                     <Form.Group>
//                         <Form.Label>Recipe Title:</Form.Label>
//                         <Form.Control
//                             required
//                             type='text'
//                             name='title'
//                             value={this.state.title}
//                             onChange={this.onTitleChange}
//                         />
//                         <Form.Control.Feedback type="invalid">
//                             Please add a title.
//                         </Form.Control.Feedback>
//                     </Form.Group>
//                     <Form.Group>
//                         <Form.Label>Author:</Form.Label>
//                         <Form.Control
//                             required
//                             type='text'
//                             name='author'
//                             value={this.state.author}
//                             onChange={this.onAuthorChange}
//                         />
//                         <Form.Control.Feedback type="invalid">
//                             Please add an author.
//                         </Form.Control.Feedback>
//                     </Form.Group>
//                     <Form.Group>
//                         <Form.Label>Ingredients:</Form.Label>
//                         <Form.Control 
//                             required
//                             as='textarea' 
//                             rows='4'
//                             name='ingredients'
//                             value={this.state.ingredients}
//                             onChange={this.onIngredientsChange}
//                         />
//                         <Form.Control.Feedback type="invalid">
//                             Please add ingredients.
//                         </Form.Control.Feedback>
//                     </Form.Group>
//                     <Form.Group>
//                         <Form.Label>Directions:</Form.Label>
//                         <Form.Control 
//                             required
//                             as='textarea' 
//                             rows='4'
//                             name='directions'
//                             value={this.state.directions}
//                             onChange={this.onDirectionsChange}
//                         />
//                         <Form.Control.Feedback type="invalid">
//                             Please add directions.
//                         </Form.Control.Feedback>
//                     </Form.Group>
//                     <Form.Group>
//                         <Form.Label>Additional Notes:</Form.Label>
//                         <Form.Control 
//                             required
//                             as='textarea' 
//                             rows='4'
//                             name='notes'
//                             value={this.state.notes}
//                             onChange={this.onNotesChange}
//                         />
//                     </Form.Group>
//                     <Form.Group>
//                         <Form.Label>Categories:</Form.Label>
//                         <div className='row category-rows'>
//                             {categories.map((category) => {
//                                 return (
//                                     <div className='col-xs-6 col-md-3 col-lg-2 ml-3' key={category}>
//                                         <label>
//                                             <input
//                                                 type='checkbox'
//                                                 name='category'
//                                                 value={category}
//                                                 className='category'
//                                                 defaultChecked={!!this.state.categories.filter(c => c === category).length}
//                                             />
//                                             {`     ` + category}
//                                         </label>
//                                     </div>
//                                 )
//                             })}
//                         </div>
//                     </Form.Group>
//                     <hr />
//                     <div className='submit-div'>
//                         <Button className='submit-button' onClick={this.submit}type='submit'>{this.state.button}</Button>
//                     </div>
//                 </Form>
//                     {redirect && (
//                         <Redirect to='/recipes' />
//                     )}
//             </Container>
//         );
//     }
// }
    









//     // _isMounted = false;
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
            modalShow: false
        }
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
        await axios.delete(`http://localhost:8081/recipes/${this.props.recipe._id}`)
        this.setState(({ redirect: true}))
    }

    submit = async (e) => {
        e.preventDefault();
        let categories = [];
        let items = document.getElementsByClassName('category');
        for (let i = 0; i < items.length; i++) {
            if (items[i].checked) {
                categories.push(items[i].value);
            }
        }

        await this.props.onSubmit({
            title: this.state.title,
            author: this.state.author,
            ingredients: this.state.ingredients,
            directions: this.state.directions,
            notes: this.state.notes,
            categories: categories,
        })
        this.setState({ redirect: true })
    }
    render() {
        let modalClose = () => this.setState({ modalShow: false });

        const { redirect } = this.state;
        const categories = ['pie', 'cake', 'cheesecake', 'cupcake', 'ice cream', 'brownie', 'cookie', 'cobbler', 'chocolate', 'fruit', 'caramel', 'other' ].sort()
        return (
            <Container>
                <div className='button-bar'>
                    <Button onClick={this.props.goBack} className='back-button'><i className='fas fa-angle-double-left'></i> Go Back</Button>
                    <div className='row save-delete-row'>
                        <SaveIconButton className='submit-button' onClick={this.submit} type='submit'>{this.state.button}</SaveIconButton>
                        {this.state.deleteButton && (
                            <DeleteIconButton  onClick={() => this.setState({ modalShow: true })} />
                        )}
                        <RecipeConfirmDeleteModal
                            show={this.state.modalShow}
                            handleDeleteRecipe={this.handleDeleteRecipe}
                            onHide={modalClose}
                            title={this.state.title}
                        />
                    </div>
                </div>
                <Form className='recipe-form' onSubmit={this.submit}>
                    <div className='recipe-header text-center'>
                        <h2 className='header'>{this.props.header}</h2>
                    </div>
                    <Form.Group>
                        <Form.Label>Recipe Title:</Form.Label>
                        <Form.Control
                            type='text'
                            name='title'
                            value={this.state.title}
                            onChange={this.onTitleChange}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Author:</Form.Label>
                        <Form.Control
                            type='text'
                            name='author'
                            value={this.state.author}
                            onChange={this.onAuthorChange}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Ingredients:</Form.Label>
                        <Form.Control 
                            as='textarea' 
                            rows='4'
                            name='ingredients'
                            value={this.state.ingredients}
                            onChange={this.onIngredientsChange}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Directions:</Form.Label>
                        <Form.Control 
                            as='textarea' 
                            rows='4'
                            name='directions'
                            value={this.state.directions}
                            onChange={this.onDirectionsChange}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Additional Notes:</Form.Label>
                        <Form.Control 
                            as='textarea' 
                            rows='4'
                            name='notes'
                            value={this.state.notes}
                            onChange={this.onNotesChange}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Categories:</Form.Label>
                        <div className='row category-rows'>
                            {categories.map((category) => {
                                return (
                                    <div className='col-xs-6 col-md-3 col-lg-2 ml-3' key={category}>
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
                    <hr />
                    <div className='submit-div'>
                        <Button className='submit-button' type='submit'>{this.state.button}</Button>
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



// <Redirect to={`/recipes`} />



