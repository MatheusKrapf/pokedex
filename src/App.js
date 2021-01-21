import React, { useEffect, useState } from 'react'; 
import { getAllPokemon, getPokemon } from './components/pokemon';
import Loading from './components/loading';
import Card from './components/Card/card';
import './App.scss';

function App() {
  const [pokemonData, setPokemonData] = useState([]);
  const [nextUrl, setNextUrl] = useState('');
  const [prevUrl, setPrevUrl] = useState('');
  const [loading, setLoading] = useState(true);
  const initialUrl = 'https://pokeapi.co/api/v2/pokemon';

  useEffect (() => {
    async function fetchData() {
      let response = await getAllPokemon(initialUrl);
      setNextUrl(response.next);
      setPrevUrl(response.previous);
      let pokemon = await loadingPokemon(response.results);
      setLoading(false);
    }
    fetchData();
  }, []);

  const next = async () => {
    setLoading(true);
    let data = await getAllPokemon(nextUrl)
    await loadingPokemon(data.results);
    setNextUrl(data.next);
    setPrevUrl(data.previous);
    setLoading(false);
  }

  const prev = async () => {
    if (!prevUrl) return;
    setLoading(true);
    let data = await getAllPokemon(prevUrl)
    await loadingPokemon(data.results);
    setNextUrl(data.next);
    setPrevUrl(data.previous);
    setLoading(false);
  }

  const loadingPokemon = async data => {
    let _pokemonData = await Promise.all(
      data.map(async pokemon => {
        let pokemonRecord = await getPokemon(pokemon.url);
        return pokemonRecord
      })
    );

    setPokemonData(_pokemonData);
  }

  return (
    <div className="App">
        { 
          loading ? (
            
            <Loading />
          
          ) : (
            <>
              <div className="grid-container">
                {pokemonData.map((pokemon, i) => {
                  return <Card key={i} pokemon={pokemon} />
                })}
              </div>

              <div className="buttons">
                <div className="wrap-btn">
                  <button className="btn" onClick={prev}>Prev</button>
                </div>
                
                <div className="wrap-btn">
                  <button className="btn" onClick={next}>Next</button>
                </div>
              </div>
            </>
          )
        }
    </div>
  );
}

export default App;
