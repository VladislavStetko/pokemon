import React, {useState} from "react";
import "./App.scss";
import { Switch, Route, NavLink, Redirect } from "react-router-dom";
import PokemonList from "./components/pokemon/PokemonList";
import NavBar from "./components/layout/NavBar";
import 'bootstrap/dist/css/bootstrap.min.css';

function App(props) {
  const [search, setSearch] = useState("");
  return (
    <div className="App" id="app">
      <NavBar/>
      <div className="container">
        <Switch>
          <Route path={"/"} exact component={PokemonList} />
          <Redirect to={"/"} />
        </Switch>
      </div>
    </div>
  );
}

export default App;
