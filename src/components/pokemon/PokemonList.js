import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import _ from "lodash";
import {GetPokemonList} from "../actions/PokemonActions";
import {Link} from "react-router-dom";
import ReactPaginate from "react-paginate";
import PokemonCard from './PokemonCard';

const PokemonList = (props) => {
  const [search, setSearch] = useState("");
  const [perid,setPer] = useState("3");
  const dispatch = useDispatch();
  const pokemonList = useSelector(state => state.PokemonList);
  React.useEffect(() => {
    FetchData(1)
  }, []);

  const FetchData = (page = 1, per=perid) => {
    dispatch(GetPokemonList(page,per))
  }

  const ShowData = () => {
    if (pokemonList.loading) {
      return <p>Loading...</p>
    }

    if (!_.isEmpty(pokemonList.data)) {
      return(
        <div className={"list-wrapper"}>
          {pokemonList.data.map(el => {
            return(
              <div className={"pokemon-item"}>
                <PokemonCard pokemon = {el.name}/>
                <Link to={`/pokemon/${el.name}`}>View</Link>
              </div>
            )
          })}
        </div>
      )
    }

    if (pokemonList.errorMsg !== "") {
      return <p>{pokemonList.errorMsg}</p>
    }

    return <p>unable to get data</p>
  };

  return(
    <div>
      <div className={"search-wrapper"}>
        <p>Search: </p>
        <input type="text" onChange={e => setSearch(e.target.value)}/>
        <button onClick={() => props.history.push(`/pokemon/${search}`)}>Search</button>
      </div>
      {ShowData()}
      {!_.isEmpty(pokemonList.data) && (
        <ReactPaginate
          pageCount={Math.ceil(pokemonList.count / perid)}
          pageRangeDisplayed={2}
          marginPagesDisplayed={1}
          onPageChange={(data) => FetchData(data.selected + 1)}
          containerClassName={"pagination"}
        />
      )}
    </div>
  )
};

export default PokemonList