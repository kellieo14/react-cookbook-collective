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
    }

    async onSubmit(recipe) {
        const { match: { params } } = this.props;
        await axios.put(`http://localhost:8081/recipes/${params.recipeId}`, {
        ...recipe
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
                    header={`Editing ${recipe.title} Recipe`}
                    recipe={recipe}
                    onSubmit={this.onSubmit}
                />
            </div>
        )
    }
} 

export default EditRecipe;


// import React, {Component} from 'react';
// import RecipeForm from '../recipeForm/RecipeForm';
// import axios from 'axios';

// class EditRecipe extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             recipe: null
//         }
//     }

//     async componentDidMount() {
//         const { match: { params } } = this.props;
//         const recipe = (await axios.get(`http://localhost:8081/recipes/${params.recipeId}`)).data;
//         this.setState({
//             recipe,
//         });
//     }

//     render() {
//         const { recipe } = this.state;
//         if (recipe === null) return <p>Loading Recipe...</p>;
//         return (
//             <div>
//                 <RecipeForm
//                     header={`Edit ${recipe.recipe.title} Recipe`}
//                     recipe={recipe.recipe}
//                 />
//             </div>
//         )
//     }
// } 

// export default EditRecipe;