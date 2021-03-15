import React, { Component } from 'react';
import PokemonList from '../pokemon/PokemonList';


export default class Dashboard extends Component {
    render() {
        return (
            <>
            <div className="row mb-2 ">
                <div className="col-md-12 d-flex justify-content-around">
                    <div class="dropdown">
                        <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Dropdown button
                        </button>
                    <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                        <a class="dropdown-item" href="#">Action</a>
                        <a class="dropdown-item" href="#">Another action</a>
                        <a class="dropdown-item" href="#">Something else here</a>
                    </div>
                    </div>
                    <form class="form-inline my-2 my-lg-0">
                        <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
                        <button class="btn btn-dark my-2 my-sm-0" type="submit">Search</button>
                    </form>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <PokemonList/>
                </div>
            </div>
            </>
        )
    }
}
