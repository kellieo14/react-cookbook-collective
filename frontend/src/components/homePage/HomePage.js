
import React from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import CircleButton from '../buttons/CircleButton';
import CircleButtonNoUser from '../buttons/CircleButtonNoUser';
import './homePage.css';



const HomePage = (props) => {
    return(
        <Container fluid className='homepage-container center'>

            <Row className='circle-button-div center'>
                <Col>
                    <div className='homepage-title'>
                        <h1 >Cookbook</h1>
                        <h1 >Collective</h1>
                        <hr/>
                        <p>A Place for all of your recipes</p>
                    </div>
                </Col>
                <Col>
                    {props.user && (
                        <div>
                            <CircleButton linkLocation={'/recipes'} linkName='View Cookbook' />
                        </div> 
                    )}
                   {!props.user && (
                       <div>
                           <CircleButtonNoUser linkLocation1={'/login'} linkName1='Login'  linkLocation2={'/register'} linkName2='Register'/>
                       </div>
                   )}
                </Col>
                
            </Row>


        </Container>
    )
}


export default HomePage;




// import React from 'react';
// import {Container, Row, Col} from 'react-bootstrap';
// import {Link} from 'react-router-dom';
// import SaveIconButton from '../buttons/SaveIconButton';
// import CircleButton from '../buttons/CircleButton';
// import './homePage.css';



// const HomePage = (props) => {
//     let items = [];
//     for (let i = 1; i <= 28; i++) {
//             items.push(<li key={i}><div  className='hexagon'></div></li>)
    
//     }
//     console.log(props);
//     return(
//         <Container fluid className='homepage-container center'>
//         <Row>
//             <Col md={8} sm={0} className='honeycomb'>
//                 <ul id='grid' className='clear'>
//                     {items}
//                 </ul>
//             </Col >
//             <Col className='homepage-last-div' md={4} sm={12}>
//                 <h3>Cookbook</h3>
//                 <h3>Collective</h3>
//                 {props.user && (
//                     <div>
//                         {/* <CircleButton buttonName='View Cookbook' /> */}
//                         <Link to={'/recipes'}><SaveIconButton buttonName='View Cookbook' className='homepage-button' /></Link>
//                     </div>
//                 )}
//                 {!props.user && (
//                     <div>
//                         <Link to={'/login'}><SaveIconButton buttonName='Login' data-letters='Login'className='homepage-button' /></Link>
//                         <Link to={'/register'}><SaveIconButton buttonName='Register' className='homepage-button' /></Link>
//                     </div>
//                 )}
//             </Col>
//         </Row>
//         <Row className='homepage-small-screen-div'>
//         <Col >
//                 <h3>Cookbook Collective</h3>

//                 {props.user && (
//                     <div>
//                         <Link to={'/recipes'}><SaveIconButton buttonName='View Cookbook' className='homepage-button' /></Link>
//                     </div>
//                 )}
//                 {!props.user && (
//                     <div>
//                         <Row className='homepage-button-row'>
                 
//                             <Link to={'/login'}><SaveIconButton buttonName='Login' className='homepage-button' /></Link>
                       
                      
//                             <Link to={'/register'}><SaveIconButton buttonName='Register' className='homepage-button' /></Link>
                      
//                         </Row>
                       
                        
//                     </div>
//                 )}
//             </Col>
//         </Row>


//     </Container>
//     )
// }


// export default HomePage;







// import React from 'react';
// import {Container} from 'react-bootstrap';
// import './homePage.css';



// const HomePage = () => {
//     let items = [];
//     for (let i = 1; i <= 56; i++) {
//         if (i === 22) {
//             items.push(<li key={i}><div className='hexagon center homepage-lg'><p>Cookbook Collective</p></div></li>)
//         } else if (i === 5) {
//             items.push(<li key={i}><div className='hexagon center homepage-sm'><p>Cookbook Collective</p></div></li>)
//         } else {
//             items.push(<li key={i}><div  className='hexagon'></div></li>)
//         }
//     }

//     return(
//         <Container fluid className='homepage-container center'>
//             <ul id='grid' className='clear'>
//                 {items}
//             </ul>

//     </Container>
//     )
// }


// export default HomePage;