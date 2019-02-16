import React from 'react';
import {Button} from 'react-bootstrap';
import './buttons.css';

function SaveIconButton(props) {
    return (
        <div>
            <Button onClick={props.onClick} className='save-icon-button'><i className='fas fa-save'></i>{props.buttonName}</Button>
        </div>
    )
}

export default SaveIconButton;