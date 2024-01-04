import { Link } from 'react-router-dom'
import styles from './Footer.module.css'

import PokemonPic from '../assets/pikachu.png'
import Items from '../assets/pokeball.png'
import LocationPic from '../assets/pointer.png'
function Footer() {
  return (
    <footer className={styles.footer}>
      <Link className={styles.footerLink} to='/pokemons'>
        <img className={styles.footerIcon} src={Items} alt="Pokeball" />
        Pokemons
      </Link>
      <Link className={styles.footerLink} to='/items'>
        <img className={styles.footerIcon} src={PokemonPic} alt="Items" />
        Items
      </Link>
      <Link className={styles.footerLink} to='/locations'>
        <img className={styles.footerIcon} src={LocationPic} alt="Map" />
        Map
      </Link>
    </footer>
  )
}

export default Footer