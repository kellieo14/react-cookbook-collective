import React from 'react';
import './buttons.css';

function BorderBoxButtonSmall(props) {
    return (
        <div className="basic-box-small">
            <i className={props.className}/>
            <svg width='50' height="50" viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg">
            <rect x='0' y='0' fill='none' width='50' height='50'/>
            </svg>
    </div>
    )
}

export default BorderBoxButtonSmall;