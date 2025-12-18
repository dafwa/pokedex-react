import { useState, useEffect } from "react";
import "./PokemonList.css";
import PokemonItem from "../PokemonItem/PokemonItem";

function PokemonList() {
    const [allPokemonList, setAllPokemonList] = useState([]);
    const [displayedPokemons, setDisplayedPokemons] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(true);
    const [loadingDetails, setLoadingDetails] = useState(false);
    const [error, setError] = useState(null);

    // 1. Initial Load
    useEffect(() => {
        const fetchMasterList = async () => {
            try {
                setLoading(true);
                // limit=649 (Gen V endpoint)
                const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=649");
                const data = await response.json();
                setAllPokemonList(data.results);
                setError(null);
            } catch (err) {
                setError("Failed to fetch Pokémon list");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchMasterList();
    }, []);

    // 2. Watch Search & Master List
    useEffect(() => {
        if (allPokemonList.length === 0) return;

        const fetchVisibleDetails = async () => {
            setLoadingDetails(true);
            
            // Filter master list
            const filtered = allPokemonList.filter((item) =>
                item.name.toLowerCase().includes(searchTerm.toLowerCase())
            );

            // Slice top 8
            const slice = filtered.slice(0, 8);

            try {
                const detailedData = await Promise.all(
                    slice.map(async (pokemon) => {
                        // A. Fetch Basic Pokemon Data
                        const res = await fetch(pokemon.url);
                        const details = await res.json();

                        // B. Fetch Species Data (For Description & Color)
                        // We do this here safely because we are only doing it for 8 items.
                        const speciesRes = await fetch(details.species.url);
                        const speciesDetails = await speciesRes.json();

                        return transformPokemonData(details, speciesDetails);
                    })
                );
                setDisplayedPokemons(detailedData);
            } catch (err) {
                console.error("Error fetching details", err);
            } finally {
                setLoadingDetails(false);
            }
        };

        fetchVisibleDetails();

    }, [searchTerm, allPokemonList]); 

    // Helper: Merges Pokemon Data + Species Data
    const transformPokemonData = (details, speciesDetails) => {
        // Find English flavor text
        const englishEntry = speciesDetails.flavor_text_entries.find(
            (entry) => entry.language.name === "en"
        );

        return {
            id: details.id,
            name: details.name.charAt(0).toUpperCase() + details.name.slice(1),
            types: details.types.map((t) => t.type.name.charAt(0).toUpperCase() + t.type.name.slice(1)),
            imageUrl: details.sprites?.other?.["official-artwork"]?.front_default || "",
            // Clean up the description text (remove \n and \f special characters)
            description: englishEntry 
                ? englishEntry.flavor_text.replace(/[\n\f]/g, " ") 
                : "No description available.",
            // Use the API color if available, or fallback to gray
            color: speciesDetails.color?.name || "gray", 
        };
    };

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    return (
        <div>
            <input
                type="text"
                placeholder="Find Pokemon..."
                className="search"
                onChange={handleSearch}
                value={searchTerm}
                disabled={loading}
            />
            
            {!loading && !loadingDetails && displayedPokemons.length > 0 && (
                <p style={{ textAlign: "center", color: "#888", marginTop: "-10px", marginBottom: "20px" }}>
                    Showing top 8 results
                </p>
            )}

            <div className="list-pokemon">
                {loading && <div>Initializing Pokedex...</div>}
                
                {!loading && loadingDetails && <div>Loading Details...</div>}
                
                {error && <div style={{ color: "red" }}>{error}</div>}
                
                {!loading && !loadingDetails && displayedPokemons.length === 0 && (
                     <div>Data tidak ditemukan</div>
                )}

                {!loading && !loadingDetails && displayedPokemons.map((item) => (
                    <PokemonItem key={item.id} pokemon={item} />
                ))}
            </div>
        </div>
    );
}

export default PokemonList;