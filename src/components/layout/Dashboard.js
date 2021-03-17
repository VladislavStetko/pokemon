import React, { Component, useState,useEffect } from "react";
import PokemonList from "../pokemon/PokemonList";

function Dashboard() {
  const [value, setValue] = useState();

  const handleSelect = (e) => {
    setValue(e);
  }
 
  return (
    <>
      <div className="row">
        <div className="col">
          <PokemonList pages={value} />
        </div>
      </div>
    </>
  );
}

export default Dashboard;