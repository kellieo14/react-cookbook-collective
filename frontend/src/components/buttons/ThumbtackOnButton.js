import React from 'react';
import {Button} from 'react-bootstrap';
import './buttons.css';

function ThumbtackOnButton(props) {
    return (
        <div>
            <Button onClick={props.onClick} className='thumbtack-on-button'><i className='fas fa-thumbtack'></i></Button>
        </div>
    )
}

export default ThumbtackOnButton;