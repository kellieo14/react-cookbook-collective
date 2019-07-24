
import React, { Component } from 'react';
import AuthForm from '../authForm/AuthForm';
import { axiosPostRequest } from '../../../axiosRequest';
import { Container } from 'react-bootstrap';



class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            error: null,
        }
    }

    
    onSubmit = async (user) => {
        const {history, loginUser} = this.props;
        try {
            
            await axiosPostRequest('login', {
                username: user.username,
                password: user.password
            }).then((response) => {
                if (response.status === 200) {
                    loginUser();
                    history.push('/');
                } else {
                    console.log(response)
                    this.setState({error: response})
                }
            })
        }
        catch (error) {
            console.log(error);
            this.setState({error: 'Login failed, please try again.'});
        }
    }


    // onSubmit = async (user) => {
    //     const {history, loginUser} = this.props;

    //     await axiosPostRequest('login', {
    //         username: user.username,
    //         password: user.password
    //     })
    //     .then(function(response){
    //         if (response.status === 200) {
    //             loginUser();
    //             history.push('/');
    //         }
    //     }).catch(function(error) {
    //         console.log('Login failed. Please try again.');
            
    //     })
    // }
    render() {
        return(    
            <Container>
                <AuthForm 
                    pageTitle='Login' 
                    onSubmit={this.onSubmit}
                    redirect={this.redirect}
                    authError={this.state.error}
                />
            </Container>
        )}
    }
export default Login;
