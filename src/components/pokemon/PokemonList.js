import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";
import { GetPokemonList, GetPokemonType } from "../actions/PokemonActions";
import ReactPaginate from "react-paginate";
import PokemonCard from "./PokemonCard";
import DropdownButton from "react-bootstrap/DropdownButton";
import DropdownItem from "react-bootstrap/esm/DropdownItem";
import { Form } from "react-bootstrap";

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

const PokemonList = (props) => {
  const [checksArray, setChecksArray] = useState([]);
  const [currTypePage, setCurrTypePage] = useState(0);
  const [perid, setPer] = useState("10");
  const [type, setType] = useState(false);
  const typesPer = [];
  const [filter, setFilter] = useState("");
  const dispatch = useDispatch();
  const pokemonList = useSelector((state) => state.PokemonList);
  const pokemonType = useSelector((state) => state.PokemonType);
  React.useEffect(() => {
    FetchData(1);
    FetchType(1);
  }, []);

  const FetchType = (pokemonFetchType) => {
    dispatch(GetPokemonType(pokemonFetchType));
  };

  const FetchData = (page = 1, per = perid) => {
    dispatch(GetPokemonList(page, per));
  };

  const checkChange = (e) => {
    const { target } = e;
    const value = target.type === "checkbox" ? target.checked : target.value;
    if (value) {
      setType(true);
      checksArray.push(e.target.id);
      FetchType(e.target.id);
    } else {
      let ind = checksArray.indexOf(e.target.id);
      checksArray.splice(ind, 1);
      if (checksArray.length < 1) {
        setType(false);
      }
    }
  };

  const ShowTypeByPage = () => {
    var tmp = [];
    for (var i = perid * currTypePage; i < perid * (currTypePage + 1); i++) {
      if (!_.isEmpty(typesPer[i])) tmp.push(typesPer[i]);
    }
    return (
      <>
        {tmp.map((el) => (
          el.name.includes(filter) &&
          <PokemonCard key={el.name} pokemon={el.name} />
        ))}
      </>
    );
  };

  const ShowData = () => {
    if (pokemonList.loading) {
      return <p>Loading...</p>;
    }
    if (!pokemonType.loading) {
      pokemonType.data.map((el) => {
        typesPer.push({name:el.pokemon.name});
      });
    }
    if (!_.isEmpty(pokemonList.data) && type === false) {
      return (
        <div className={"row"}>
          {pokemonList.data.map(
            (el) =>
              el.name.includes(filter) && (
                <PokemonCard key={el.name} pokemon={el.name} />
              )
          )}
        </div>
      );
    } else if (type === true) {
      return <div className={"row"}>{ShowTypeByPage()}</div>;
    }
    if (pokemonList.errorMsg !== "") {
      return <p>{pokemonList.errorMsg}</p>;
    }

    return <p>unable to get data</p>;
  };

  return (
    <>
      <div className="row mt-3 search">
        <div className="col-md-6">
          <form className="d-flex">
            <input
              placeholder="Пошук"
              type="text"
              onChange={(e) => setFilter(e.target.value.toLowerCase())}
            />
          </form>
        </div>
        <div className="col-md-6">
          <DropdownButton
            variant="danger"
            alignRight
            title="Кількість покемонів"
            id="dropdown-menu-align-right"
            onSelect={(e) => {
              setCurrTypePage(0);
              FetchData(1, e);
              setPer(e);
            }}
          >
            {[10, 20, 50].map((item) => (
              <DropdownItem key={item} eventKey={item} value={item}>
                {item}
              </DropdownItem>
            ))}
          </DropdownButton>
        </div>
      </div>

      <div className="row types-checks mb-5">
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
        </div>
      </div>
      <div className="row d-flex align-content-stretch">
        <div className="col">{ShowData()}</div>
      </div>
      {!_.isEmpty(pokemonList.data) && type === false ? (
        <ReactPaginate
          pageCount={Math.ceil(pokemonList.count / perid)}
          pageRangeDisplayed={2}
          marginPagesDisplayed={1}
          onPageChange={(data) => FetchData(data.selected + 1)}
          containerClassName={"pagination"}
        />
      ) : (
        <ReactPaginate
          pageCount={Math.ceil(pokemonType.data.length / perid)}
          pageRangeDisplayed={2}
          marginPagesDisplayed={1}
          onPageChange={(data) => setCurrTypePage(data.selected)}
          containerClassName={"pagination"}
        />
      )}
    </>
  );
};

export default PokemonList;
