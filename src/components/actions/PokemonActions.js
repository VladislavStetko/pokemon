import axios from "axios";

export const GetPokemonList = (page,per) => async dispatch => {
  try {
    dispatch({
      type: "POKEMON_LIST_LOADING"
    });

    const perPage = per;
    const offset = (page * perPage) - perPage;

    const res = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${perPage}&offset=${offset}`)

    dispatch({
      type: "POKEMON_LIST_SUCCESS",
      payload: res.data
    })
  } catch (e) {
    dispatch({
      type: "POKEMON_LIST_FAIL",
    })
  }
};

export const GetPokemon = (pokemon,length) => async dispatch => {
  try {
    dispatch({
      type: "POKEMON_MULTIPLE_LOADING"
    });
    // if(length>1)
    // const results = [];
    const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    dispatch({
      type: "POKEMON_MULTIPLE_SUCCESS",
      payload: res.data,
      pokemonName: pokemon
    })
  } catch (e) {
    dispatch({
      type: "POKEMON_MULTIPLE_FAIL",
    })
  }
};
export const GetPokemonType=(pokemonType)=>async dispatch=>{
  try{
  dispatch({
    type: "POKEMON_TYPE_LOADING"
  });

  const res = await axios.get(`https://pokeapi.co/api/v2/type/${pokemonType}`);
  console.log(res.data.pokemon);
    dispatch({
      type: "POKEMON_TYPE_SUCCESS",
      payload: res.data,
    })
  } catch (e) {
    dispatch({
      type: "POKEMON_TYPE_FAIL",
    })
  }

}
