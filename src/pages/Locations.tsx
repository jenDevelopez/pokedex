
import Footer from '../components/Footer';
import { usePokedexStore } from '../store/pokedexStore';
import { useEffect } from 'react';
import { Location } from '../types/interfaces';
import { Link } from 'react-router-dom';
import style from './Locations.module.css'
import Header from '../components/Header';
function Locations() {
  const { fetchLocations, regions } = usePokedexStore()

  useEffect(() => {
    fetchLocations()
  },[])
  return (
    <>
     <Header hasChildren={true} hasInput={false}>
        <h1 className={style.title}>REGIONS</h1>
     </Header>
      <main>
        <nav className={style.nav}>
          <ul className={style.listLocations}>
             {regions.map((location: Location) => (
              <Link 
                key={location.name} 
                className={style.listItem}
                to={`/locations/${location.name.toLowerCase()}`}
                >
                  <span className={style.listItemIcon}></span>
                  <div className={style.listItemText}>
                    <span>{location.name}</span>
                    <span></span>
                  </div>
                
              </Link>
              
              
            ))} 
          
          </ul>
        </nav>
        {/* <Pagination /> */}
      </main> 
      <Footer />
    </>
  )
}

export default Locations