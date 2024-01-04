import { Routes, Route } from 'react-router'
import './App.css'
import { Item, Items, Pokemon, Pokemons,Location, Locations } from './pages'

function App() {
  return (
    <Routes>
      <Route path='/' element={<Pokemons />}/>
      <Route path='/pokemons' element={<Pokemons /> }/>
      <Route path='pokemons/:name' element={<Pokemon />}/>
      <Route path='/items' element={<Items />}/>
      <Route path='/items/:name' element={<Item />}/>
      <Route path='/locations' element={<Locations />} />
      <Route path='/locations/:name' element={<Location />} />

    </Routes>
  )
}

export default App