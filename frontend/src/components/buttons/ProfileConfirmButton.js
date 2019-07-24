import React from 'react';
import {Button} from 'react-bootstrap';
import './buttons.css';

function ProfileConfirmButton(props) {
    return (
        <div>
            <Button onClick={props.onClick} className='profile-confirm-button'>{props.buttonName}</Button>
        </div>
    )
}

export default ProfileConfirmButton;