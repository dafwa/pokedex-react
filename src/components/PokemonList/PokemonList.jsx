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
        limit,      
        loadMore,   
        hasMore     
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
                <p className="limit-text">
                    Showing {displayedPokemons.length} results
                </p>
            )}

            <div className="list-pokemon">
                {/* Loading State */}
                {loading && <div className="loading-text">Initializing Pokedex...</div>}
                
                {/* Error State */}
                {error && <div className="error-text">{error}</div>}
                
                {/* Empty State */}
                {!loading && !loadingDetails && displayedPokemons.length === 0 && (
                     <div className="empty-text">Data tidak ditemukan</div>
                )}

                {/* List of Pokemon */}
                {!loading && displayedPokemons.map((item) => (
                    <PokemonItem key={item.id} pokemon={item} />
                ))}
            </div>

            {/* Load More Button */}
            {!loading && !loadingDetails && hasMore && displayedPokemons.length > 0 && (
                <div className="load-more-container">
                    <button className="load-more-btn" onClick={loadMore}>
                        Load More (+8)
                    </button>
                </div>
            )}
            
            {/* Loading Indicator for "Load More" action */}
            {loadingDetails && displayedPokemons.length > 0 && (
                 <div className="loading-text">Loading more...</div>
            )}
        </div>
    );
}

export default PokemonList;