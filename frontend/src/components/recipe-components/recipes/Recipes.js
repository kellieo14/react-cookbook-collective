import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Container, Button, Row} from 'react-bootstrap';
import BorderBoxButton from '../../buttons/BoderBoxButton';
import BorderBoxButtonSmall from '../../buttons/BorderBoxButtonSmall';
import { axiosGetRequest } from '../../../axiosRequest';
import SearchBar from '../searchBar/SearchBar';
import Pager from '../pagination/Pager';
import './recipes.css';


class Recipes extends Component {

    constructor(props){
        super(props);
        this.state = {
            recipes: [], 
            allRecipes: [],
            search: '', 
            parameter: 'title',
            visibleSearch: false,
            categories: [],
            currentPage: 1, 
            pageCount: null, 
            pagerNumbers: [], 
        }
    }

    //pagination
    makeHttpRequestWithPage = async pageNumber => {
        const result = await axiosGetRequest(`recipes?p=${pageNumber}`)
        this.setState({
            allRecipes: result.allRecipes,
            recipes: result.recipes,
            totalRecipes: result.recipeCount, 
            pageCount: result.pageCount, 
            currentPage: result.page,
            pagerNumbers: result.pagerNumbers, 
        })
    }

    componentDidMount() {
        this.makeHttpRequestWithPage(1);
    };

    updateSearch = (e) => {
        const search = e.target.value;
        this.setState({ search });
        this.setState({currentPage: 1});
    };

    updateParameter = (selection) => {
        const parameter = selection;
        this.setState({ parameter })
    };

    handleVisibleSearch = () => {
        this.setState({ search: ''});
        this.setState({currentPage: 1})
        this.setState({ parameter: 'title'})
        this.setState({ categories: []});
        this.setState(function(prevState) {
            return {visibleSearch: !prevState.visibleSearch}
        });
    };

    handleCategoryChange = (input) => {
        const categories =  input;
        this.setState({ categories });
    };

    render() {

        //Filter recipes categorically & alphabetically
        let filteredRecipes = this.state.allRecipes.filter((recipe) => {
            if (this.state.parameter === 'title') {
                return recipe.title.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1
            } else if (this.state.parameter === 'author') {
                return recipe.author.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1
            } else if (this.state.parameter === 'categories') {
                    return recipe.categories.filter((category) => {
                        return this.state.categories.indexOf(category) !== -1
                    }).length > 0
            }
            return false;
        });

        //Check if recipes 
        if (this.state.recipes === null) {
            setTimeout(function(){ return <p>Loading Recipes...</p> }, 1000);
        }

        if (this.state.recipes.length === 0) {
            setTimeout(() => {
                return (
                    <div className='container'>
                    <p className='no-recipes-text center'>No Recipes Found</p>
                    <Link to={'/recipe/new'}><BorderBoxButton className='fas fa-plus' buttonName='Add Recipe' /></Link>
                    </div>
                )
        }, 1000)}

        //Filtered Recipes Pager
        // let filteredRecipesPageCount = Math.ceil(filteredRecipes.length / 10);
        // let filteredPagerNumbers = [];
        // for (let i = 1; i <= filteredRecipesPageCount; i++) {
        //     filteredPagerNumbers.push(i);
        // }

        // let filteredTo = ((this.state.currentPage -1) * 10);
        // let filteredFrom = (filteredTo + 10)

        
        return (
            
            <Container fluid className='container-recipes'>
                <div className='add-icon-row-large-screen'>
                    <Link className='border-box-link' to={'/recipe/new'}>
                        <BorderBoxButton className='fas fa-plus' buttonName='Add Recipe' />
                    </Link>
                    <div className='border-box-link' onClick={this.handleVisibleSearch}>
                        <BorderBoxButton className='fas fa-search' buttonName='Search' />
                    </div>
                </div>
                <div className='add-icon-row-small-screen'>
                    <Link className='border-box-link' to={'/recipe/new'}>
                        <BorderBoxButtonSmall className='fas fa-plus' />
                    </Link>
                    <div className='border-box-link' onClick={this.handleVisibleSearch}>
                        <BorderBoxButtonSmall className='fas fa-search' />
                    </div>
                </div>
                <h3 className='center recipe-title '>RECIPES</h3>
           
    {/* *********************** SEARCHBAR *************************** */}
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
                {!this.state.visibleSearch && (
                    <hr />
                )}
            
    {/* *********************** SHOW ALL RECIPES && FILTERED RECIPIES****************  */}
                <div className='row center-recipes'>
                    {!this.state.visibleSearch && this.state.recipes.sort( (a, b) => a.title.localeCompare(b.title)).map(recipe => (
                        <div key={recipe._id} className='col-sm-6 col-md-4 col-lg-3 recipes-button-div'>
                              {/* {console.log(recipe.categories[0].split(',')[0])} */}
                            <Link to={`/recipe/${recipe._id}`}>
                            {(() => {
                                    switch(recipe.categories[0].split(',')[0]) {
                                    case 'pie':
                                        return (
                                            <Button data-hover={`View ${recipe.title} Recipe`} className='button pie'>
                                                <div>{recipe.title}</div>
                                            </Button>
                                        )
                                    case 'bread':
                                        return (
                                            <Button data-hover={`View ${recipe.title} Recipe`} className='button bread'>
                                                <div>{recipe.title}</div>
                                            </Button>
                                        )
                                    case 'brownie':
                                        return (
                                            <Button data-hover={`View ${recipe.title} Recipe`} className='button brownie'>
                                                <div>{recipe.title}</div>
                                            </Button>
                                        )
                                    case 'cake' :
                                        return (
                                            <Button data-hover={`View ${recipe.title} Recipe`} className='button cake'>
                                                <div>{recipe.title}</div>
                                            </Button>
                                        )
                                    case 'caramel' :
                                        return (
                                            <Button data-hover={`View ${recipe.title} Recipe`} className='button caramel'>
                                                <div>{recipe.title}</div>
                                            </Button>
                                        )
                                    case 'cheesecake' :
                                        return (
                                            <Button data-hover={`View ${recipe.title} Recipe`} className='button cheesecake'>
                                                <div>{recipe.title}</div>
                                            </Button>
                                        )
                                    case 'chocolate' :
                                        return (
                                            <Button data-hover={`View ${recipe.title} Recipe`} className='button chocolate'>
                                                <div>{recipe.title}</div>
                                        </Button>
                                        )
                                    case 'cobbler' :
                                        return (
                                            <Button data-hover={`View ${recipe.title} Recipe`} className='button cobbler'>
                                                <div>{recipe.title}</div>
                                            </Button>
                                        )
                                    case 'cookie' :
                                        return (
                                            <Button data-hover={`View ${recipe.title} Recipe`} className='button cookie'>
                                                <div>{recipe.title}</div>
                                            </Button>
                                        )
                                    case 'cupcake' :
                                        return (
                                            <Button data-hover={`View ${recipe.title} Recipe`} className='button cupcake'>
                                                <div>{recipe.title}</div>
                                            </Button>
                                        )
                                    case 'fruit' :
                                        return (
                                            <Button data-hover={`View ${recipe.title} Recipe`} className='button fruit'>
                                                <div>{recipe.title}</div>
                                            </Button>
                                        )
                                    case 'ice cream' :
                                        return (
                                            <Button data-hover={`View ${recipe.title} Recipe`} className='button ice-cream'>
                                                <div>{recipe.title}</div>
                                            </Button>
                                        )
                                    default:
                                        return (
                                            <Button data-hover={`View ${recipe.title} Recipe`} className='button default-button-background'>
                                                <div>{recipe.title}</div>
                                            </Button>
                                        )
                                    }
                                })()}
                                
                            </Link>
                        </div>
                    ))}
                    {this.state.visibleSearch && filteredRecipes.length === 0 && (
                        <p className='center'>No recipes found</p>
                    )}
                    {!this.state.visibleSearch && this.state.recipes.length === 0 && (
                        <p className='center'>No recipes found</p>
                    )}
                    {this.state.visibleSearch && filteredRecipes.sort( (a, b) => a.title.localeCompare(b.title)).map(recipe => (
                        <div key={recipe._id} className='col-sm-6 col-md-4 col-lg-3 recipes-button-div'>
                        {/* {console.log(recipe.categories[0].split(',')[0])} */}
                      <Link to={`/recipe/${recipe._id}`}>
                      {(() => {
                              switch(recipe.categories[0].split(',')[0]) {
                              case 'pie':
                                  return (
                                      <Button data-hover={`View ${recipe.title} Recipe`} className='button pie'>
                                          <div>{recipe.title}</div>
                                      </Button>
                                  )
                              case 'bread':
                                  return (
                                      <Button data-hover={`View ${recipe.title} Recipe`} className='button bread'>
                                          <div>{recipe.title}</div>
                                      </Button>
                                  )
                              case 'brownie':
                                  return (
                                      <Button data-hover={`View ${recipe.title} Recipe`} className='button brownie'>
                                          <div>{recipe.title}</div>
                                      </Button>
                                  )
                              case 'cake' :
                                  return (
                                      <Button data-hover={`View ${recipe.title} Recipe`} className='button cake'>
                                          <div>{recipe.title}</div>
                                      </Button>
                                  )
                              case 'caramel' :
                                  return (
                                      <Button data-hover={`View ${recipe.title} Recipe`} className='button caramel'>
                                          <div>{recipe.title}</div>
                                      </Button>
                                  )
                              case 'cheesecake' :
                                  return (
                                      <Button data-hover={`View ${recipe.title} Recipe`} className='button cheesecake'>
                                          <div>{recipe.title}</div>
                                      </Button>
                                  )
                              case 'chocolate' :
                                  return (
                                      <Button data-hover={`View ${recipe.title} Recipe`} className='button chocolate'>
                                          <div>{recipe.title}</div>
                                  </Button>
                                  )
                              case 'cobbler' :
                                  return (
                                      <Button data-hover={`View ${recipe.title} Recipe`} className='button cobbler'>
                                          <div>{recipe.title}</div>
                                      </Button>
                                  )
                              case 'cookie' :
                                  return (
                                      <Button data-hover={`View ${recipe.title} Recipe`} className='button cookie'>
                                          <div>{recipe.title}</div>
                                      </Button>
                                  )
                              case 'cupcake' :
                                  return (
                                      <Button data-hover={`View ${recipe.title} Recipe`} className='button cupcake'>
                                          <div>{recipe.title}</div>
                                      </Button>
                                  )
                              case 'fruit' :
                                  return (
                                      <Button data-hover={`View ${recipe.title} Recipe`} className='button fruit'>
                                          <div>{recipe.title}</div>
                                      </Button>
                                  )
                              case 'ice cream' :
                                  return (
                                      <Button data-hover={`View ${recipe.title} Recipe`} className='button ice-cream'>
                                          <div>{recipe.title}</div>
                                      </Button>
                                  )
                              default:
                                  return (
                                      <Button data-hover={`View ${recipe.title} Recipe`} className='button default-button-background'>
                                          <div>{recipe.title}</div>
                                      </Button>
                                  )
                              }
                          })()}
                          
                      </Link>
                  </div>
                    ))}
                </div>

    {/* **************************** PAGER *****************************/}

                {!this.state.visibleSearch && (this.state.pageCount > 1) && (
                    <Row className='center pager-div'>
                        <Pager 
                            currentPage={this.state.currentPage}
                            pageCount={this.state.pageCount}
                            pagerNumbers={this.state.pagerNumbers}
                            makeHttpRequestWithPage={this.makeHttpRequestWithPage}
                        />
                    </Row>
                )}


            </Container>
        )
    }
}

export default Recipes;


                            