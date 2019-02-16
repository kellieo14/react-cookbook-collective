import React from 'react';
import {Link} from 'react-router-dom';
import {Navbar, Nav, NavDropdown} from 'react-bootstrap'
import './recipeNavbar.css';

function RecipeNavbar() {
    return (

        <Navbar className='fixed-top' collapseOnSelect expand='lg' bg='dark' variant='dark'>
        <Navbar.Brand><Link className='navbar-link' to='/'>Kellie's Cookbook Collective</Link></Navbar.Brand>
        <Navbar.Toggle aria-controls='responsive-navbar-nav' />
        <Navbar.Collapse id='responsive-navbar-nav'>
          <Nav className='ml-auto'>
            <NavDropdown  title='Recipes' id='collasible-nav-dropdown'>
              <Link variant='dark' className='dropdown-link' to='/recipes'>View My cookbook</Link>
              <NavDropdown.Divider />
              <Link variant='dark' className='dropdown-link' to='/recipes/new'>Add Recipe</Link>
            </NavDropdown>
          </Nav>
          <Nav>
            <Nav.Link href='#deets'>Friends</Nav.Link>
            <Nav.Link eventKey={2} href='#memes'>
              My Account
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

    )
}

export default RecipeNavbar;


// function Navbar() {
//     return (
//         <nav className='navbar navbar-expand-lg navbar-dark bg-primary fixed-top'>
//             <Link className='navbar-brand' to='/'>
//                 Kellie's Cookbook Collective
//             </Link>
//             <div className='collapse navbar-collapse' id='navbarColor01'>
//                 <ul className='navbar-nav ml-auto'>
//                     <li className='nav-item active'>
//                         <Link className='nav-link' to='/'>Home <span className='sr-only'>(current)</span></Link>
//                     </li>
//                     <li className='nav-item'>
//                         <Link className='nav-link' to='/recipes'>Recipes</Link>
//                     </li>
//                     <li className='nav-item'>
//                         <Link className='nav-link' to='/recipes/new'>Add Recipe</Link>
//                     </li>
//                 </ul>
//             </div>
//         </nav>
//     )
// }

// export default Navbar;