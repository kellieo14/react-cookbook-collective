import React from 'react';
import {Link} from 'react-router-dom';
import {Container} from 'react-bootstrap';
import BorderBoxButtonLarge from '../buttons/BorderBoxButtonLarge';
import './notFoundPage.css';
import lemon from './lemon.png';


const NotFoundPage = (props) => {
    
    return (
        <Container fluid className='center container-div-404'>
        <div id='row-404'>
            <div md={6} xs={12} className='left-col-404 '>
            <div className='title-404'>
                <h1>4</h1>
                <img className='image-0' src={lemon} alt='lemon'/>
                <h1>4</h1>
            </div>
            <div className='hide-on-large'>
                <p>Oops, the page you're looking for does not exist.</p>
                <Link className='border-box-link' to='/'><BorderBoxButtonLarge  buttonName='Return Home'/></Link>
            </div>

            </div>
            <div md={6} xs={12} className='right-col-404'>
                <h1>OOPS!</h1>
                <h6>The page you're looking for does not exist.</h6>
                <Link className='border-box-link' to='/'><BorderBoxButtonLarge buttonName='Return Home'/></Link>
                
            </div>
        </div>
           
        </Container>
    )
}

export default NotFoundPage;







// import React from 'react';
// import {Link} from 'react-router-dom';
// import {Container, Row, Col} from 'react-bootstrap';
// import BorderBoxButtonLarge from '../buttons/BorderBoxButtonLarge';
// import './notFoundPage.css';
// import lemon from './lemon.png';


// const NotFoundPage = (props) => {
    
//     return (
//         <Container fluid className='center container-div-404'>
//         <Row id='row-404'>
//             <Col md={6} xs={12} className='left-col-404 '>
//             <div className='title-404'>
//                 <h1>4</h1>
//                 <img className='image-0' src={lemon} alt='lemon'/>
//                 <h1>4</h1>
//             </div>
//             <div className='hide-on-large'>
//                 <p>Oops, the page you're looking for does not exist.</p>
//                 <Link className='border-box-link' to='/'><BorderBoxButtonLarge  buttonName='Return Home'/></Link>
//             </div>

//             </Col>
//             <Col md={6} xs={12} className='right-col-404'>
//                 <h1>OOPS!</h1>
//                 <h6>The page you're looking for does not exist.</h6>
//                 <Link className='border-box-link' to='/'><BorderBoxButtonLarge buttonName='Return Home'/></Link>
                
//             </Col>
//         </Row>
           
//         </Container>
//     )
// }

// export default NotFoundPage;

// import React from 'react';
// import {Link} from 'react-router-dom';
// import {Container, Row, Col} from 'react-bootstrap';
// import './notFoundPage.css';
// // import cookie from './cookie.png';
// import lemon from './lemon.png';


// const NotFoundPage = (props) => {
//     // let pathName = (props.location.pathname.substring(1));
//     // pathName = pathName.charAt(0).toUpperCase() + pathName.slice(1);
    
//     return (
//         <Container className='center container-div-404'>
//             <div className='title-404'>
//                 <h1>4</h1>
//                 <img className='image-0' src={lemon} alt='cookie'/>
//                 <h1>4</h1>
//             </div>
//             <p>Ooops, the page you're looking for does not exist.</p>
//            <div>
//            <Link className='home-link'to='/'>Return Home</Link>
//            </div>
           
//         </Container>
//     )
// }

// export default NotFoundPage;