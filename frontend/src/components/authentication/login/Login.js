
import React, { Component } from 'react';
import AuthForm from '../authForm/AuthForm';
import { axiosPostRequest } from '../../../axiosRequest';
import { Container } from 'react-bootstrap';



class Login extends Component {

    onSubmit = async (user) => {
        const {history, loginUser} = this.props;
        await axiosPostRequest('http://localhost:8081/login', {
            username: user.username,
            password: user.password
        })
        .then(function(response){
            if (response.status === 200) {
                history.push('/');
                loginUser();
            }
        }).catch(function(error) {
            console.log('Login failed. Please try again.');
            
        })
    }

    render() {
        return(
            <Container>
                <AuthForm 
                    pageTitle='Login' 
                    onSubmit={this.onSubmit}
                    redirect={this.redirect}
                />
            </Container>
        )}
    }
export default Login;
