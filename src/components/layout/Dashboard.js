import React, { Component, useState } from "react";
import PokemonList from "../pokemon/PokemonList";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import Pagination from "./Pagination";

export default class Dashboard extends Component {
  

   
  

  render() {
    return (
      <>
        <div className="row mb-2 ">
          <div className="col-md-12 d-flex justify-content-around">
            <DropdownButton
              variant="danger"
              alignRight
              title="Кількість покемонів"
              id="dropdown-menu-align-right"
              //onSelect={handleSelect}
            >
              <Dropdown.Item eventKey="10">10</Dropdown.Item>
              <Dropdown.Item eventKey="20">20</Dropdown.Item>
              <Dropdown.Item eventKey="30">30</Dropdown.Item>
            </DropdownButton>
            <form class="form-inline my-2 my-lg-0">
              <input
                class="form-control mr-sm-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button class="btn btn-dark my-2 my-sm-0" type="submit">
                Find

              </button>
            </form>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <PokemonList />
          </div>
        </div>
        <div className="row">
          <div className="col-md-12 d-flex justify-content-center">
            <Pagination/>
          </div>
        </div>
      </>
    );
  }
}
