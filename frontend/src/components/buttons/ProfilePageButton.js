// import React from 'react';
// import {Button} from 'react-bootstrap';
// import './buttons.css';

// function ProfilePageButton(props) {
//     return (
//         <div>
//             <Button onClick={props.onClick} className='profile-page-button'><i className={props.buttonIcon} id='icon'></i>{props.buttonName}</Button>
//         </div>
//     )
// }

// export default ProfilePageButton;


import React from 'react';
import './buttons.css';

function ProfilePageButton(props) {
    return (
       
        <div className="block">
            <div onClick={props.onClick} className="hovicon effect-1 sub-a">
                <i className={props.buttonIcon}></i>
            </div>
        </div>
            
  
    )
}

export default ProfilePageButton;