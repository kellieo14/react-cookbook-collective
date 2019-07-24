import React from 'react';
import {Link} from 'react-router-dom';
import mixer from './images/mixer.png';
import './buttons.css';


function CircleButton(props) {
    return (
        <div>
            <ul className="ch-grid">
                <li>
                    <div className="ch-item">				
                        <div className="ch-info">
                            <div className="ch-info-front ch-img-1"></div>
                            <div className="ch-info-back">
                                <img className='circle-button-image' src={mixer} alt='stand mixer' />
                                <Link className='circle-button-link border-top' to={props.linkLocation}>{props.linkName}</Link>
                            </div>	
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    )
}

export default CircleButton;