import {  useParams } from 'react-router-dom'
import ButtonBack from '../components/ButtonBack'
import Footer from '../components/Footer'
import { usePokedexStore } from '../store/pokedexStore'
import { useEffect } from 'react'
import styles from './Item.module.css'

function Item() {
  const {name} = useParams()
  const { fetchDataItem, dataItem } = usePokedexStore()

  useEffect(() => {
    fetchDataItem(name as string)

  },[])
  return (
    <>
      <ButtonBack />
      <div className={styles.container}>

        <div className={styles.item}>
          <main className={styles.itemInfo}>
            <h1 className={styles.itemTitle}>{name?.toUpperCase()}</h1>
            <div>Nr. {dataItem?.id}</div>
            <div>
              <img className={styles.itemInfoImg} src={dataItem?.imgSrc} alt={dataItem?.name} />
            </div>
            <p>{dataItem.cost}$</p>
            <div className={styles.attributes}>
              <h2 className={styles.attributesTitle}>ATRIBUTES</h2>
              <ul className={styles.attributes}>
                {dataItem.attributes.map((item:any) => (
                  <li key={item.name}>{item.name}</li>
                ))}
              </ul>
            </div>
            <div>{dataItem.category.name}</div>
          
          </main>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Item