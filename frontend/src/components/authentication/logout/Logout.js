import React, {Component} from 'react';
import {Container} from 'react-bootstrap';
import { axiosGetRequest } from '../../../axiosRequest';
import RecipeButton from '../../buttons/RecipeButton';


class Logout extends Component {

    handleLogout = async (req, res) => {
        await axiosGetRequest('http://localhost:8081/logout')
        this.props.logoutUser()
    }

    render() {
        return (
            <Container>
            <h3>You are currently logged in as {this.props.user.username}.</h3>
            <RecipeButton onClick={this.handleLogout} buttonName='Switch Accounts'/>
            </Container>
        )
    }
}

export default Logout;
