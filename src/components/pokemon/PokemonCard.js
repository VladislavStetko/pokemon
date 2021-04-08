import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetPokemon } from "../actions/PokemonActions";
import _ from "lodash";

const TYPE_COLORS = {
  bug: "#B1C12E",
  dark: "#4F3A2D",
  dragon: "#755EDF",
  electric: "#FCBC17",
  fairy: "#F4B1F4",
  fighting: "#823551D",
  fire: "#E73B0C",
  flying: "#A3B3F7",
  ghost: "#6060B2",
  grass: "#74C236",
  ground: "#D3B357",
  ice: "#A3E7FD",
  normal: "#C8C4BC",
  poison: "#934594",
  psychic: "#ED4882",
  rock: "#B9A156",
  steel: "#B5B5C3",
  water: "#3295F6",
};

const PokemonCard = (props) => {
  const pokemonName = props.pokemon;
  const dispatch = useDispatch();
  const pokemonState = useSelector((state) => state.Pokemon);
  React.useEffect(() => {
    dispatch(GetPokemon(pokemonName));
  }, []);


  const statsSwitch=(parameter)=>{
    switch (parameter) {
      case "hp":
        return <i className="fas fa-heart"></i> 
      case "defense":
        return <i className="fas fa-shield-alt"></i>
      default:
    }
  };


  const ShowData = () => {
    if (!_.isEmpty(pokemonState.data[pokemonName])) {
      const pokeData = pokemonState.data[pokemonName];
      return (
          <div className={`card ${pokeData.types[0].type.name}`}
          >
            <div className="card-header">
              <span className="badge bg-light text-dark mr-2">{pokeData.id}</span>
              <span>{pokeData.name}</span>
              
              </div>
            <div className="card-img-top ronded mt-2">
              <img src={pokeData.sprites.front_default} alt={pokeData.name} />
            </div>
            <div className="card-body hidden">
              <ul>
                <li className="card-li-header">Тип покемона</li>
              {pokeData.types.map((el)=>{
                return(
                  <li 
                  className={"types"}
                  key={el.type.name} 
                  style={{
                    backgroundColor: `${TYPE_COLORS[el.type.name]}`
                  }}
                  >{el.type.name}</li>
                )
              })}
                <li className="card-li-header">Характеристики</li>
              {pokeData.stats.map((el) => {
                return (
                  <li key={el.stat.name}>{el.stat.name} {el.base_stat}</li>
                );
              })}
              <li className="card-li-header">Особливі навички</li>
              {pokeData.abilities.map((el) => {
                return <li key={el.ability.name} className="abilities">{el.ability.name}</li>;
              })}
              </ul>
            </div>

          </div>
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

  return (
  <div className="col-md-3 col-sm-12 mb-5">
    {ShowData()}
  </div>
  )
};

export default PokemonCard;
