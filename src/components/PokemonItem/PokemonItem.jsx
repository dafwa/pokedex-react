import { colours } from "../../data/colours";

const getTypeColor = (type) => {
    const key = type.toLowerCase();
    return colours[key] || "#777";
};

function PokemonItem({ pokemon }) {
    const fallbackImage = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`;
    const primaryColor = getTypeColor(pokemon.types[0]);

    return (
        <div
            // UPDATED CLASSES:
            // bg-zinc-800: Dark gray background
            // border-zinc-500: Softer gray border (elegant look)
            // text-white: Readable text
            className="pokemon-card group relative overflow-hidden w-full bg-zinc-800 rounded-[10px] text-center p-5 border-2 border-zinc-500 text-white"
            style={{
                borderColor: primaryColor, // Keep the colored border feature
                boxShadow: `5px 5px ${primaryColor}` // This now looks like a NEON GLOW
            }}
        >
            <img
                src={pokemon.imageUrl || fallbackImage}
                alt={pokemon.name}
                width={250}
                height={250}
                className="w-full max-w-50 h-auto object-contain mx-auto"
                loading="lazy"
                style={{
                    // 'drop-shadow' creates the outline glow. 
                    // 0 0 15px defines the position (centered) and blur radius (glow size).
                    filter: `drop-shadow(0 0 2px ${primaryColor})`
                    // filter: "drop-shadow(0 0 2px rgba(255, 255, 255, 0.6))"
                }}
                onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = fallbackImage;
                }}
            />
            
            <h1 className="text-2xl my-2 font-bold">{pokemon.name}</h1>

            <div className="flex justify-center gap-2 mt-4 flex-wrap">
                {pokemon.types.map((type, index) => (
                    <span
                        key={index}
                        // Updated: border-zinc-500, text-white
                        // Removed dark shadow on badges for a cleaner flat look
                        className="px-3 py-1 rounded-md border-2 border-zinc-500 text-white text-sm font-bold"
                        style={{
                            backgroundColor: getTypeColor(type),
                        }}
                    >
                        {type}
                    </span>
                ))}
            </div>

            {/* Description Slide-up */}
            {/* Updated: bg-zinc-800 (matches card), border-zinc-500 */}
            <p className="text-left p-5 text-lg absolute bottom-0 left-0 w-full bg-zinc-800 transition-transform duration-300 translate-y-full border-t-2 border-zinc-500 group-hover:translate-y-0">
                {pokemon.description || "No description available."}
            </p>
        </div>
    );
}

export default PokemonItem;