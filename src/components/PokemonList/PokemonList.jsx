import "./PokemonList.css";
import PokemonItem from "../PokemonItem/PokemonItem";

// Import the custom hook
import { usePokemonList } from "../../hooks/usePokemonList";

function PokemonList() {
    // Call the hook to get data and functions
    const { 
        displayedPokemons, 
        searchTerm, 
        handleSearch, 
        loading, 
        loadingDetails, 
        error 
    } = usePokemonList();

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
            
            {/* Limit Indicator */}
            {!loading && !loadingDetails && displayedPokemons.length > 0 && (
                <p style={{ textAlign: "center", color: "#888", marginTop: "-10px", marginBottom: "20px" }}>
                    Showing top 8 results
                </p>
            )}

            <div className="list-pokemon">
                {/* 1. Initial Loading State */}
                {loading && <div>Initializing Pokedex...</div>}
                
                {/* 2. Searching/Details Loading State */}
                {!loading && loadingDetails && <div>Loading Details...</div>}
                
                {/* 3. Error State */}
                {error && <div style={{ color: "red" }}>{error}</div>}
                
                {/* 4. Empty State */}
                {!loading && !loadingDetails && displayedPokemons.length === 0 && (
                     <div>Data tidak ditemukan</div>
                )}

                {/* 5. Success State */}
                {!loading && !loadingDetails && displayedPokemons.map((item) => (
                    <PokemonItem key={item.id} pokemon={item} />
                ))}
            </div>
        </div>
    );
}

export default PokemonList;