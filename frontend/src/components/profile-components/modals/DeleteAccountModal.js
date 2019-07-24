import React from 'react';
import {Modal, Col, Row, Container} from 'react-bootstrap';
import BorderBoxButton from '../../buttons/BoderBoxButton';
import './profileModals.css';



class DeleteAccountModal extends React.Component {

  render() {
    const { handleConfirmDeleteUser, ...rest } = this.props;
    return (
      <Modal
        {...rest}
        // size="sm"
        dialogClassName='modal-90w'
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header className='profile-modal-header' closeButton>
        </Modal.Header>
        <Container className='profile-modal-container'>
            <Row>
                <Col className='delete-account-modal center'>
                    <h6>Are you sure you want to delete your account?</h6> 
                    <div className='delete-modal-button-div'>
                        <BorderBoxButton onClick={this.props.handleConfirmDeleteUser} className='delete-yes-button' buttonName='Yes' />
                        <BorderBoxButton onClick={this.props.onHide} className='delete-no-button' buttonName='No' />   
                    </div>
 
                </Col>
           </Row>   
        </Container>
        <Modal.Footer id='profile-modal-footer'>
        </Modal.Footer>
      </Modal>
    );
  }
}



  export default DeleteAccountModal;