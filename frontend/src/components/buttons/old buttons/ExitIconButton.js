import React from 'react';
import {Button} from 'react-bootstrap';
import './buttons.css';

function ExitIconButton(props) {
    return (
        <div>
            <Button onClick={props.onClick} className='exit-icon-button'><i className='fas fa-times'></i></Button>
        </div>
    )
}

export default ExitIconButton;