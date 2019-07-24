import React from 'react';
import {Button} from 'react-bootstrap';
import './buttons.css';

function ThumbtackOffButton(props) {
    return (
            <Button onClick={props.onClick} className='thumbtack-off-button'><i className='fas fa-thumbtack'></i></Button>
    )
}

export default ThumbtackOffButton;