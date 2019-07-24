import React, {Component} from 'react';
import RecipeForm from '../recipeForm/RecipeForm';
import axios from 'axios';

class EditRecipe extends Component {

    constructor(props) {
        super(props);
        this.state = {
            recipe: null,
        }
        this.onSubmit = this.onSubmit.bind(this);

    }

    async componentDidMount() {
        const { match: { params } } = this.props;
        const recipe = (await axios.get(`http://localhost:8081/recipes/${params.recipeId}/edit`)).data;
        this.setState({
            recipe
        });
        console.log(recipe)
    }

    // async onSubmit(recipe) {
    //     const { match: { params } } = this.props;
    //     return await axios.put(`http://localhost:8081/recipes/${params.recipeId}`,
    //     {
    //     ...recipe
    //     })
    // }

    async onSubmit(recipe) {
        const { match: { params } } = this.props;
        await axios.put(`http://localhost:8081/recipes/${params.recipeId}`, recipe.image, recipe.tumbtacked, recipe.title, recipe.author, recipe.ingredients, recipe.directions, recipe.notes,recipe.categories,
        {
        // ...recipe
        })
    }

    goBack = () => {
        this.props.history.goBack('/');
    }
 

    render() {
        const { recipe } = this.state;
        if (recipe === null) return <p>Loading Recipe...</p>;
        return (
            <div>
                <RecipeForm
                    goBack={this.goBack}
                    header={`EDITING ${recipe.title.toUpperCase()} RECIPE`}
                    recipe={recipe}
                    onSubmit={this.onSubmit}
                />
            </div>
        )
    }
} 

export default EditRecipe;

