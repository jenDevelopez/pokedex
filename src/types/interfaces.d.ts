// Tipado de los pokemos
export interface Pokemon {
  national_number: string;
  evolution: Evolution | null;
  sprites: Sprites;
  name: string;
  type: string[];
  total: number;
  hp: number;
  attack: number;
  defense: number;
  sp_atk: number;
  sp_def: number;
  speed: number;
}

interface Evolution {
  name: string;
}

interface Sprites {
  normal: string;
  large: string;
  animated: string;
}

interface DataPokemon {
  name: string
  id: number
  imgSrc: string
}

export type PokemonDetails = {
  name: string
  id: string
  imgSrc: string
  hp: number
  attack: number
  defense: number
}

//Tipados de los Items
interface Item {
  name: string
  imgSrc: string
}

export interface ItemDetails {
  id:number
  name:string
  cost:number
  imgSrc:string
  attributes: Attribute[]
  category: Category
  
}



export interface Attribute {
  name: string
  url: string
}

export interface Category {
  name: string
  url: string
}

export interface EffectEntry {
  effect: string
  language: Language
  short_effect: string
}

export interface Language {
  name: string
  url: string
}

export interface FlavorTextEntry {
  language: Language2
  text: string
  version_group: VersionGroup
}

export interface Language2 {
  name: string
  url: string
}

export interface VersionGroup {
  name: string
  url: string
}

export interface Index {
  game_index: number
  generation: Generation
}

export interface Generation {
  name: string
  url: string
}

export interface Name {
  language: Language3
  name: string
}

export interface Language3 {
  name: string
  url: string
}

export interface Sprites {
  default: string
}

export interface Location {
  name: string
  url: string
}

export type Region = Location

export interface PokedexState {
  init: number
  limit:number
  nextPage: string | null
  items: Item[]
  page: number
  pokemons: DataPokemon[]
  dataPokemon: PokemonDetails
  query:string
  isLoading: boolean
  dataItem: ItemDetails
  regions: Location []
  locations: Location[]
  setPokemons: (value: DataPokemon[]) => void,
  setQuery: (value: string) => void
  setIsLoading: (value: boolean) => void
  fetchPokemons: () => Promise<void>
  fetchDataPokemon: (pokemonName: string) => Pomise<void>
  formatPokemonName: (name: string) => string
  formatItemName: (name: string) => string
  fetchItems: () => Promise<void>
  toNextPage: () => Promise<void>
  toPreviewPage: () => Promise<void>
  fetchDataItem: (itemName: string) => Promise<void>
  fetchLocations: () => Promise<void>
  fetchDataLocation: (nameLocation: string) => Promise<void>
}