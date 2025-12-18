import "./PokemonItem.css";

import { colours } from "../../data/colours";

function PokemonItem({ pokemon }) {
  return (
    <div
      className="pokemon-card"
      style={{
        backgroundColor: `${pokemon.color}`,
      }}
    >
      <img src={pokemon.imageUrl} alt={pokemon.name} width={250} />
      <h1>{pokemon.name}</h1>

      {/* taro badge di sini */}

      <p className="description">{pokemon.description}</p>
    </div>
  );
}

export default PokemonItem;