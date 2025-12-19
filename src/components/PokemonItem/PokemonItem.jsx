import { colours } from "../../data/colours";

// Helper function outside component
const getTypeColor = (type) => {
    const key = type.toLowerCase();
    return colours[key] || "#777";
};

function PokemonItem({ pokemon }) {
    const fallbackImage = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`;
    const primaryColor = getTypeColor(pokemon.types[0]);

    return (
        <div
            // Tailwind Classes:
            // relative, overflow-hidden: needed for the description slide-up
            // group: allows children to react to hover
            // w-full, rounded, border-2: basic styling
            className="pokemon-card group relative overflow-hidden w-full bg-white rounded-[10px] text-center p-5 border-2 border-black"
            style={{
                // We keep inline styles for dynamic colors that Tailwind can't predict
                borderColor: primaryColor,
                boxShadow: `5px 5px ${primaryColor}`
            }}
        >
            <img
                src={pokemon.imageUrl || fallbackImage}
                alt={pokemon.name}
                // width/height attributes are good for CLS, Tailwind handles visual size
                width={250}
                height={250}
                className="w-full max-w-50 h-auto object-contain mx-auto"
                loading="lazy"
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
                        className="px-3 py-1 rounded-md border-2 border-black text-white text-sm font-bold shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]"
                        style={{
                            backgroundColor: getTypeColor(type),
                        }}
                    >
                        {type}
                    </span>
                ))}
            </div>

            {/* Description Slide-up */}
            {/* translate-y-full pushes it down, group-hover brings it up */}
            <p className="text-left p-5 text-lg absolute bottom-0 left-0 w-full bg-white transition-transform duration-300 translate-y-full border-t-2 border-black group-hover:translate-y-0">
                {pokemon.description || "No description available."}
            </p>
        </div>
    );
}

export default PokemonItem;