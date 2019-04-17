
import React, {Component} from 'react';
import {Form, Container, Button} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import './authForm.css';


class AuthForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pageTitle: props.pageTitle,
            username: '',
            password: '',
        };
    }

    submit = async (e) => {
        e.preventDefault();
        await this.props.onSubmit({
            username: this.state.username,
            password: this.state.password,
        })
    }

    handleUsernameChange = (e) => {
        const username = e.target.value;
        this.setState(() => ({ username }))
    }
    handlePasswordChange = (e) => {
        const password = e.target.value;
        this.setState(() => ({ password }))
    
    }
    render() {
        return(
            <Container>
                <h1>{this.state.pageTitle}</h1>
                {this.state.pageTitle === 'Login' && (
                    <p>Don't have an account? Register <Link to='/register'>here</Link>.</p>
                )}
                {this.state.pageTitle === 'Register' && (
                    <p>Already have an account? Login <Link to='/login'>here</Link>.</p>
                )}
                <Form onSubmit={this.submit}>
                    <Form.Group>
                        <Form.Label>Username:</Form.Label>
                        <Form.Control
                            type='text'
                            placeholder='username'
                            value={this.state.username}
                            onChange={this.handleUsernameChange}    
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type='password'
                            placeholder='password'
                            value={this.state.password}
                            onChange={this.handlePasswordChange}    
                        />
                    </Form.Group>
                    <Button className='auth-button' type='submit'>{this.state.pageTitle}</Button>
                </Form>
            </Container>

        )}
    }

export default AuthForm;