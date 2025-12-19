import PokemonItem from "../PokemonItem/PokemonItem";
import { usePokemonList } from "../../hooks/usePokemonList";

function PokemonList() {
    const { 
        displayedPokemons, searchTerm, handleSearch, 
        loading, loadingDetails, error, 
        loadMore, hasMore     
    } = usePokemonList();

    return (
        <div>
            <input
                type="text"
                placeholder="Find Pokemon..."
                // Updated: bg-zinc-800, text-white, border-zinc-500
                // Shadow: Changed to a subtle white glow (rgba 255,255,255, 0.2)
                className="block w-[min(720px,90vw)] p-4 mx-auto mt-12 mb-8 text-base rounded-md border-2 bg-zinc-800 text-white border-zinc-500 placeholder-zinc-400 shadow-[3px_5px_0px_0px_rgba(255,255,255,0.2)]"
                onChange={handleSearch}
                value={searchTerm}
                disabled={loading}
            />
            
            {/* Limit Indicator - Lighter gray text */}
            {!loading && !loadingDetails && displayedPokemons.length > 0 && (
                <p className="text-center text-zinc-400 -mt-2 mb-5 text-sm">
                    Showing {displayedPokemons.length} results
                </p>
            )}

            <div className="grid grid-cols-2 md:grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-4 md:gap-8 mx-auto mb-32 px-4 md:px-6 max-w-7xl">
                
                {loading && <div className="col-span-full text-center font-bold text-zinc-400">Initializing Pokedex...</div>}
                {error && <div className="col-span-full text-center font-bold text-red-400">{error}</div>}
                
                {!loading && !loadingDetails && displayedPokemons.length === 0 && (
                     <div className="col-span-full text-center text-xl text-zinc-400">Data tidak ditemukan</div>
                )}

                {!loading && displayedPokemons.map((item) => (
                    <PokemonItem key={item.id} pokemon={item} />
                ))}
            </div>

            {/* Load More Button */}
            {!loading && !loadingDetails && hasMore && displayedPokemons.length > 0 && (
                <div className="flex justify-center mb-12">
                    <button 
                        // Updated: bg-zinc-800, text-white, border-zinc-500, white glow shadow
                        className="px-6 py-3 text-base font-bold rounded-md cursor-pointer transition-transform active:translate-x-0.5 active:translate-y-0.5 border-2 bg-zinc-800 text-white border-zinc-500 shadow-[3px_3px_0px_0px_rgba(255,255,255,0.2)] active:shadow-[1px_1px_0px_0px_rgba(255,255,255,0.2)]"
                        onClick={loadMore}
                    >
                        Load More (+8)
                    </button>
                </div>
            )}
            
            {loadingDetails && displayedPokemons.length > 0 && (
                 <div className="text-center mb-12 font-bold text-zinc-400">Loading more...</div>
            )}
        </div>
    );
}

export default PokemonList;