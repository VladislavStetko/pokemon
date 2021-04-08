const DefaultState = {
    loading: false,
    data: [],
    errorMsg: "",
    count: 0
  };
  
  const PokemonTypeReducer = (state = DefaultState, action) => {
    switch (action.type) {
      case "POKEMON_TYPE_LOADING":
        return {
          ...state,
          loading: true,
          errorMsg: ""
        };
      case "POKEMON_TYPE_FAIL":
        return {
          ...state,
          loading: false,
          errorMsg: "unable to get pokemon"
        };
      case "POKEMON_TYPE_SUCCESS":{
        return {
          ...state,
          loading: false,
          data: action.payload.pokemon,
          errorMsg: "",
          count: action.payload.count
        };
      }
        
      default:
        return state
    }
  };
  
  export default PokemonTypeReducer