import React, {useState, useEffect} from 'react'

function PokemonType({name, url}) {

    const [name, setName] = useState(name);
    const [url, setUrl] = useState(url);
    const [pokemonType, setPokemonType] = useState([]);

    useEffect(() => {
        let cancel;
        axios
          .get(currPage, {
            cancelToken: new axios.CancelToken((c) => (cancel = c)),
          })
          .then((res) => {
            setPokemonList(res.data.results);
            setPrevPage(res.data.previous);
            setNextPage(res.data.next);
          })
          .catch((error) => {
            console.log(error);
          });
        return () => {
          cancel();
        };
      }, [pokemonType]);


    return (
        <div>
            
        </div>
    )
}

export default PokemonType
