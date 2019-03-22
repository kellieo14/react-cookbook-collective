
import React, { Component } from 'react';
// import {browserHistory} from 'react-router';
// import $ from 'jquery-ajax';
import axios from 'axios';
import {Form, Container, Button} from 'react-bootstrap';
import {Link, Redirect} from 'react-router-dom';

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            redirect: false
        };
  }

   handleSubmit = async (e) => {
       e.preventDefault();
    await axios.post('http://localhost:8081/register', {
        username: this.state.username,
        password: this.state.password
    })
    .then(res => {
              console.log('res is ', res);
            //   browserHistory.push('/login');
            this.setState({ redirect: true })
            }, err => {
              console.log(err);
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
  render() {
    const { redirect } = this.state;
    return(
        <Container>
            <h1>Register</h1>
            <p>Already have an account? Login <Link to='/login'>here</Link>.</p>
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
                <Button type='submit' value='register'>Register</Button>
            </Form>
            {redirect && (
                <Redirect to='/login' />
            )}
        </Container>
  )
  }
}

export default Register;



// import React, { Component } from 'react';
// // import {browserHistory} from 'react-router';
// // import $ from 'jquery-ajax';
// import axios from 'axios';
// import {Form, Container, Button} from 'react-bootstrap';
// import {Link, Redirect} from 'react-router-dom';

// class Register extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             username: '',
//             email: '',
//             password: '',
//             redirect: false
//         };
//   }

//    handleSubmit = async (e) => {
//        e.preventDefault();
//     await axios.post('http://localhost:8081/register', {
//         username: this.state.username,
//         email: this.state.email,
//         password: this.state.password
//     })
//     .then(res => {
//               console.log('res is ', res);
//             //   browserHistory.push('/login');
//             this.setState({ redirect: true })
//             }, err => {
//               console.log(err);
//             });
// }

//   handleUsernameChange = (e) => {
//       const username = e.target.value;
//       this.setState(() => ({ username }))
//   }
//   handleEmailChange = (e) => {
//     const email = e.target.value;
//     this.setState(() => ({ email }))
// }
//   handlePasswordChange = (e) => {
//     const password = e.target.value;
//     this.setState(() => ({ password }))
//   }
//   render() {
//     const { redirect } = this.state;
//     return(
//         <Container>
//             <h1>Register</h1>
//             <p>Already have an account? Login <Link to='/login'>here</Link>.</p>
//             <Form onSubmit={this.handleSubmit}>
//                 <Form.Group>
//                     <Form.Label>Username:</Form.Label>
//                     <Form.Control
//                         type='text'
//                         placeholder='username'
//                         value={this.state.username}
//                         onChange={this.handleUsernameChange}    
//                     />
//                 </Form.Group>
//                 <Form.Group>
//                 <Form.Label>Email:</Form.Label>
//                 <Form.Control
//                     type='email'
//                     placeholder='email'
//                     value={this.state.email}
//                     onChange={this.handleEmailChange}    
//                 />
//             </Form.Group>
//                 <Form.Group>
//                     <Form.Label>Password</Form.Label>
//                     <Form.Control
//                         type='password'
//                         placeholder='password'
//                         value={this.state.password}
//                         onChange={this.handlePasswordChange}    
//                     />
//                 </Form.Group>
//                 <Button type='submit' value='register'>Register</Button>
//             </Form>
//             {redirect && (
//                 <Redirect to='/login' />
//             )}
//         </Container>
//   )
//   }
// }

// export default Register;