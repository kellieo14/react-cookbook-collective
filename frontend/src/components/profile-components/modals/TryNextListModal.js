import React from 'react';
import {Modal, Col, Row, Container} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import './profileModals.css';



class TryNextListModal extends React.Component {

  render() {
    const { handleDisplayList, user, ...rest } = this.props;
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
                <Col>
                <h3 className='modal-title'>TRY NEXT LIST</h3>
                {this.props.user.recipes.length === 0 ? <div className='no-recipes-message center'>
                    <hr/>
                    <h5>No recipes currently on list.</h5>
                </div> :
                    <ul className='try-next-list'>
                        <hr />
                        {this.props.user.recipes.length > 0 && this.props.user.recipes.map((recipe) => {
                            return (
                                <li className='try-next-li' key={recipe.title}><Link to={`/recipe/${recipe._id}`} >{recipe.title}</Link></li>
                            )
                        })}
                        {user.recipes.length === 0 && (
                            <div>
                                <h6>No recipes on list</h6>
                            </div>
                        )}
                    </ul> 
                }
                </Col>
           </Row>   
        </Container>
        <Modal.Footer id='profile-modal-footer'>
        </Modal.Footer>
      </Modal>
    );
  }
}



  export default TryNextListModal;