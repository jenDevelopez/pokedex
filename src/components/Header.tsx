
import { usePokedexStore } from '../store/pokedexStore';
import styles from './Header.module.css'

interface HeaderProps {
  placeholder?: string
  hasChildren:boolean
  children?: JSX.Element | JSX.Element[]
  hasInput: boolean
}
function Header({placeholder, children, hasChildren, hasInput}: HeaderProps) {
  const query = usePokedexStore(state => state.query)
  const setQuery = usePokedexStore(state => state.setQuery)
  return (
    <header className={styles.header}>
      {hasInput && (
        <input
          className={styles.input}
          placeholder={placeholder}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      )}
      <>{hasChildren ? children : null}</>
    </header>
  );
}

export default Header