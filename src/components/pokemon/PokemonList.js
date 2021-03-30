import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import _, { set } from "lodash";
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
  const typesArray =[];
  const [search, setSearch] = useState("");
  const [perid, setPer] = useState("10");
  const [type, setType] = useState(false);
  const dispatch = useDispatch();
  const pokemonList = useSelector((state) => state.PokemonList);
  const pokemonType = useSelector((state)=>state.PokemonType);
  React.useEffect(() => {
    FetchData(1);
    FetchType();
  }, []);

  const FetchType = (pokemonType) =>{
    dispatch(GetPokemonType(pokemonType));
  }

  const FetchData = (page = 1, per = perid) => {
    dispatch(GetPokemonList(page, per));
  };


  const ShowData = () => {
    if(!_.isEmpty(pokemonType.data)){
      pokemonType.data.map((pkmn)=>{
        typesArray.push({name:pkmn.pokemon.name, url:pkmn.pokemon.url })
      })
    }
    if (pokemonList.loading) {
      return <p>Loading...</p>;
    }

    if (!_.isEmpty(pokemonList.data)&&type===false) {
      
      return (
        <div className={"row"}>
          {pokemonList.data.map((el) => {
            return (
                  <PokemonCard pokemon={el.name} />
            );
          })}
        </div>
      );
    }
    else if (type===true){
      return (
        <div className={"row"}>
          {typesArray.map((el) => {
            return (
                  <PokemonCard pokemon={el.name} />
            );
          })}
        </div>
      );
    }

    if (pokemonList.errorMsg !== "") {
      return <p>{pokemonList.errorMsg}</p>;
    }

    return <p>unable to get data</p>;
  };

  return (
    <>
      <div className="row mb-2">
        <div className="col-md-6 mx-auto">
          <p>Search: </p>
          <input type="text" onChange={(e) => setSearch(e.target.value.toLowerCase())} />
          <button onClick={() => props.history.push(`/pokemon/${search}`)}>
            Search
          </button>
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
              />
            ))}
          </Form>
          <button 
          onClick={()=>{
            setType(true);
            FetchType("normal");
          }}>
            Types
          </button>
        </div>
      </div>
        <div className="col-md-6">
        <DropdownButton
            variant="danger"
            alignRight
            title="Кількість покемонів"
            id="dropdown-menu-align-right"
            onSelect={(e)=>{
              setType(false);
              FetchData(1,e);
              setPer(e);
            }}
          >
            {[10, 20, 50].map((item) => (
              <DropdownItem eventKey={item} value={item}>
                {item}
              </DropdownItem>
            ))}
          </DropdownButton>
        </div>
      </div>
      <div className="row">
        <div className="col">

          {ShowData()}
        </div>
      </div>
      {(!_.isEmpty(pokemonList.data)&&type===false) ? (
        <ReactPaginate
          pageCount={Math.ceil(pokemonList.count / perid)}
          pageRangeDisplayed={2}
          marginPagesDisplayed={1}
          onPageChange={(data) => FetchData(data.selected + 1)}
          containerClassName={"pagination"}
        />
      ):(
        <h2>One Page</h2>
      )}
    </>
  );
};

export default PokemonList;
