import React from 'react';
import {Button} from 'react-bootstrap';
import './buttons.css';

function EditIconButton(props) {
    return (
        <div>
            <Button className='edit-icon-button'><i className='fas fa-pencil-alt'></i>{props.buttonName}</Button>
        </div>
    )
}

export default EditIconButton;