import { useState, useEffect } from "react";

import "./PokemonList.css";

import PokemonItem from "../PokemonItem/PokemonItem";

function PokemonList() {
    const [pokemons, setPokemons] = useState([]);
    const [filterPokemons, setFilterPokemons] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPokemons = async () => {
            try {
                setLoading(true);
                // Fetch all Pokémon for search
                const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=10000");
                const data = await response.json();

                // Fetch detailed info for each Pokémon
                const pokemonDetails = await Promise.all(
                    data.results.map(async (pokemon) => {
                        const res = await fetch(pokemon.url);
                        const details = await res.json();

                        return {
                            id: details.id,
                            name: details.name.charAt(0).toUpperCase() + details.name.slice(1),
                            genus: details.species?.name || "Unknown",
                            description: details.species?.flavor_text_entries?.[0]?.flavor_text || "No description",
                            imageUrl: details.sprites?.other?.["official-artwork"]?.front_default || "",
                            types: details.types.map((t) => t.type.name.charAt(0).toUpperCase() + t.type.name.slice(1)),
                            abilities: details.abilities.map((a) => ({
                                name: a.ability.name.charAt(0).toUpperCase() + a.ability.name.slice(1),
                                effect: a.ability.effect_entries?.[0]?.effect || "Unknown effect",
                                description: a.ability.effect_entries?.[0]?.short_effect || "Unknown",
                            })),
                            stats: {
                                HP: details.stats[0]?.base_stat || 0,
                                Attack: details.stats[1]?.base_stat || 0,
                                Defense: details.stats[2]?.base_stat || 0,
                                "Special Attack": details.stats[3]?.base_stat || 0,
                                "Special Defense": details.stats[4]?.base_stat || 0,
                                Speed: details.stats[5]?.base_stat || 0,
                            },
                            locations: [],
                            color: details.color?.name || "#cccccc",
                        };
                    })
                );

                setPokemons(pokemonDetails);
                setFilterPokemons(pokemonDetails.slice(0, 8)); // Display only first 10 initially
                setError(null);
            } catch (err) {
                setError("Failed to fetch Pokémon data");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchPokemons();
    }, []);

    const handleSearch = (e) => {
        const keyword = e.target.value.toLowerCase();

        const search = pokemons.filter((item) =>
            item.name.toLowerCase().includes(keyword)
        );

        setFilterPokemons(search.slice(0, 8)); // Limit search results to 8
    };


    return (
        <div>
            <input
                type="text"
                placeholder="cari pokemon..."
                className="search"
                onChange={handleSearch}
                disabled={loading}
            />
            <div className="list-pokemon">
                {loading && <div>Loading Pokémon...</div>}
                {error && <div style={{ color: "red" }}>{error}</div>}
                {!loading && filterPokemons.length === 0 ? (
                    <div>data tidak ditemukan</div>
                ) : (
                    !loading && filterPokemons.map((item) => <PokemonItem key={item.id} pokemon={item} />)
                )}
            </div>
        </div>
    );
}

export default PokemonList;
