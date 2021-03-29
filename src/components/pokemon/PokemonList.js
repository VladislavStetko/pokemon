import React, { Component, useState, useEffect } from "react";
import PokemonCard from "./PokemonCard";
import axios from "axios";
import Pagination from "../layout/Pagination";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import { Form } from "react-bootstrap";
import "../layout/style.scss";
import PokemonTypes from "./PokemonTypes";

const types = [
  { name: "normal", index: 1 },
  { name: "fighting", index: 2 },
  { name: "flying", index: 3 },
  { name: "poison", index: 4 },
  { name: "ground", index: 5 },
  { name: "rock", index: 6 },
  { name: "bug", index: 7 },
  { name: "ghost", index: 8 },
  { name: "steel", index: 9 },
  { name: "fire", index: 10 },
  { name: "water", index: 11 },
  { name: "grass", index: 12 },
  { name: "electric", index: 13 },
  { name: "psychic", index: 14 },
  { name: "ice", index: 15 },
  { name: "dragon", index: 16 },
  { name: "dark", index: 17 },
  { name: "fairy", index: 18 },
];

function PokemonList() {
  const [pokemonList, setPokemonList] = useState([]);
  const [currPage, setCurrPage] = useState();
  const [nextPage, setNextPage] = useState();
  const [prevPage, setPrevPage] = useState();
  const [pageNum, setPageNum] = useState(0);
  const [filter, setFilter] = useState("");

  const [typesArray, setTypesArray] = useState([]);

  const tmpType = [];

  const handleChange = (e) => {
    setCurrPage(
      `https://pokeapi.co/api/v2/pokemon?offset=${pageNum}&limit=${e}`
    );
  };

  const checkChange = (e) => {
    const { target } = e;
    const value = target.type === "checkbox" ? target.checked : target.value;
    if (value) {
      tmpType.push(e.target.id);
    } else {
      let ind = typesArray.indexOf(e.target.id);
      tmpType.splice(ind, 1);
    }
  };
  const handleSearch = (e) => {
    if (e.target.value == " ") {
      setCurrPage(`https://pokeapi.co/api/v2/pokemon?offset=0&limit=10`);
    } else {
      setCurrPage(`https://pokeapi.co/api/v2/pokemon?offset=0&limit=1000`);
      setFilter(e.target.value.toLowerCase());
    }
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
  function typesGenerate() {
    console.log(tmpType);
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
            <Dropdown.Item eventKey="50" value="50">
              50
            </Dropdown.Item>
          </DropdownButton>
        </div>
        <div className="col-md-3 mx-auto">
          <form className="form-inline my-2 my-lg-0">
            <input
              onChange={handleSearch}
              className="form-control mr-sm-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
          </form>
        </div>
      </div>
      <div className="row types-checks">
        <div className="col-md-12">
          <Form className="d-flex justify-content-center flex-wrap">
            {types.map((type) => (
              <Form.Check
                key={type.name}
                inline
                label={type.name}
                type="checkbox"
                id={type.index}
                onChange={checkChange}
              />
            ))}
          </Form>
          <button onClick={typesGenerate} className="btn btn-primary">
            Пошук
          </button>
        </div>
      </div>
      {pokemonList ? (
        <div className="row">
          {pokemonList.map(
            (pokemon, index) =>
              pokemonList[index].name.includes(filter) && (
                <PokemonCard
                  key={pokemon.name}
                  name={pokemon.name}
                  url={pokemon.url}
                />
              )
          )}
        </div>
      ) : (
        <h1>Loading Pokemon</h1>
      )}
      {typesArray ? (
        <div className="row">
          <PokemonTypes types={typesArray} />
        </div>
      ) : (
        <h1>Clear List</h1>
      )}
      <div className="row">
        <div className="col-md-12 d-flex justify-content-center">
          <Pagination
            gotoNext={nextPage ? gotoNext : null}
            gotoPrev={prevPage ? gotoPrev : null}
          />
        </div>
      </div>
    </React.Fragment>
  );
}

export default PokemonList;
