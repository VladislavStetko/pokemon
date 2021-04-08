import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetPokemon } from "../actions/PokemonActions";
import _ from "lodash";

const TYPE_COLORS = {
  bug: "B1C12E",
  dark: "4F3A2D",
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
  const pokemonName = props.match.params.pokemon;
  const dispatch = useDispatch();
  const pokemonState = useSelector((state) => state.Pokemon);
  React.useEffect(() => {
    dispatch(GetPokemon(pokemonName));
  }, []);

  const ShowData = () => {
    if (!_.isEmpty(pokemonState.data[pokemonName])) {
      const pokeData = pokemonState.data[pokemonName];
      console.log(pokeData);
      return (
        <>
          <div className="poke">
            <div className="header">
              <span className="id">{pokeData.id}</span>
              <div className="name">{pokeData.name}</div>
            </div>
            <div className="row d-flex">
              <div className="col-md-6">
                <div className="images">
                  <img
                    src={`https://pokeres.bastionbot.org/images/pokemon/${pokeData.id}.png`}
                    alt="front_pic"
                  />
                </div>
                <div className="stats">
                    {pokeData.stats.map((el) => {
                      return <div className="progress">
                      <div
                      key={el.stat.name}
                        className="progress-bar"
                        role="progressbar"
                        aria-valuenow={el.base_stat}
                        aria-valuemin="0"
                        aria-valuemax="200"
                      ></div>
                      </div>;
                    })}
                </div>
              </div>
              <div className="col-md-6"></div>
            </div>
          </div>
        </>
      );
    }

    if (pokemonState.loading) {
      return <p>Loading...</p>;
    }

    if (pokemonState.errorMsg !== "") {
      return <p>{pokemonState.errorMsg}</p>;
    }

    return <p>error getting pokemon</p>;
  };

  return <>{ShowData()}</>;
};
export default Pokemon;
