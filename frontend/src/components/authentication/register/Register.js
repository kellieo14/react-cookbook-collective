import React, { Component } from 'react';
import {axiosPostRequest} from '../../../axiosRequest';
import {Container} from 'react-bootstrap';
import {Redirect} from 'react-router-dom';
import AuthForm from '../authForm/AuthForm';

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: false,
            error: null,
        }
    }

    onSubmit = async (user) => {
        let redirectStatus = this;
        try {
            await axiosPostRequest('register', {
                username: user.username,
                password: user.password
            }).then(
               (response) => {
                    if(response.status === 200){
                        redirectStatus.setState({redirect: true})
                    } else {
                        this.setState({error: response})
                    }
                }
            )
        }
        catch (error) {
            this.setState({error: 'Registration failed. Please try again.'});   
        }
    }




    // onSubmit = async (user) => {
    //     const {history} = this.props;
    //     await axiosPostRequest('register', {
    //         username: user.username,
    //         password: user.password
    //     })
    //     .then(function(response){
    //         if (response.status === 200) {
    //             history.push('/login')
    //         }
    //     }).catch(function(error) {
    //         console.log(error, 'Registration failed. Please try again.');
            
    //     })
    // }

    render() {
        return(
            <Container>
                {this.state.redirect && (
                    <Redirect to='/login' />
                )}
                <AuthForm
                    pageTitle='Register'
                    onSubmit={this.onSubmit}
                    authError={this.state.error}
                />
            </Container>
        )
    }
}

export default Register;
