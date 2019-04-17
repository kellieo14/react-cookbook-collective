import React, { Component } from 'react';
import {axiosPostRequest} from '../../../axiosRequest';
import {Container} from 'react-bootstrap';
import AuthForm from '../authForm/AuthForm';

class Register extends Component {

    onSubmit = async (user) => {
        const {history} = this.props;
        await axiosPostRequest('http://localhost:8081/register', {
            username: user.username,
            password: user.password
        })
        .then(function(response){
            if (response.status === 200) {
                history.push('/login')
            }
        }).catch(function(error) {
            console.log('Registration failed. Please try again.');
            
        })
    }

    render() {
        return(
            <Container>
                <AuthForm
                    pageTitle='Register'
                    onSubmit={this.onSubmit}
                />
            </Container>
        )
    }
}

export default Register;
