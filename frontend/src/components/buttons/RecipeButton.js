import React from 'react';
import {Button} from 'react-bootstrap';
import './buttons.css';

function RecipeButton(props) {
    return (
        <div>
            <Button onClick={props.onClick} className='recipe-button'>{props.buttonName}</Button>
        </div>
    )
}

export default RecipeButton;