import React from 'react';
import './buttons.css';

function BorderBoxButtonLarge(props) {
    return (
        <div onClick={props.onClick} className="basic-box-large">
            <p>{props.buttonName}</p>
            <svg width='200' height="90" viewBox="0 0 200 90" xmlns="http://www.w3.org/2000/svg">
            <rect x='0' y='0' fill='none' width='200' height='90'/>
            </svg>
    </div>
    )
}

export default BorderBoxButtonLarge;