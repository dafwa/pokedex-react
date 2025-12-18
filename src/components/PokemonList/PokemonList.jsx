import pokemonJSON from "../../data/pokemon.json";

import { useState } from "react";

import "./PokemonList.css";

import PokemonItem from "../PokemonItem/PokemonItem";

function PokemonList() {
    const [pokemons] = useState(pokemonJSON);

    return (
        <div>
            <input
                type="text"
                placeholder="cari pokemon..."
                className="search"
                onChange={handleSearch}
            />
            <div className="list-pokemon">
                {pokemons.map((item) => (
                    <PokemonItem key={item.id} pokemon={item} />
                ))}
            </div>
        </div>
    );
}

export default PokemonList;
