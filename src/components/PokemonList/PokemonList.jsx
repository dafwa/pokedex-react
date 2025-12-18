import pokemonJSON from "../../data/pokemon.json";

import { useState } from "react"

import "./PokemonList.css";

function PokemonList() {
  const [pokemons] = useState(pokemonJSON);

  return (
    <div>
      <div className="list-pokemon">
        {pokemons.map((item) => (
          <h1>{item.name}</h1>
        ))}
      </div>
    </div>
  );
}

export default PokemonList;