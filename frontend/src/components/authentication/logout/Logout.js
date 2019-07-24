import React, {Component} from 'react';
import {Container} from 'react-bootstrap';
import { axiosGetRequest } from '../../../axiosRequest';
import BorderBoxButtonLarge from '../../buttons/BorderBoxButtonLarge';
import './logout.css';


class Logout extends Component {

    handleLogout = async (req, res) => {
        await axiosGetRequest('logout')
        this.props.logoutUser()
    }

    render() {
        return (
            <Container fluid className='logout-container center'>
                <Container className='logout-inner-container'>

                    <h3 className='logout-title'>You are currently logged in as {this.props.user.username}.</h3>
                    <div className='logout-page-button'>
                        <BorderBoxButtonLarge buttonName='Switch Accounts' onClick={this.handleLogout} />
                    </div>
                
                </Container>
            
            </Container>
        )
    }
}

export default Logout;
