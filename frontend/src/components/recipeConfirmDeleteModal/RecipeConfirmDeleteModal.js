import React from 'react';
import {Modal} from 'react-bootstrap';
import RecipeButton from '../buttons/RecipeButton';
import './recipeConfirmDeleteModal.css';


class RecipeConfirmDeleteModal extends React.Component {

  render() {
    const { handleDeleteRecipe, ...rest } = this.props;
    return (
      <Modal
        {...rest}
        size="sm"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
            <p className='modal-text text-center'>Are you sure you want to delete the '{this.props.title}' recipe?</p>
        </Modal.Header>

        <Modal.Footer className='modal-buttons'>
          <RecipeButton buttonName='Yes' onClick={this.props.handleDeleteRecipe} />
          <RecipeButton buttonName='No' onClick={this.props.onHide} />
        </Modal.Footer>
      </Modal>
    );
  }
}



  export default RecipeConfirmDeleteModal;








