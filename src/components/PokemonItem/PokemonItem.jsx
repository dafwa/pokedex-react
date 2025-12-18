import "./PokemonItem.css";
import { colours } from "../../data/colours";

function PokemonItem({ pokemon }) {
    // Determine image source
    const fallbackImage = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`;
    
    // Safety check for color if the data/colours file doesn't match the API type exactly
    const getTypeColor = (type) => {
        const key = type.toLowerCase();
        return colours[key] || "#777"; // Default gray if type color not found
    };

    return (
        <div
            className="pokemon-card"
            style={{
                borderColor: getTypeColor(pokemon.types[0]), 
                boxShadow: `5px 5px ${getTypeColor(pokemon.types[0])}`
            }}
        >
            <img
                src={pokemon.imageUrl || fallbackImage}
                alt={pokemon.name}
                width={250}
                height={250} // Good for preventing layout shift
                loading="lazy" // Native browser lazy loading
                onError={(e) => {
                    e.currentTarget.onerror = null; // Prevent infinite loop
                    e.currentTarget.src = fallbackImage;
                }}
            />
            <h1>{pokemon.name}</h1>

            <div className="types-container">
                {pokemon.types.map((type, index) => (
                    <span
                        key={index}
                        className="type-badge"
                        style={{
                            backgroundColor: getTypeColor(type),
                        }}
                    >
                        {type}
                    </span>
                ))}
            </div>

            <p className="description">{pokemon.description || "No description available."}</p>
        </div>
    );
}

export default PokemonItem;