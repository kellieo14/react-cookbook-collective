import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Navbar, Nav, NavDropdown} from 'react-bootstrap';
import { axiosGetRequest } from '../../axiosRequest';
import { LinkContainer } from "react-router-bootstrap";
import mixer from './mixer.png';
import './navigation.css';


class Navigation extends Component {
    constructor(props){
        super(props);
        this.state = {
            navExpanded: false, 
        }
    }


    setNavExpanded = (expanded) => {
        this.setState({ navExpanded: expanded });
    }
    
    closeNav = () => {
        this.setState({ navExpanded: false });
    }

    handleLogout = async (req, res) => {
        await axiosGetRequest('logout');
        this.props.logoutUser();
        this.setState({ navExpanded: false });
        window.location.href='/login';
    }

    render() {

        return (
            <div>
                <Navbar onToggle={this.setNavExpanded} expanded={this.state.navExpanded} className='fixed-top' expand='lg' bg='dark' variant='dark'>
                <Navbar.Brand className='brand'><Link className='navbar-link' to='/'><img alt='stand mixer' src={mixer}></img>Cookbook Collective</Link></Navbar.Brand>
                <Navbar.Toggle aria-controls='responsive-navbar-nav' />
                {!this.props.user && (
                    <Navbar.Collapse id='responsive-navbar-nav'>
                        <Nav className='ml-auto'>
                            <Navbar.Text ><Link  onClick={this.closeNav} className='login-register-text' to='/login'>Login</Link></Navbar.Text>
                            <Navbar.Text><Link onClick={this.closeNav} className='login-register-text' to='/register'>Register</Link></Navbar.Text>
                        </Nav>
                    </Navbar.Collapse>
                )}
        
                {this.props.user && (
                    <Navbar.Collapse variant='dark' id='responsive-navbar-nav'>
                        <Nav className='ml-auto'>
                        <NavDropdown title='Recipes' id="collapsible-nav-dropdown" >
                            <LinkContainer to='/recipes'>
                                <NavDropdown.Item className='dropdown-link' onClick={this.closeNav}>Recipes</NavDropdown.Item>
                            </LinkContainer>
                            <LinkContainer to='/recipe/new'>
                                <NavDropdown.Item className='dropdown-link' onClick={this.closeNav}>Add Recipe</NavDropdown.Item>
                            </LinkContainer>                        
                        </NavDropdown>
                        </Nav>
                        <Nav className='justify-end-content'>
                            <NavDropdown  title='My Account' >
                                <LinkContainer to={`/profile/${this.props.user.id}`}>
                                    <NavDropdown.Item className='dropdown-link' onClick={this.closeNav}>Profile</NavDropdown.Item>
                                </LinkContainer>
                                <LinkContainer to='/'>
                                    <NavDropdown.Item className='dropdown-link' onClick={this.closeNav}>Friends</NavDropdown.Item>
                                </LinkContainer>
                                <NavDropdown.Divider />
                                <Navbar.Text className='logout dropdown-link' onClick={this.handleLogout}>Logout</Navbar.Text>

                            </NavDropdown>
                        </Nav>
                      
                        <Navbar.Text className='initial'>{this.props.user.username.charAt(0).toUpperCase()}</Navbar.Text>
                   
                    </Navbar.Collapse>
                )}
                
                </Navbar>
            </div>
            
        )
    }
}


export default Navigation;




