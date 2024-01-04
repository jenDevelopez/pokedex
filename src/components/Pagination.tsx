import { usePokedexStore } from '../store/pokedexStore'
import styles from './Pagination.module.css'
import leftArrow from '../assets/leftArrow.svg'
import finishLeftArrow from '../assets/finishLeftArrow.svg'
import rightArrow from '../assets/rightArrow.svg'
import finishRightArrow from '../assets/finishRightArrow.svg'
function Pagination() {
  const { toNextPage,toPreviewPage, page,init } = usePokedexStore()
  return (
    <div className={styles.pagination}>
      <button onClick={() => toPreviewPage()} className={styles.button}>
        {page <= 1 ? (

          <img src={finishLeftArrow} alt="" />
        ): (
          <img src={leftArrow} alt="" />
        )}
      </button>
      <p className={styles.page}>{page}</p>
      <button onClick={() => toNextPage()} className={styles.button}>
        {init === 2110 ? (
          <img src={finishRightArrow} alt="" />
        ):(
          <img src={rightArrow} alt="" />
        )}
      </button>
    </div>
  )
}

export default Pagination