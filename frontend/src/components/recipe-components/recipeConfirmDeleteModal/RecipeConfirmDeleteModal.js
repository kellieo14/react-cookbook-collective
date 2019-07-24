import React from 'react';
import {Modal, Col, Row, Container} from 'react-bootstrap';
import RecipeButton from '../../buttons/RecipeButton';
import './recipeConfirmDeleteModal.css';


class RecipeConfirmDeleteModal extends React.Component {

  render() {
    const { handleDeleteRecipe, ...rest } = this.props;
    return (
      <Modal
        {...rest}
        // size="sm"
        dialogClassName='modal-90w'
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header className='modal-close' closeButton>
        </Modal.Header>
        <Container>
            <Row>
                <Col xs={5} className='modal-image'></Col>
                <Col xs={7} className='modal-text-div'>
                  <p className='modal-text center'>Are you sure you want to delete the '{this.props.title}' recipe?</p>
                    <Row className='modal-buttons'>
                      <RecipeButton  buttonName='Yes' onClick={this.props.handleDeleteRecipe} />
                      <RecipeButton  buttonName='No' onClick={this.props.onHide} />
                    </Row>
                </Col>
           </Row>
                 
        </Container>
        <Modal.Footer className='modal-footer'>
        </Modal.Footer>
      </Modal>
    );
  }
}



  export default RecipeConfirmDeleteModal;












