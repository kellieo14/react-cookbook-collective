import React from 'react';
import {Link} from 'react-router-dom';

const NotFoundPage = (props) => {
    console.log(props);
    let pathName = (props.location.pathname.substring(1));
    pathName = pathName.charAt(0).toUpperCase() + pathName.slice(1);
    
    return (
        <div>
            <h3>{pathName} Page Not Found</h3>
            <Link to='/'>Return Home</Link>
        </div>
    )
}

export default NotFoundPage;