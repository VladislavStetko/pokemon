import React, {useState} from "react";
import "./App.scss";
import { Switch, Route, NavLink, Redirect } from "react-router-dom";
import PokemonList from "./components/pokemon/PokemonList";
import Pokemon from "./components/pokemon/Pokemon";
import 'bootstrap/dist/css/bootstrap.min.css';

function App(props) {
  const [search, setSearch] = useState("");
  return (
    <div className="App" id="app">
      <div className="container">
        <Switch>
          <Route path={"/"} exact component={PokemonList} />
          <Route path={"/pokemon/:pokemon"} exact component={Pokemon} />
          <Redirect to={"/"} />
        </Switch>
      </div>
    </div>
  );
}

export default App;
