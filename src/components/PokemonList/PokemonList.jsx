import pokemonJSON from "../../data/pokemon.json";

import { useState } from "react";

import "./PokemonList.css";

import PokemonItem from "../PokemonItem/PokemonItem";

function PokemonList() {

    const [pokemons] = useState(pokemonJSON);
    const [filterPokemons, setFilterPokemons] = useState(pokemonJSON);

    const handleSearch = (e) => {
        const keyword = e.target.value.toLowerCase();

        const search = pokemons.filter((item) =>
            item.name.toLowerCase().includes(keyword)
        );

        setFilterPokemons(search);
    };


    return (
        <div>
            <input
                type="text"
                placeholder="cari pokemon..."
                className="search"
                onChange={handleSearch}
            />
            <div className="list-pokemon">
                {filterPokemons.length == 0 ? (
                    <div>data tidak ditemukan</div>
                ) : (
                    filterPokemons.map((item) => <PokemonItem key={item.id} pokemon={item} />)
                )}
            </div>
        </div>
    );
}

export default PokemonList;
