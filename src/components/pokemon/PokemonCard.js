import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {GetPokemon} from "../actions/PokemonActions";
import _ from "lodash";
import { Link } from "react-router-dom";

const Pokemon = (props) => {
  const pokemonName = props.pokemon;
  const dispatch = useDispatch();
  const pokemonState = useSelector(state => state.Pokemon);
  React.useEffect(() => {
    dispatch(GetPokemon(pokemonName))
  }, []);

  const ShowData = () => {
    if (!_.isEmpty(pokemonState.data[pokemonName])) {
      const pokeData = pokemonState.data[pokemonName];
      return(
        <Link to={`pokemon/${pokeData.name}`}>
        
        <div className="card">
          <div className="card-header">
            {pokeData.name}
          </div>
          <div className="card-img-top rounded mx-auto d-block mt-2">
            <img src={pokeData.sprites.front_default} alt=""/>
          </div>
          <div className="item">
            {pokeData.stats.map(el => {
              return <p>{el.stat.name} {el.base_stat}</p>
            })}
          </div>
          <div className="item">
            {pokeData.abilities.map(el => {
              return <p>{el.ability.name}</p>
            })}
          </div>
        </div>
        </Link>
      )
    }

    if (pokemonState.loading) {
      return <p>Loading...</p>
    }

    if (pokemonState.errorMsg !== "") {
      return <p>{pokemonState.errorMsg}</p>
    }

    return <p>error getting pokemon</p>
  }

  return(
    <div className="col-md-3 col-sm-6 mb-5">
      {ShowData()}
    </div>
  )
};

export default Pokemon