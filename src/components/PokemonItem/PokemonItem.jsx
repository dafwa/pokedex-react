import "./PokemonItem.css";

import { colours } from "../../data/colours";

function PokemonItem({ pokemon }) {
    const fallbackImage = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`;
    const imageSrc = fallbackImage; // primary host is flaky; use stable fallback by default

    return (
        <div
            className="pokemon-card"
            style={{
                backgroundColor: `${pokemon.color}`,
            }}
        >
            <img
                src={imageSrc}
                alt={pokemon.name}
                width={250}
                onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = fallbackImage;
                }}
            />
            <h1>{pokemon.name}</h1>

            <div className="types-container">
                {pokemon.types.map((item, index) => (
                    <span
                        key={index}
                        className="type-badge"
                        style={{
                            backgroundColor: colours[item.toLowerCase()],
                        }}
                    >
                        {item}
                    </span>
                ))}
            </div>

            <p className="description">{pokemon.description}</p>
        </div>
    );
}

export default PokemonItem;
