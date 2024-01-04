import styles from './ButtonBack.module.css'
import PokeballImg from '../assets/pokeball.png'
import { useNavigate } from 'react-router'

function ButtonBack() {
  const navigate = useNavigate()
  return (
    <button className={styles.pokeballButton} onClick={() => navigate(-1)}>
        <img className={styles.pokeballImg} src={PokeballImg} alt="Pokeball" />Go Back
      </button>
  )
}

export default ButtonBack