import {combineReducers} from "redux";
import PokemonListReducer from "./PokemonListReducer";
import PokemonTypeReducer from "./PokemonTypeReducer";
import PokemonMultipleReducer from "./PokemonMultipleReducer";

const RootReducer = combineReducers({
  PokemonList: PokemonListReducer,
  Pokemon: PokemonMultipleReducer,
  PokemonType:PokemonTypeReducer,
});

export default RootReducer;