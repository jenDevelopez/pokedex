import { useEffect } from 'react'
import {  useParams } from 'react-router-dom'
import Footer from '../components/Footer'
import styles from './pokemon.module.css'

import LoadingScreen from '../components/LoadingScreen'
import { waitFor } from '../utils/utils'
import ButtonBack from '../components/ButtonBack'
import { usePokedexStore } from '../store/pokedexStore'
function Pokemon() {
  
  const {name} = useParams()
  const pokemon = usePokedexStore(state => state.dataPokemon)
  const { isLoading, setIsLoading, fetchDataPokemon} = usePokedexStore()

  useEffect(() => {
    async function getPokemon() {
      setIsLoading(true)
      await waitFor(500)
      await fetchDataPokemon(name as string)
      setIsLoading(false)
    }

    getPokemon()
  },[name])

  if(isLoading || !pokemon) {
    return <LoadingScreen />
  }
  return (
    <>
      <ButtonBack />
      <div className={styles.pokemon}>
        <main className={styles.pokemonInfo}>
          <div className={styles.pokemonTitle}>{name?.toUpperCase()}</div>
          <div>Nr. {pokemon?.id}</div>
          <div>
            <img className={styles.pokemonInfoImg} src={pokemon?.imgSrc} alt={pokemon?.name} />
          </div>
          <div>HP: {pokemon?.hp}</div>
          <div>Attack: {pokemon?.attack}</div>
          <div>Defense: {pokemon?.defense}</div>
        </main>
      </div>
      <Footer />
    </>
  )
}

export default Pokemon