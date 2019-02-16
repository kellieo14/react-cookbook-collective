import React from 'react';
import {Link} from 'react-router-dom';

function HomePage() {
    return(
        <div>
            <p>Home Page</p>
            <button><Link to='/recipes'>View Recipes</Link></button>
            <button> <Link to='/recipes/new'>Add Recipe</Link></button>
        </div>
    )
}

export default HomePage;