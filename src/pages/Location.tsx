import { useParams } from "react-router";
import ButtonBack from "../components/ButtonBack";
import styles from "./Location.module.css";
import Footer from "../components/Footer";
import { useEffect } from "react";
import { usePokedexStore } from "../store/pokedexStore";
import Header from "../components/Header";
import { Location } from "../types/interfaces";

function Location() {
  const { name } = useParams();
  const { fetchDataLocation, locations} = usePokedexStore();
  useEffect(() => {
    fetchDataLocation(name as string);
  }, []);

  return (
    <>
      <Header hasChildren={true} hasInput={false}>
        <h1 className={styles.title}>{`${name?.toUpperCase()}'S`} LOCATIONS</h1>
      </Header>
        <ButtonBack />
      <main className={styles.container}>
        <ul style={{marginTop: `1rem`, marginBottom: '1.5rem'}}>
          {locations.map((location: Location) => (
            <li className={styles.listItem} key={location.name}>
              <span className={styles.imgSrc}></span>
              <div className={styles.listItemText}>
                <span>{location.name}</span>
                <span></span>
              </div>
            </li>
          ))}
        </ul>
      </main>

      <Footer />
    </>
  );
}

export default Location;
