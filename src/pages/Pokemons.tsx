import Footer from "../components/Footer";
import Header from "../components/Header";
import { useEffect } from "react";
import { Link } from 'react-router-dom'
import styles from './pokemons.module.css'

import LoadingScreen from "../components/LoadingScreen";
import { waitFor } from "../utils/utils";
import { usePokedexStore } from "../store/pokedexStore";
import { DataPokemon } from "../types/interfaces";
function Pokemons() {
  
  const {pokemons, query, isLoading} = usePokedexStore()
  
  const {fetchPokemons, setIsLoading} = usePokedexStore()
  useEffect(() => {
    const fetchAllPokemons = async () => {
      setIsLoading(true)
      await waitFor(1000)
      await fetchPokemons()
      setIsLoading(false)
    }
    fetchAllPokemons()
   
    
  },[])

  if(isLoading || !pokemons) {
    return <LoadingScreen />
  }

  const filteredPokemons = pokemons?.slice(0,151).filter((pokemon: any) => {
    return pokemon.name.toLowerCase().match(query.toLowerCase())
  })

  return (
    <>
      <Header placeholder="Search a pokemon" hasChildren={false} hasInput={true}/>
      <main>
        <nav>
          <ul>
            {filteredPokemons?.slice(0, 151).map((pokemon: DataPokemon) => (
              <Link key={pokemon.id} className={styles.listItem} to={`/pokemons/${pokemon.name.toLowerCase()}`}>
                <img className={styles.listItemIcon} src={pokemon.imgSrc} alt={pokemon.name} />
                <div className={styles.listItemText}>
                  <span>{pokemon.name}</span>
                  <span>{pokemon.id}</span>
                </div>
              </Link>
            
            ))}
          </ul>
        </nav>
      </main>
      <Footer />
    </>
  );
}

export default Pokemons;
