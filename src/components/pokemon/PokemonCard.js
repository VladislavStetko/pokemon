import React, { Component } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import spinner from "../layout/spinner.gif";
import backgroundImage from "./pattern2.jpg";
import axios from "axios";

const TYPE_COLORS = {
  bug: "B1C12E",
  dark: "4F3A2D",
  dragon: "755EDF",
  electric: "FCBC17",
  fairy: "F4B1F4",
  fighting: "823551D",
  fire: "E73B0C",
  flying: "A3B3F7",
  ghost: "6060B2",
  grass: "74C236",
  ground: "D3B357",
  ice: "A3E7FD",
  normal: "C8C4BC",
  poison: "934594",
  psychic: "ED4882",
  rock: "B9A156",
  steel: "B5B5C3",
  water: "3295F6",
};

//За допомогою styled змінюємо css код прямо в js
const Sprite = styled.img`
  width: 5em;
  height: 5em;
  display: none;
`;

const Card = styled.div`
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  &:hover {
    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  }
  -moz-user-select: none;
  -website-user-select: none;
  user-select: none;
  -o-user-select: none;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: black;
  &:focus,
  &:hover,
  &:visited,
  &:link,
  &:active {
    text-decoration: none;
  }
  &:hover {
    color: #17a2b8;
  }
`;

export default class PokemonCard extends Component {
  state = {
    name: "",
    imageUrl: "",
    pokemonIndex: "",
    types: [],
    errorcheck: false,
  };

  async componentDidMount() {
    //Отримання даних
    const { name, url } = this.props;
    const pokemonIndex = url.split("/")[url.split("/").length - 2];
    const pokemonRes = await axios.get(url);
    const imageUrl = pokemonRes.data.sprites.front_default;
    const types = pokemonRes.data.types.map((type) => type.type.name);
    //Внесення даних
    this.setState({
      name,
      imageUrl,
      pokemonIndex,
      types,
      imageLoading :true,
      toManyRequests:false
    });
  }

  render() {
    return (
      <div className="col-md-3 col-sm-6 mb-5">
        <StyledLink to={`pokemon/${this.state.pokemonIndex}`}>
          <Card className="card">
          {this.state.imageLoading ? (
              <img
                src={spinner}
                style={{ width: "5em", height: "5em" }}
                className="card-img-top rounded mx-auto d-block mt-2"
              />
            ) : null}
             <Sprite 
                       className="card-img-top ronded mx-auto mt-2"
                       src={this.state.imageUrl}
                       onLoad={()=>this.setState({imageLoading: false})}
                       onError={()=> this.setState({toManyRequests:true})}
                       style={this.state.toManyRequests?{display:"none"}:
                       this.state.imageLoading?null:{display:"block"}}
                       />
            <div className="card-header">
              <span className="badge badge-ibfo mr-2">
                {this.state.pokemonIndex}
              </span>
              <span className="h6">
                {this.state.name
                  .toLowerCase()
                  .split(" ")
                  .map(
                    (letter) =>
                      letter.charAt(0).toUpperCase() + letter.substring(1)
                  )
                  .join(" ")}
              </span>
            </div>

            <div>
                  <span>
                    {this.state.types.map((type) => (
                      <span
                        key={type}
                        className="badge badge-primary badge-pill mr-1"
                        style={{
                          backgroundColor: `#${TYPE_COLORS[type]}`,
                          color: "white",
                        }}
                      >
                        {type
                          .toLowerCase()
                          .split(" ")
                          .map(
                            (s) => s.charAt(0).toUpperCase() + s.substring(1)
                          )
                          .join(" ")}
                      </span>
                    ))}
                  </span>
            </div>
          </Card>
        </StyledLink>
      </div>
    );
  }
}
