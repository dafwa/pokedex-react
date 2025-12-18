import { useState, useEffect } from "react";

export function usePokemonList() {
    const [allPokemonList, setAllPokemonList] = useState([]);
    const [displayedPokemons, setDisplayedPokemons] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(true);
    const [loadingDetails, setLoadingDetails] = useState(false);
    const [error, setError] = useState(null);
    
    // State to track how many items to show
    const [limit, setLimit] = useState(8);
    // State to check if there are more items to load (to hide/show button)
    const [hasMore, setHasMore] = useState(true);

    // 1. Initial Load (Gen 1 - Gen 5)
    useEffect(() => {
        const fetchMasterList = async () => {
            try {
                setLoading(true);
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

    // 2. Watch Search & Master List & Limit
    useEffect(() => {
        if (allPokemonList.length === 0) return;

        const fetchVisibleDetails = async () => {
            setLoadingDetails(true);
            
            // Filter master list
            const filtered = allPokemonList.filter((item) =>
                item.name.toLowerCase().includes(searchTerm.toLowerCase())
            );

            // Update hasMore to control button visibility
            setHasMore(filtered.length > limit);

            // Slice using the dynamic 'limit' variable instead of hardcoded 8
            const slice = filtered.slice(0, limit);

            try {
                const detailedData = await Promise.all(
                    slice.map(async (pokemon) => {
                        const res = await fetch(pokemon.url);
                        const details = await res.json();
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

        const timeoutId = setTimeout(() => {
            fetchVisibleDetails();
        }, 500);

        return () => clearTimeout(timeoutId);

    }, [searchTerm, allPokemonList, limit]); // Re-run when 'limit' changes

    const transformPokemonData = (details, speciesDetails) => {
        const englishEntry = speciesDetails.flavor_text_entries.find(
            (entry) => entry.language.name === "en"
        );
        return {
            id: details.id,
            name: details.name.charAt(0).toUpperCase() + details.name.slice(1),
            types: details.types.map((t) => t.type.name.charAt(0).toUpperCase() + t.type.name.slice(1)),
            imageUrl: details.sprites?.other?.["official-artwork"]?.front_default || "",
            description: englishEntry ? englishEntry.flavor_text.replace(/[\n\f]/g, " ") : "No description available.",
            color: speciesDetails.color?.name || "gray", 
        };
    };

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
        setLimit(8); // Reset limit to 8 when user searches new term
    };

    // Function to increment limit
    const loadMore = () => {
        setLimit((prev) => prev + 8);
    };

    return {
        displayedPokemons,
        searchTerm,
        handleSearch,
        loading,
        loadingDetails,
        error,
        limit,     
        loadMore,  
        hasMore    
    };
}