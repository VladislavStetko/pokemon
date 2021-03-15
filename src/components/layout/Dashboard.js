import React, { Component } from "react";
import PokemonList from "../pokemon/PokemonList";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";

export default class Dashboard extends Component {
  render() {
    return (
      <>
        <div className="row mb-2 ">
          <div className="col-md-12 d-flex justify-content-around">
            <DropdownButton
              alignRight
              title="Dropdown right"
              id="dropdown-menu-align-right"
              //onSelect={handleSelect}
            >
              <Dropdown.Item eventKey="option-1">option-1</Dropdown.Item>
              <Dropdown.Item eventKey="option-2">option-2</Dropdown.Item>
              <Dropdown.Item eventKey="option-3">option 3</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item eventKey="some link">some link</Dropdown.Item>
            </DropdownButton>
            <form class="form-inline my-2 my-lg-0">
              <input
                class="form-control mr-sm-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button class="btn btn-dark my-2 my-sm-0" type="submit">
                Search
              </button>
            </form>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <PokemonList />
          </div>
        </div>
      </>
    );
  }
}
