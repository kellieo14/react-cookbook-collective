import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Navbar, Nav, NavDropdown} from 'react-bootstrap';
import { axiosGetRequest } from '../../axiosRequest';
import './navigation.css';


class Navigation extends Component {
    constructor(props){
        super(props);
        this.state = {
            navExpanded: false
        }
    }

    setNavExpanded = (expanded) => {
        this.setState({ navExpanded: expanded });
    }
    
    closeNav = () => {
        this.setState({ navExpanded: false });
    }

    handleLogout = async (req, res) => {
        await axiosGetRequest('logout')
        this.props.logoutUser();
        this.setState({ navExpanded: false })
        window.location.href='/login';
    }

    render() {
        return (
            <Navbar onToggle={this.setNavExpanded}
                expanded={this.state.navExpanded} className='fixed-top' expand='lg' bg='dark' variant='dark'>
                <Navbar.Brand><Link className='navbar-link' to='/'>Kellie's Cookbook Collective</Link></Navbar.Brand>
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
                        <NavDropdown title='Recipes' >
                            <Link variant='dark' onClick={this.closeNav} className='dropdown-link' to='/recipes'>View My cookbook</Link>
                            <NavDropdown.Divider />
                            <Link variant='dark' onClick={this.closeNav} className='dropdown-link' to='/recipe/new'>Add Recipe</Link>
                        </NavDropdown>
                        </Nav>
                        <Nav className='justify-end-content'>
                            <NavDropdown  title='My Account' >
                                <Link variant='dark' onClick={this.closeNav} className='dropdown-link' to='/'>My Account</Link>
                                <NavDropdown.Divider />
                                <Link variant='dark' onClick={this.closeNav} className='dropdown-link' to='/'>Friends</Link>
                            </NavDropdown>
                        </Nav>
                        <Navbar.Text className='logout' onClick={this.handleLogout}>Logout</Navbar.Text>

                    </Navbar.Collapse>
                )}
                
            </Navbar>
        )
    }
}


export default Navigation;

