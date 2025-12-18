import "./PokemonList.css";
import PokemonItem from "../PokemonItem/PokemonItem";
import { usePokemonList } from "../../hooks/usePokemonList";

function PokemonList() {
    const { 
        displayedPokemons, 
        searchTerm, 
        handleSearch, 
        loading, 
        loadingDetails, 
        error,
        limit,      // Get current limit
        loadMore,   // Get function
        hasMore     // Get boolean
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
            
            {/* Dynamic limit indicator */}
            {!loading && !loadingDetails && displayedPokemons.length > 0 && (
                <p style={{ textAlign: "center", color: "#888", marginTop: "-10px", marginBottom: "20px" }}>
                    Showing {displayedPokemons.length} results
                </p>
            )}

            <div className="list-pokemon">
                {loading && <div>Initializing Pokedex...</div>}
                
                {/* Error State */}
                {error && <div style={{ color: "red" }}>{error}</div>}
                
                {/* Empty State */}
                {!loading && !loadingDetails && displayedPokemons.length === 0 && (
                     <div>Data cannot be found</div>
                )}

                {/* List of Pokemon */}
                {!loading && displayedPokemons.map((item) => (
                    <PokemonItem key={item.id} pokemon={item} />
                ))}
            </div>

            {/* Load More Button */}
            {/* Only show if not loading, and if there is more data to show */}
            {!loading && !loadingDetails && hasMore && displayedPokemons.length > 0 && (
                <div style={{ display: "flex", justifyContent: "center", marginBottom: "50px" }}>
                    <button 
                        onClick={loadMore}
                        style={{
                            padding: "12px 24px",
                            fontSize: "1rem",
                            fontWeight: "bold",
                            backgroundColor: "white",
                            border: "2px solid black",
                            borderRadius: "5px",
                            boxShadow: "3px 3px black",
                            cursor: "pointer",
                            transition: "transform 0.1s"
                        }}
                        onMouseDown={(e) => e.target.style.transform = "translate(2px, 2px)"}
                        onMouseUp={(e) => e.target.style.transform = "translate(0, 0)"}
                    >
                        Load More (+8)
                    </button>
                </div>
            )}
            
            {/* Loading Indicator for "Load More" action */}
            {loadingDetails && displayedPokemons.length > 0 && (
                 <div style={{ textAlign: "center", marginBottom: "50px" }}>Loading more...</div>
            )}
        </div>
    );
}

export default PokemonList;