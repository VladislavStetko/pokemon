import React, { Component } from "react";
import styled from "styled-components";

const NavBarStyle = styled.nav``;

function NavBar() {
  return (
    <div>
      <nav className="navbar navbar-epand-md navbar-dark bg-dark fixed-top">
        <a
          href=""
          className="navbar-brand col-sm-3 col-md-2 mr-0 align-items-center"
        >
          Pokedex
        </a>
      </nav>
    </div>
  );
}

export default NavBar
