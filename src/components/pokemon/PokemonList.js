import React, { Component } from 'react';
import PokemonCard from './PokemonCard';
import axios from 'axios';

export default class PokemonList extends Component {
    state = {
        //Посилання на JSON файл покемонів, лімітом можна змінювати кількість покемонів
        url:`https://pokeapi.co/api/v2/pokemon?limit=${this.props.pages}`,
        pokemon:null
    }
    //За допомогою асинхронності вносимо список покемонів в змінну
    async componentDidMount(){
        
        const res = await axios.get(this.state.url);
        this.setState({
            pokemon:res.data['results']
        
        });
    }
    render() {
        return (
            <React.Fragment>
            {this.state.pokemon?(
                <div className="row">
                {this.state.pokemon.map(pokemon=>(

                    <PokemonCard
                    key={pokemon.name}
                    name = {pokemon.name}
                    url={pokemon.url}
                    />
                ))}
            </div>
            ):(
                <h1>Loading Pokemon</h1>
            )}
            </React.Fragment>
        )
    }
}
