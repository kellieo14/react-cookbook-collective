
import React, {Component} from 'react';
import {Form, Container} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import BorderBoxButton from '../../buttons/BoderBoxButton';
import './authForm.css';


class AuthForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pageTitle: props.pageTitle,
            username: '',
            password: '',
            confirmPassword: '',
            errors: null, 
            passwordsMatch: false
        };
    }

    submit = async (e) => {
        e.preventDefault();
        if (this.state.pageTitle === 'Register' && this.state.password.length > 7 && this.state.passwordsMatch) {
            await this.props.onSubmit({
                username: this.state.username,
                password: this.state.password,
            }) 
        } else if (this.state.pageTitle === 'Login') {
            await this.props.onSubmit({
                username: this.state.username,
                password: this.state.password,
            }) 
        }
    }
    handleUsernameChange = (e) => {
        const username = e.target.value;
        this.setState(() => ({ username }));
    }
    handlePasswordChange = (e) => {
        const password = e.target.value;
        if (this.state.pageTitle === 'Register' && password.length < 8) {
            this.setState({errors: 'Password must be at least 8 characters long'})
        } else {
            this.setState({errors: ''})
        }
        this.setState(() => ({ password }))
    
    }

    handleConfirmPassword = (e) => {
        const confirmPassword = e.target.value;
        if (this.state.password !== confirmPassword) {
            this.setState({errors: 'Passwords do no match', passwordsMatch: false})
        } else {
            this.setState({errors: '', passwordsMatch: true})
        }
        this.setState(() => ({ confirmPassword }))
    
    }
 
    render() {
        let errors = this.state.errors
        return(
            <Container fluid className='auth-form-div'>
            <div className='auth-form-inner-div'>
            <div  className='center'>
                        <h1 className='auth-form-title'>{this.state.pageTitle}</h1>
                        {this.state.pageTitle === 'Login' && (
                            <p>Don't have an account? Register <Link className='login-link' to='/register'>here</Link>.</p>
                        )}
                        {this.state.pageTitle === 'Register' && (
                            <p>Already have an account? Login <Link className='login-link' to='/login'>here</Link>.</p>
                        )}
                </div>
                            
                <Form onSubmit={this.submit}>
                    <Form.Group>
                        {/* <Form.Label className='label'>Username:</Form.Label> */}
                        <Form.Control
                            type='text'
                            placeholder='USERNAME'
                            value={this.state.username}
                            onChange={this.handleUsernameChange}    
                        />
                    </Form.Group>
                    <Form.Group>
                        {/* <Form.Label>Password</Form.Label> */}
                        <Form.Control
                            type='password'
                            placeholder='PASSWORD'
                            value={this.state.password}
                            onChange={this.handlePasswordChange}    
                        />
                        </Form.Group>
                    {this.state.pageTitle === 'Register' && (
                        <Form.Group>
                            <Form.Control
                                type='password'
                                placeholder='CONFIRM PASSWORD'
                                value={this.state.confirmPassword}   
                                onChange={this.handleConfirmPassword}
                            />
                            </Form.Group>
                    )}
                   
                    <div className='auth-form-error-message'>
                        <p className='center'>{errors}</p>
                        <p className='center'>{this.props.authError}</p>
                    </div>

                    <div className='center' >
                            <BorderBoxButton  onClick={this.submit} buttonName={this.state.pageTitle} />
                    </div>
                </Form>
            </div>
                
            </Container>

        )}
    }

export default AuthForm;



// import React, {Component} from 'react';
// import {Form, Container} from 'react-bootstrap';
// import {Link} from 'react-router-dom';
// import BorderBoxButton from '../../buttons/BoderBoxButton';
// import './authForm.css';


// class AuthForm extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             pageTitle: props.pageTitle,
//             username: '',
//             password: '',
//             confirmPassword: '',
//             errors: null, 
//         };
//     }

//     submit = async (e) => {
//         e.preventDefault();
//         if (this.state.pageTitle === 'Register' && this.state.password.length > 7) {
//             await this.props.onSubmit({
//                 username: this.state.username,
//                 password: this.state.password,
//             }) 
//         } else if (this.state.pageTitle === 'Login') {
//             await this.props.onSubmit({
//                 username: this.state.username,
//                 password: this.state.password,
//             }) 
//         }
//     }

//     handleUsernameChange = (e) => {
//         const username = e.target.value;
//         this.setState(() => ({ username }));
//     }
//     handlePasswordChange = (e) => {
//         const password = e.target.value;
//         if (this.state.pageTitle === 'Register' && password.length < 8) {
//             this.setState({errors: 'Password must be at least 8 characters long'})
//         } else {
//             this.setState({errors: ''})
//         }
//         this.setState(() => ({ password }))
    
//     }
 
//     render() {
//         let errors = this.state.errors
//         return(
//             <Container fluid className='auth-form-div'>
//             <div className='auth-form-inner-div'>
//             <div  className='center'>
//                         <h1 className='auth-form-title'>{this.state.pageTitle}</h1>
//                         {this.state.pageTitle === 'Login' && (
//                             <p>Don't have an account? Register <Link className='login-link' to='/register'>here</Link>.</p>
//                         )}
//                         {this.state.pageTitle === 'Register' && (
//                             <p>Already have an account? Login <Link className='login-link' to='/login'>here</Link>.</p>
//                         )}
//                 </div>
                            
//                 <Form onSubmit={this.submit}>
//                     <Form.Group>
//                         {/* <Form.Label className='label'>Username:</Form.Label> */}
//                         <Form.Control
//                             type='text'
//                             placeholder='USERNAME'
//                             value={this.state.username}
//                             onChange={this.handleUsernameChange}    
//                         />
//                     </Form.Group>
//                     <Form.Group>
//                         {/* <Form.Label>Password</Form.Label> */}
//                         <Form.Control
//                             type='password'
//                             placeholder='PASSWORD'
//                             value={this.state.password}
//                             onChange={this.handlePasswordChange}    
//                         />
//                         <Form.Control
//                             type='password'
//                             placeholder='CONFIRM PASSWORD'
//                             value={this.state.password}   
//                         />
//                     </Form.Group>
//                     <div className='auth-form-error-message'>
//                         <p className='center'>{errors}</p>
//                         <p className='center'>{this.props.authError}</p>
//                     </div>

//                     <div className='center' >
//                             <BorderBoxButton  onClick={this.submit} buttonName={this.state.pageTitle} />
//                     </div>
//                 </Form>
//             </div>
                
//             </Container>

//         )}
//     }

// export default AuthForm;