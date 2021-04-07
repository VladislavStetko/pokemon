import React from 'react';
import {Navbar} from 'react-bootstrap';

const NavBar=()=> {
    return (
    <Navbar bg="dark" variant="dark">
    <Navbar.Brand href="/"
    className="mx-auto">
      Pokedex
    </Navbar.Brand>
  </Navbar>
    )
}

export default NavBar
