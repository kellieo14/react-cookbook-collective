import React from 'react';
import {Button} from 'react-bootstrap';
import './buttons.css';

function AddIconButton(props) {
    return (
        <div>
            <Button onClick={props.onClick} className='add-icon-button'><i className='fas fa-plus'></i>{props.buttonName}</Button>
        </div>
    )
}

export default AddIconButton;

