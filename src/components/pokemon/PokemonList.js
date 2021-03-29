import React, { useState, useEffect } from "react";
import PokemonCard from "./PokemonCard";
import axios from "axios";
import Pagination from "../layout/Pagination";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import { Form } from "react-bootstrap";
import "../layout/style.scss";
import PokemonTypes from "./PokemonTypes";
import DropdownItem from "react-bootstrap/esm/DropdownItem";

const types = [
  "normal",
  "fighting",
  "flying",
  "poison",
  "ground",
  "rock",
  "bug",
  "ghost",
  "steel",
  "fire",
  "water",
  "grass",
  "electric",
  "psychic",
  "ice",
  "dragon",
  "dark",
  "fairy",
];

function PokemonList() {
  //Змінні
  const [pokemonList, setPokemonList] = useState([]);
  const [currPage, setCurrPage] = useState(
    `https://pokeapi.co/api/v2/pokemon?offset=0&limit=20`
  );
  const [nextPage, setNextPage] = useState();
  const [prevPage, setPrevPage] = useState();
  const [pageNum, setPageNum] = useState(0);
  const [filter, setFilter] = useState("");
  const [pokemonType, setPokemonType] = useState([]);
  const [flag, setFlag] = useState(false);

  const tmpType = [];
  const snippet = [];

  //Події
  const handleChange = (e) => {
    setCurrPage(
      `https://pokeapi.co/api/v2/pokemon?offset=${pageNum}&limit=${e}`
    );
  };

  const checkChange = (e) => {
    const { target } = e;
    const value = target.type === "checkbox" ? target.checked : target.value;
    if (value) {
      setFlag(true);
      tmpType.push(e.target.id);
      setCurrPage(`https://pokeapi.co/api/v2/type/${e.target.id}/`);
      setTimeout(2000);
      console.log(pokemonType);
      console.log(tmpType);
    } else {
      let ind = tmpType.indexOf(e.target.id);
      tmpType.splice(ind, 1);
    }
  };
  const handleSearch = (e) => {
    setCurrPage("https://pokeapi.co/api/v2/pokemon?offset=0&limit=2000");
    setFilter(e.target.value.toLowerCase());
  };
  //Заповнення даних покемонів
  useEffect(() => {
    let cancel;
    axios
      .get(currPage, {
        cancelToken: new axios.CancelToken((c) => (cancel = c)),
      })
      .then((res) => {
        setPokemonType(res.data.pokemon);
        console.log(res.data.pokemon);
        setPokemonList(res.data.results);
        console.log(res.data.results);
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
  //Робота з пагінацією
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

  //Робота з типами
  function typesGenerate() {
    setFlag(true);
    setCurrPage(`https://pokeapi.co/api/v2/type/4/`);
  }

  // useEffect(() => {
  //   let cancel;
  //   axios
  //     .get(typePage, {
  //       cancelToken: new axios.CancelToken((c) => (cancel = c)),
  //     })
  //     .then((res) => {
  //        setPokemonType(res.data.pokemon);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  //   return () => {
  //     cancel();
  //   };
  // });

  return (
    <React.Fragment>
      <div className="row mb-2">
        <div className="col mx-auto">
          <DropdownButton
            variant="danger"
            alignRight
            title="Кількість покемонів"
            id="dropdown-menu-align-right"
            onSelect={handleChange}
          >
            {[10, 20, 50].map((item) => (
              <DropdownItem eventKey={item} value={item}>
                {item}
              </DropdownItem>
            ))}
          </DropdownButton>
        </div>
        <div className="col input-group">
          <input
            type="text"
            className="form-control"
            placeholder="Пошук покемона"
            onChange={handleSearch}
          />
        </div>
      </div>
      <div className="row types-checks">
        <div className="col-md-12">
          <Form className="d-flex justify-content-center rounded flex-wrap">
            {types.map((type) => (
              <Form.Check
                key={type}
                inline
                label={type}
                type="checkbox"
                id={type}
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
        <div className="row">
          {pokemonType.map((pokemon) => (
            <PokemonCard
              key={pokemon.pokemon.name}
              name={pokemon.pokemon.name}
              url={pokemon.pokemon.url}
            />
          ))}
        </div>
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
