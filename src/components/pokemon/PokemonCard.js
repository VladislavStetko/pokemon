import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetPokemon } from "../actions/PokemonActions";
import _ from "lodash";
import { Link } from "react-router-dom";

const TYPE_COLORS = {
  bug: "linear-gradient(0deg, #85FFBD 0%, #FFFB7D 100%)",
  dark: "#4F3A2D",
  dragon: "755EDF",
  electric: "FCBC17",
  fairy: "F4B1F4",
  fighting: "823551D",
  fire: "E73B0C",
  flying: "A3B3F7",
  ghost: "6060B2",
  grass: "74C236",
  ground: "D3B357",
  ice: "A3E7FD",
  normal: "C8C4BC",
  poison: "934594",
  psychic: "ED4882",
  rock: "B9A156",
  steel: "B5B5C3",
  water: "3295F6",
};

const Pokemon = (props) => {
  const [active, setActive] = useState(false);
  const pokemonName = props.pokemon;
  const dispatch = useDispatch();
  const pokemonState = useSelector((state) => state.Pokemon);
  React.useEffect(() => {
    dispatch(GetPokemon(pokemonName));
  }, []);

  const ShowData = () => {
    if (!_.isEmpty(pokemonState.data[pokemonName])) {
      const pokeData = pokemonState.data[pokemonName];
      return (
        <Link to={`pokemon/${pokeData.name}`}>
          <div className="card " style={{
            backgroundImage:`${TYPE_COLORS[
              pokeData.types[0].type.name
           ]}`
      }}>
            <div className="card-header">{pokeData.name}</div>
            <div className="card-img-top ronded mx-auto mt-2">
              {active?<><img src={pokeData.sprites.front_default} alt="" />
              <img src={pokeData.sprites.back_default} alt="" />
              <img src={pokeData.sprites.front_shiny} alt="" />
              <img src={pokeData.sprites.back_shiny} alt="" />
              </>:
              <img src={pokeData.sprites.front_default} alt="" />
              }
            </div>
            <div className="card-header">
              {pokeData.stats.map((el) => {
                return (
                  <p>
                    {el.stat.name} {el.base_stat}
                  </p>
                );
              })}
            </div>
            <div className="card-header">
              {pokeData.abilities.map((el) => {
                return <p>{el.ability.name}</p>;
              })}
            </div>
          </div>
        </Link>
      );
    }

    if (pokemonState.loading) {
      return <p>Loading...</p>;
    }

    if (pokemonState.errorMsg !== "") {
      return <p>{pokemonState.errorMsg}</p>;
    }

    return (
      <div className="card">
        <div className="card-header"></div>
        <div className="card-img-top rounded mx-auto d-block mt-2"></div>
        <div className="item"></div>
        <div className="item"></div>
      </div>
    );
  };

  return <div className={active?'col-md-6 col-sm-12 mb-5':'col-md-3 col-sm-6 mb-5'}
    onMouseEnter={()=>{
      setActive(true);
    }}
    onMouseLeave={()=>{
      setActive(false);
    }}
  >{ShowData()}</div>;
};

export default Pokemon;
