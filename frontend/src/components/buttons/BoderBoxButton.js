import React from 'react';
import './buttons.css';

function BorderBoxButton(props) {
    return (
        <div onClick={props.onClick} className="basic-box">
            <p><i className={props.className}/>{props.buttonName}</p>
            <svg width='150' height="50" viewBox="0 0 150 50" xmlns="http://www.w3.org/2000/svg">
            <rect x='0' y='0' fill='none' width='150' height='50'/>
            </svg>
    </div>
    )
}

export default BorderBoxButton;