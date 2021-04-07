import React from 'react';
import {Navbar} from 'react-bootstrap';
import logo from './logo.png';

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
