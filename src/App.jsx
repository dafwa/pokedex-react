import PokemonList from "./components/PokemonList/PokemonList";

function App() {
  return (
    <>
      <PokemonList />
      <footer>
        <p style={{ textAlign: "center", color: "#888", margin: "5rem 0 5rem" }}>
          Made with ❤️ by Daffa Fakhir using React + Vite.
        </p>
      </footer>
    </>
  );
}

export default App;