import "./PokemonItem.css";
import { colours } from "../../data/colours";

// It relies only on static data ('colours'), so it doesn't need to be inside the render loop.
const getTypeColor = (type) => {
    const key = type.toLowerCase();
    return colours[key] || "#777"; // Default gray
};

function PokemonItem({ pokemon }) {
    // Generate fallback URL
    const fallbackImage = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`;
    
    // We calculate the primary color once here for cleaner JSX below
    const primaryColor = getTypeColor(pokemon.types[0]);

    return (
        <div
            className="pokemon-card"
            style={{
                borderColor: primaryColor,
                boxShadow: `5px 5px ${primaryColor}`
            }}
        >
            <img
                src={pokemon.imageUrl || fallbackImage}
                alt={pokemon.name}
                width={250}
                height={250}
                loading="lazy"
                onError={(e) => {
                    e.currentTarget.onerror = null;
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
                            // We use the helper directly here for specific type colors
                            backgroundColor: getTypeColor(type),
                        }}
                    >
                        {type}
                    </span>
                ))}
            </div>

            <p className="description">
                {pokemon.description || "No description available."}
            </p>
        </div>
    );
}

export default PokemonItem;