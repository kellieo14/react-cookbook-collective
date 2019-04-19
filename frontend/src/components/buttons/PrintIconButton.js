import React from 'react';
import {Button} from 'react-bootstrap';
import './buttons.css';

function PrintIconButton(props) {
    return (
        <div>
            <Button onClick={props.onClick} className='print-icon-button'><i className='fas fa-print'></i></Button>
        </div>
    )
}

export default PrintIconButton;