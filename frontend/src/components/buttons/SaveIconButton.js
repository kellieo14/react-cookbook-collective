import React from 'react';
import {Button} from 'react-bootstrap';
import './buttons.css';

function SaveIconButton(props) {
    return (
        <div>
            <Button onClick={props.onClick} className={props.className}><i className={props.iconName}></i>{props.buttonName}</Button>
        </div>
    )
}

export default SaveIconButton;