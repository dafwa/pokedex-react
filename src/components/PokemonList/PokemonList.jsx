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
        loadMore,   
        hasMore     
    } = usePokemonList();

    return (
        <div>
            <input
                type="text"
                placeholder="Find Pokemon..."
                className="block w-[min(720px,90vw)] p-4 mx-auto mt-12 mb-8 text-base shadow-[3px_5px_0px_0px_rgba(0,0,0,1)] rounded-md border-2 border-black"
                onChange={handleSearch}
                value={searchTerm}
                disabled={loading}
            />
            
            {/* Limit Indicator */}
            {!loading && !loadingDetails && displayedPokemons.length > 0 && (
                <p className="text-center text-gray-500 -mt-2 mb-5 text-sm">
                    Showing {displayedPokemons.length} results
                </p>
            )}

            {/* Grid Container */}
            {/* Mobile: grid-cols-2 | Desktop (md): Auto-fit columns min 250px */}
            <div className="grid grid-cols-2 md:grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-4 md:gap-8 mx-auto mb-32 px-4 md:px-6 max-w-7xl">
                
                {/* Loading State */}
                {loading && <div className="col-span-full text-center font-bold text-gray-600">Initializing Pokedex...</div>}
                
                {/* Error State */}
                {error && <div className="col-span-full text-center font-bold text-red-500">{error}</div>}
                
                {/* Empty State */}
                {!loading && !loadingDetails && displayedPokemons.length === 0 && (
                     <div className="col-span-full text-center text-xl text-gray-600">Data tidak ditemukan</div>
                )}

                {/* List of Pokemon */}
                {!loading && displayedPokemons.map((item) => (
                    <PokemonItem key={item.id} pokemon={item} />
                ))}
            </div>

            {/* Load More Button */}
            {!loading && !loadingDetails && hasMore && displayedPokemons.length > 0 && (
                <div className="flex justify-center mb-12">
                    <button 
                        className="px-6 py-3 text-base font-bold bg-white border-2 border-black rounded-md shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] cursor-pointer transition-transform active:translate-x-0.5 active:translate-y-0.5 active:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]"
                        onClick={loadMore}
                    >
                        Load More (+8)
                    </button>
                </div>
            )}
            
            {/* Loading Indicator for "Load More" action */}
            {loadingDetails && displayedPokemons.length > 0 && (
                 <div className="text-center mb-12 font-bold text-gray-600">Loading more...</div>
            )}
        </div>
    );
}

export default PokemonList;