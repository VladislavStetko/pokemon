import React, { useState, useEffect } from "react";
import axios from 'axios';

export default function TypeClass({ type }) {
  const [pokemonList, setPokemonList] = useState([]);
  const [currPage, setCurrPage] = useState(
    `https://pokeapi.co/api/v2/type/${type}`
  );
  useEffect(() => {
    let cancel;
    axios
      .get(currPage, {
        cancelToken: new axios.CancelToken((c) => (cancel = c)),
      })
      .then((res) => {
        setPokemonList(res.data.pokemons);
      })
      .catch((error) => {
      });
    return () => {
      cancel();
    };
  }, []);
  return (<div>

  </div>);
}
