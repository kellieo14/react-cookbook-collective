import React from 'react';
import {Button} from 'react-bootstrap';
import './buttons.css';

function SearchIconButton(props) {
    return (
        <div>
            <Button onClick={props.onClick} variant='outline-secondary' className='search-icon-button'><i className='fas fa-search'></i>Search</Button>
        </div>
    )
}

export default SearchIconButton;