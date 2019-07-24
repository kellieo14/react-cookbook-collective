import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import {Card, Container} from 'react-bootstrap';
import { axiosGetRequest }  from '../../../axiosRequest';import ThumbtackOffButton from '../../buttons/ThumbtackOffButton';
import ThumbtackOnButton from '../../buttons/ThumbtackOnButton';
import SaveIconButton from '../../buttons/SaveIconButton';
import BorderBoxButton from '../../buttons/BoderBoxButton';
import BorderBoxButtonSmall from '../../buttons/BorderBoxButtonSmall';
import axios from 'axios';
import './recipe.css';
// import '../../../../../backend/uploads';



class Recipe extends Component {
    constructor(props) {
        super(props);
        this.state = {
            recipe: null,
            redirect: false,
            image: null
        } 
    }


    
    async componentDidMount() {
        const { match: { params } } = this.props;
        const recipe = await axiosGetRequest(`recipes/${params.recipeId}`);
        const image = await axios.get(`http://localhost:8081/recipes/${params.recipeId}/image`);
        this.setState({
            recipe: recipe,
            image: image
        });
    }

    handleThumbtack = async () => {

        const { match: { params } } = this.props;
        await axios.put(`http://localhost:8081/recipes/${params.recipeId}`, {
           thumbtacked: !this.state.recipe.thumbtacked
        });

        this.setState({
            recipe: {
                ...this.state.recipe,
                thumbtacked: !this.state.recipe.thumbtacked,
            }
        })
    }

    goBack = () => {
        this.props.history.goBack('/recipes');
    }

    print = () => {
        window.print(document.getElementsByClassName('print-content'))
    }

    render() {
        const { recipe } = this.state;

        if (recipe === null) return (
            <Container className='center not-found-recipe-div'>
                <p>Recipe Not Found</p>
                <Link to={'/recipe/new'}><BorderBoxButton className='fas fa-plus' buttonName='Add Recipe' /></Link>
            </Container>
        )
      
        return (
            <Container fluid className='container-recipe'>
            {this.state.redirect && (
                <Redirect to='/recipes' />
            )}
                <div className='button-row-large no-print'>
                    <div className='back-button-underline-div'>
                        <SaveIconButton onClick={this.goBack} className='custom-underline' iconName={'fas fa-angle-double-left'} buttonName='Go Back'></SaveIconButton>
                    </div>
                    <div className='row edit-print-row'>
                        <Link className='border-box-link' to={`/recipe/${recipe._id}/edit`}>
                            <BorderBoxButton className='fas fa-pencil-alt' buttonName='Edit' />
                        </Link>
                        <div className='border-box-link' onClick={this.print}>
                            <BorderBoxButton className='fas fa-print' buttonName='Print'/>
                        </div>
                    </div>
                </div>

                <div className='button-row-small no-print'>
                    <div className='back-button-underline-div'>
                        <SaveIconButton onClick={this.goBack} className='custom-underline' iconName={'fas fa-angle-double-left'} buttonName='Go Back'></SaveIconButton>
                    </div>
                    <div className='row edit-print-row'>
                        <Link className='border-box-link' to={`/recipe/${recipe._id}/edit`}>
                            <BorderBoxButtonSmall className='fas fa-pencil-alt' />
                        </Link>
                        <div className='border-box-link' onClick={this.print}>
                            <BorderBoxButtonSmall className='fas fa-print' />
                        </div>
                    </div>
                </div>
        
                <div>
            
                    <Card className='recipe-card-div'>
                        <div>
                            {recipe.image && (
                                <div className='title-image-div center'>
                                    <img className='recipe-image' src={this.state.image.config.url} alt={recipe.title} />
                                    <div className='title-div'>
                                        <h4 className='display-3 titles'>{recipe.title}</h4>
                                        <h5>By: {recipe.author}</h5>
                                    </div>
                                </div>
                            )}

                            {!recipe.image && (
                                <div className='center'>
                                    <h4 className='display-3 text-center'>{recipe.title}</h4>
                                    <h5 className='text-center'>By: {recipe.author}</h5>
                                </div>
                            )}
                       
                        </div>
                        <hr/>
                        <Container className='recipe-body'>
                            <h4>Ingredients</h4>
                            <div className='no-white-space'>
                                {recipe.ingredients}
                            </div>
                            <hr className='line-break'/>
                            <h4>Directions</h4>
                            <div className='no-white-space'>
                                {recipe.directions}
                            </div>
                            <hr className='line-break'/>
                            <h4>Notes</h4>
                            {recipe.notes && (
                                <div>
                                    <p>{recipe.notes}</p>
                                </div>
                            )}
                            {!recipe.notes && (
                                <div>
                                    <p><i>No notes</i></p>
                                </div>
                            )}
                            <hr className='no-print'/>
                            <h4 className='no-print'>Categories:</h4>
                            {recipe.categories.map((category) => (
                                <p className='no-print' key={category}>{category}</p>
                            ))}
                            
                        </Container>
                        <hr className='no-print' />
                        <div className='no-print thumbtack-row center'>
                            {this.state.recipe.thumbtacked ? 
                                (<div>
                                    <p className='try-list-text'><i>Remove recipe from 'Try Next' List:</i></p>
                                    <div className='thumbtack-button-div'>
                                        <ThumbtackOnButton onClick={this.handleThumbtack}></ThumbtackOnButton>
                                    </div>
                                </div>) : 
                                (<div>
                                    <p className='try-list-text'><i>Add recipe to 'Try Next' List:</i></p>
                                    <div className='thumbtack-button-div'>
                                        <ThumbtackOffButton onClick={this.handleThumbtack}></ThumbtackOffButton>
                                    </div>
                                </div>)
                            }
                        </div>
                        {/* <div className='edit-button-row no-print'>
                            <Link to={`/recipe/${recipe._id}/edit`}><RecipeButton buttonName='Edit'/></Link>
                        </div> */}
                    </Card> 
                </div>
            </Container>
        )
    }
}

export default Recipe;




// import React, { Component } from 'react';
// import { Link, Redirect } from 'react-router-dom';
// import {Card, Container} from 'react-bootstrap';
// import { axiosGetRequest }  from '../../../axiosRequest';import ThumbtackOffButton from '../../buttons/ThumbtackOffButton';
// import ThumbtackOnButton from '../../buttons/ThumbtackOnButton';
// import SaveIconButton from '../../buttons/SaveIconButton';
// import BorderBoxButton from '../../buttons/BoderBoxButton';
// import BorderBoxButtonSmall from '../../buttons/BorderBoxButtonSmall';
// import axios from 'axios';
// import './recipe.css';
// // import '../../../../../backend/uploads';



// class Recipe extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             recipe: null,
//             redirect: false,
//             image: null
//         } 
//     }

    
    
//     async componentDidMount() {
//         const { match: { params } } = this.props;
//         const recipe = await axiosGetRequest(`recipes/${params.recipeId}`);
//         this.setState({
//             recipe: recipe
//         });
//     }

//     handleThumbtack = async () => {

//         const { match: { params } } = this.props;
//         await axios.put(`http://localhost:8081/recipes/${params.recipeId}`, {
//            thumbtacked: !this.state.recipe.thumbtacked
//         });

//         this.setState({
//             recipe: {
//                 ...this.state.recipe,
//                 thumbtacked: !this.state.recipe.thumbtacked,
//             }
//         })
//     }

//     goBack = () => {
//         this.props.history.goBack('/recipes');
//     }

//     print = () => {
//         window.print(document.getElementsByClassName('print-content'))
//     }

//     render() {
//         const { recipe } = this.state;

//         if (recipe === null) return (
//             <Container className='center not-found-recipe-div'>
//                 <p>Recipe Not Found</p>
//                 <Link to={'/recipe/new'}><BorderBoxButton className='fas fa-plus' buttonName='Add Recipe' /></Link>
//             </Container>
//         )
      
//         // if (this.state.recipes.length === 0) {
//         //     setTimeout(() => {
//         //         return (
//         //             <div className='container'>
//         //             <p className='center'>No Recipes Found</p>
//         //             <Link to={'/recipe/new'}><RecipeButton buttonName='Add Recipe' /></Link>
//         //             </div>
//         //         )
//         //     }, 1000)}

//         // console.log(`${process.env.REACT_APP_SITE_URL + recipe.image}`);
//         return (
//             <Container fluid className='container-recipe'>
//             {this.state.redirect && (
//                 <Redirect to='/recipes' />
//             )}
//                 <div className='button-row-large no-print'>
//                     <div className='back-button-underline-div'>
//                         <SaveIconButton onClick={this.goBack} className='custom-underline' iconName={'fas fa-angle-double-left'} buttonName='Go Back'></SaveIconButton>
//                     </div>
//                     <div className='row edit-print-row'>
//                         <Link className='border-box-link' to={`/recipe/${recipe._id}/edit`}>
//                             <BorderBoxButton className='fas fa-pencil-alt' buttonName='Edit' />
//                         </Link>
//                         <div className='border-box-link' onClick={this.print}>
//                             <BorderBoxButton className='fas fa-print' buttonName='Print'/>
//                         </div>
//                     </div>
//                 </div>

//                 <div className='button-row-small no-print'>
//                     <div className='back-button-underline-div'>
//                         <SaveIconButton onClick={this.goBack} className='custom-underline' iconName={'fas fa-angle-double-left'} buttonName='Go Back'></SaveIconButton>
//                     </div>
//                     <div className='row edit-print-row'>
//                         <Link className='border-box-link' to={`/recipe/${recipe._id}/edit`}>
//                             <BorderBoxButtonSmall className='fas fa-pencil-alt' />
//                         </Link>
//                         <div className='border-box-link' onClick={this.print}>
//                             <BorderBoxButtonSmall className='fas fa-print' />
//                         </div>
//                     </div>
//                 </div>
        
//                 <div>
            
//                     <Card className='recipe-card-div'>
//                         <div>
//                             {recipe.image && (
//                                 <div className='title-image-div center'>
//                                 {/* <img src={`/Users/kellie/Desktop/react-cookbook-collective/backend/uploads/2019-06-12T23:41:57.341ZIMG_20190503_165638.jpg`} alt={recipe.title} /> */}
//                                     <img src={process.env.REACT_APP_SITE_URL + recipe.image} alt={recipe.title}/>
//                                     {/* <img className='image' alt='finished recipe' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzAXVQeawBO5kkPW0pyy5WewlM23MmTRXTbjlfCn6Ns9ckFjg'/> */}
//                                     <div className='title-div'>
//                                         <h4 className='display-3 titles'>{recipe.title}</h4>
//                                         <h5>By: {recipe.author}</h5>
//                                     </div>
//                                 </div>
//                             )}

//                             {!recipe.image && (
//                                 <div className='center'>
//                                     <h4 className='display-3 text-center'>{recipe.title}</h4>
//                                     <h5 className='text-center'>By: {recipe.author}</h5>
//                                 </div>
//                             )}
                       
//                         </div>
//                         <hr/>
//                         <Container className='recipe-body'>
//                             <h4>Ingredients</h4>
//                             <div className='no-white-space'>
//                                 {recipe.ingredients}
//                             </div>
//                             <hr className='line-break'/>
//                             <h4>Directions</h4>
//                             <div className='no-white-space'>
//                                 {recipe.directions}
//                             </div>
//                             <hr className='line-break'/>
//                             <h4>Notes</h4>
//                             {recipe.notes && (
//                                 <div>
//                                     <p>{recipe.notes}</p>
//                                 </div>
//                             )}
//                             {!recipe.notes && (
//                                 <div>
//                                     <p><i>No notes</i></p>
//                                 </div>
//                             )}
//                             <hr className='no-print'/>
//                             <h4 className='no-print'>Categories:</h4>
//                             {recipe.categories.map((category) => (
//                                 <p className='no-print' key={category}>{category}</p>
//                             ))}
                            
//                         </Container>
//                         <hr className='no-print' />
//                         <div className='no-print thumbtack-row center'>
//                             {this.state.recipe.thumbtacked ? 
//                                 (<div>
//                                     <p className='try-list-text'><i>Remove recipe from 'Try Next' List:</i></p>
//                                     <div className='thumbtack-button-div'>
//                                         <ThumbtackOnButton onClick={this.handleThumbtack}></ThumbtackOnButton>
//                                     </div>
//                                 </div>) : 
//                                 (<div>
//                                     <p className='try-list-text'><i>Add recipe to 'Try Next' List:</i></p>
//                                     <div className='thumbtack-button-div'>
//                                         <ThumbtackOffButton onClick={this.handleThumbtack}></ThumbtackOffButton>
//                                     </div>
//                                 </div>)
//                             }
//                         </div>
//                         {/* <div className='edit-button-row no-print'>
//                             <Link to={`/recipe/${recipe._id}/edit`}><RecipeButton buttonName='Edit'/></Link>
//                         </div> */}
//                     </Card> 
//                 </div>
//             </Container>
//         )
//     }
// }

// export default Recipe;
