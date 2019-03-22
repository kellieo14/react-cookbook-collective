
import React, { Component } from 'react';
import axios from 'axios';
import {Form, Container, Button} from 'react-bootstrap';
import {Link} from 'react-router-dom';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            id: '',
            isAuthenticated: false,
        };
  }

   handleSubmit = async (e) => {
       e.preventDefault();
       console.log(this.state.username, this.state.password)
        await axios.post('http://localhost:8081/login', {
            username: this.state.username,
            password: this.state.password
        }).then( res => {
            localStorage.setItem('jwt', res.data.token);
            this.setState({ isAuthenticated: true })
        });

}

  handleUsernameChange = (e) => {
      const username = e.target.value;
      this.setState(() => ({ username }))
  }
  handlePasswordChange = (e) => {
    const password = e.target.value;
    this.setState(() => ({ password }))
  }

  handleLogout = () => {
      this.setState(() => ({isAuthenticated: false}));
  }

  getInitialState() {
      return {
          isAuthenticated: false
      }
  }
  render() {
    if (this.state.isAuthenticated === false) {
        console.log('user is not logged in');
        return(
            <Container>
                <h1>Login</h1>
                <p>Don't have an accout? Register <Link to='/register'>here</Link>.</p>
                <Form onSubmit={this.handleSubmit}>
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
                    <Button type='submit' value='login'>Login</Button>
                </Form>
            </Container>
        )
    } else {
        console.log('user is already logged in')
        return (
            <Container>
                <h5>{this.state.username}</h5>
                <p>{this.state.id}</p>
                <Button onClick={this.handleLogout}>Logout</Button>
            </Container>
        )
    }
  }
}

export default Login;