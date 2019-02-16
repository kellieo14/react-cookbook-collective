import React from 'react';
import {Button} from 'react-bootstrap';
import './buttons.css';

function DeleteIconButton(props) {
    return (
        <div>
            <Button onClick={props.onClick} className='delete-icon-button'><i className='fas fa-trash-alt'></i></Button>
        </div>
    )
}

export default DeleteIconButton;