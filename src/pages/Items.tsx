import { useEffect } from "react";
import Footer from "../components/Footer";
import LoadingScreen from "../components/LoadingScreen";
import { Link } from "react-router-dom";
import styles from "./pokemons.module.css";
import Pagination from "../components/Pagination";
import { usePokedexStore } from "../store/pokedexStore";
import { Item } from "../types/interfaces";
import Header from "../components/Header";

function Items() {
  const {items, isLoading, page,query} = usePokedexStore()
  
  const {fetchItems, setIsLoading} = usePokedexStore()
  useEffect(() => {
    async function getItems() {
      setIsLoading(true);
      await fetchItems();
      setIsLoading(false);
      
    }
    getItems();
  }, [page]);

  if (isLoading || !items) return <LoadingScreen />;

  const filteredItems = items?.filter((item:any) => {
    return item.name.toLowerCase().match(query.toLowerCase())
  })

  return (
    <>
      <Header placeholder="Search an item" hasChildren={true} hasInput={true}>
        <Pagination />
      </Header>

       <main>
        <nav>
          <ul style={{marginBottom: '1.5rem'}}>
            {filteredItems.map((item: Item) => (
              <Link
                key={item.name}
                className={styles.listItem}
                to={`/items/${item.name.toLowerCase()}`}
              >
                <img
                  className={styles.listItemIcon}
                  src={item.imgSrc}
                  alt={item.name}
                />
                <div className={styles.listItemText}>
                  <span>{item.name}</span>
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

export default Items;
