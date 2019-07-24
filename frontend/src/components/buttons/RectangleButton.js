import React from 'react';
import {Link} from 'react-router-dom';
import mixer from './images/mixer.png';
import './buttons.css';


function RectangleButton(props) {
    return (
        <div>
            <ul className="ch-grid-rectangle">
                <li>
                    <div className="ch-item-rectangle">				
                        <div className="ch-info-rectangle">
                            <div className="ch-info-front-rectangle ch-img-1-rectangle">
                                    <p>{props.recipeTitle}</p>
                            </div>
                            <div className="ch-info-back-rectangle">
                                <p>View Recipe</p>                  
                            </div>	
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    )
}

export default RectangleButton;