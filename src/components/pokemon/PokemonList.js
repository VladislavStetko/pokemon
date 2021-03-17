import React, { Component, useState, useEffect } from "react";
import PokemonCard from "./PokemonCard";
import axios from "axios";
import Pagination from "../layout/Pagination";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";

function PokemonList() {
  const [pokemonList, setPokemonList] = useState([]);
  const [currPage, setCurrPage] = useState(
    `https://pokeapi.co/api/v2/pokemon?offset=0&limit=0`
  );
  const [nextPage, setNextPage] = useState();
  const [prevPage, setPrevPage] = useState();
  const [pageNum, setPageNum] = useState(0);
  const [filter, setFilter] = useState("");

  const handleChange = (e) => {
    setCurrPage(`https://pokeapi.co/api/v2/pokemon?offset=${pageNum}&limit=${e}`)
  };
  const handleSearch = (e) => {
    setFilter(e.target.value.toLowerCase());
  };

  useEffect(() => {
    let cancel;
    axios
      .get(currPage, {
        cancelToken: new axios.CancelToken((c) => (cancel = c)),
      })
      .then((res) => {
        setPokemonList(res.data.results);
        setPrevPage(res.data.previous);
        setNextPage(res.data.next);
      })
      .catch((error) => {
        console.log(error);
      });
    return () => {
      cancel();
    };
  }, [currPage, pageNum]);

  function stringWork(string) {
    const page = string.indexOf("=");
    const amp = string.indexOf("&");
    return string.substr(page + 1, amp - page - 1);
  }
  function gotoNext() {
    setCurrPage(nextPage);
    setPageNum(stringWork(nextPage));
  }
  function gotoPrev() {
    setCurrPage(prevPage);
    setPageNum(stringWork(prevPage));
  }

  return (
    <React.Fragment>
      <div className="row mb-2">
        <div className="col-md-3 mx-auto">
          <DropdownButton
            variant="danger"
            alignRight
            title="Кількість покемонів"
            id="dropdown-menu-align-right"
            onSelect={handleChange}
          >
            <Dropdown.Item eventKey="10" value="10">
              10
            </Dropdown.Item>
            <Dropdown.Item eventKey="20" value="20">
              20
            </Dropdown.Item>
            <Dropdown.Item eventKey="30" value="30">
              30
            </Dropdown.Item>
          </DropdownButton>
        </div>
        <div className="col-md-3 mx-auto">
          <DropdownButton
            variant="danger"
            alignRight
            title="Кількість покемонів"
            id="dropdown-menu-align-right"
          >
            <Dropdown.Item eventKey="10" value="10">
              10
            </Dropdown.Item>
            <Dropdown.Item eventKey="20" value="20">
              20
            </Dropdown.Item>
            <Dropdown.Item eventKey="30" value="30">
              30
            </Dropdown.Item>
          </DropdownButton>
        </div>
        <div className="col-md-3 mx-auto">
          <form className="form-inline my-2 my-lg-0">
            <input
              onChange={handleSearch}
              class="form-control mr-sm-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
          </form>
        </div>
      </div>
      {pokemonList ? (
        <div className="row">
          {pokemonList.map((pokemon, index) => (pokemonList[index].name.includes(filter)&&
            <PokemonCard
              key={pokemon.name}
              name={pokemon.name}
              url={pokemon.url}
            />
          ))}
        </div>
      ) : (
        <h1>Loading Pokemon</h1>
      )}
      <div className="row">
        <div className="col-md-12 d-flex justify-content-center">
          <Pagination
            gotoNext={nextPage ? gotoNext : null}
            gotoPrev={prevPage ? gotoPrev : null}
            page={pageNum}
          />
        </div>
      </div>
    </React.Fragment>
  );
}

export default PokemonList;
