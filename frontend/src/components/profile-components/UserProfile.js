
import React, { Component } from 'react';
import {axiosGetRequest} from '../../axiosRequest';
import {Container, Row, Col} from 'react-bootstrap';
import ProfilePageButton from '../buttons/ProfilePageButton';
import DeleteAccountModal from './modals/DeleteAccountModal';
import TryNextListModal from './modals/TryNextListModal';
import {Redirect} from 'react-router-dom';
import axios from 'axios';
import './userProfile.css';

class UserProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null,
            tryNextDisplay: false,
            deleteShow: false,
            modalShow: false,
        }
    }

    async componentDidMount() {
        const { match: { params } } = this.props;
        const user = await axiosGetRequest(`profile/${params.userId}`);
        this.setState({
            user, 
            next: false,
            redirect: false,
        });
    }

    handleDisplayList = () => {
        this.setState({tryNextDisplay: !this.state.tryNextDisplay});
    };


    // handleConfirmDeleteUser = async () => {
    //     let redirectStatus= this;
    //     // const {history} = this.props;
    //     try {
    //         let deleteAccount = await axios.delete(`http://localhost:8081/profile/${this.state.user.userId}`);
    //         let deleteRedirect = await deleteAccount.status;
    //         if (deleteRedirect === 200) {
    //             redirectStatus.props.logoutUser();
    //             redirectStatus.setState({redirect: true});
    //         }
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }



    handleConfirmDeleteUser = async () => {
        let redirectStatus= this;
        try {
            let deleteAccount = axios.delete(`http://localhost:8081/profile/${this.state.user.userId}`);
            let redirect = await deleteAccount;
            await redirect; 
            if (redirect.status === 200) {
                redirectStatus.setState({redirect: true});
                this.props.logoutUser();
            } else {
                console.log('failure');
            }
            
        } catch (error) {
            console.log(error);
        }
    }


    // handleConfirmDeleteUser = async () => {
    //     let redirectStatus= this;
    //     // const {history} = this.props;
    //     try {
    //         await axios.delete(`http://localhost:8081/profile/${this.state.user.userId}`).then(
    //             function(response) {
    //                 if (response.status === 200) {
    //                     redirectStatus.setState({redirect: true});
    //                     // history.push('/register');
    //                 }
    //             }
    //         )
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }

    render () {
        let modalClose = () => this.setState({ modalShow: false });
        let modalCloseDelete = () => this.setState({ deleteShow: false });
        const {user} = this.state;
        if (user === null) return <p>Loading Profile...</p>;
        let username = user.username;
        let uppercaseUsername = username.charAt(0).toUpperCase() + username.slice(1);
        return (
            <Container fluid className='container-profile'>
                {this.state.redirect && (
                    <Redirect to={`/register`} />
                )}
                <div>
                    <h1 className=' profile-title'>{uppercaseUsername}'s Profile</h1>
                </div>
                <Row className='button-row-profile'>
             
                    <Col className='profiles-button' lg={3} md={6} sm={6}>
                    
                            <ProfilePageButton onClick={() => this.setState({modalShow: true})} buttonIcon={'fas fa-list-ul'}/>
                            <h6>'Try Next' List</h6>
                            <TryNextListModal 
                                    show={this.state.modalShow}
                                    onHide={modalClose}
                                    user={this.state.user}
                            />
                    </Col>
                    <Col className='profiles-button' lg={3} md={6} sm={6}>
                            <ProfilePageButton buttonIcon={'fas fa-users'} />
                            <h6>View Friends</h6>
                    </Col>
                </Row>
                <Row className='button-row-profile'>
                    <Col className='profiles-button' lg={3} md={6} sm={6}>
                        <ProfilePageButton buttonIcon={'fas fa-user-lock'} />
                        <h6>Reset Password</h6>
                    </Col>
                    <Col className='profiles-button' lg={3} md={6} sm={6}>
                        <ProfilePageButton onClick={() => this.setState({deleteShow: true})} buttonIcon={'fas fa-trash-alt'} />
                        <h6>Delete Account</h6>
                        <DeleteAccountModal
                            show={this.state.deleteShow}
                            onHide={modalCloseDelete}
                            handleConfirmDeleteUser={this.handleConfirmDeleteUser}
                            
                        />
                    </Col>
                </Row>
            </Container>
        )
    }
}


export default UserProfile;