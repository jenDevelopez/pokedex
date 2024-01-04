import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { Attribute, DataPokemon, Item, Location, PokedexState, Pokemon, Region } from "../types/interfaces";

export const usePokedexStore = create<PokedexState>()(
  devtools(
    persist(
      (set, get) => ({

        init:0,
        limit:10,
        nextPage: null,
        items:[],
        page: 1,
        pokemons: [],
        dataPokemon: {
          name: "",
          id: "",
          imgSrc: "",
          hp: 0,
          attack: 0,
          defense: 0,
        },
        dataItem: {
          id: 1,
          name: "",
          cost: 0,
          imgSrc: "",
          attributes: [
            {
              name: "",
              url: ""
            },
            {
              name: "",
              url: ""
            }
          ],
          category: {
            name: "",
            url: ""
          }
        },

        regions: [],
        locations:[],
        query: "",
        isLoading: false,
        setQuery: (value) => set({ query: value }),
        setIsLoading: (value) => set({ isLoading: value }),
        setPokemons: (value) => set({ pokemons: value }),

        formatPokemonName: (name: string) => {
          const lowerCase = name.toLowerCase();
          if (name.includes("♀")) {
            return lowerCase.replace("♀", "-f");
          } else if (lowerCase.includes("♂")) {
            return lowerCase.replace("♂", "-m");
          } else if (lowerCase.includes(". ")) {
            return lowerCase.replace(". ", "-");
          } else if (lowerCase.includes("farfetch'd")) {
            return lowerCase.replace("farfetch'd", "farfetchd");
          } else {
            return lowerCase;
          }
        },

        formatItemName(name) {
          const lowerCase = name.toLowerCase()
          if(name.includes("tm")){
            return lowerCase.replace(name, "tm-normal")
          }else if(name.includes("hm")){
            return lowerCase.replace(name,"hm-normal")
          }
          else{
            return lowerCase
          }
        },

        fetchPokemons: async () => {
          const { formatPokemonName } = get();
          const response = await fetch(
            "https://unpkg.com/pokemons@1.1.0/pokemons.json"
          );

          if (!response.ok) {
            throw new Error("Failed to fetch pokemons");
          }

          const results = await response.json();

          const pokemons = results.results.map((pokemon: Pokemon) => ({
            name: pokemon.name,
            id: pokemon.national_number,
            imgSrc: `https://img.pokemondb.net/sprites/black-white/anim/normal/${formatPokemonName(
              pokemon.name.toLowerCase()
            )}.gif`,
          }));

          const uniquePokemons = pokemons.filter(
            (pokemon: DataPokemon, index: number) =>
              pokemons.findIndex(
                (other: DataPokemon) => other.id === pokemon.id
              ) === index
          );

          set({ pokemons: uniquePokemons });
        },

        fetchDataPokemon: async (pokemonName) => {
          const { formatPokemonName } = get();
          const response = await fetch(
            `https://pokeapi.co/api/v2/pokemon/${formatPokemonName(
              pokemonName
            )}`
          );

          if (!response.ok) {
            throw new Error(`Fail fetch ${pokemonName} data`);
          }

          const result = await response.json()

          const pokemon = {
            name: result.name,
            id: result.id,
            imgSrc: result.sprites.front_default,
            hp: result.stats[0]?.base_stat,
            attack: result.stats[1]?.base_stat,
            defense: result.stats[2]?.base_stat,
          };

          set({ dataPokemon: pokemon });
        },

        fetchItems: async() => {
          const {init, limit,formatItemName} = get()
       
          const response = await fetch(`https://pokeapi.co/api/v2/item?offset=${init}&limit=${limit}`)


          if(!response.ok) {
            throw new Error("Error fetching items")
          }

          const results = await response.json()
          
          const listItems = results.results.map((item:Item) => ({
            name: item.name,
            imgSrc: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/${formatItemName(item.name)}.png`
          }))

          set({items: listItems})
          
        },

        fetchDataItem: async(itemName) => {
          const response = await fetch(
            `https://pokeapi.co/api/v2/item/${itemName}`
          );

          if (!response.ok) {
            throw new Error(`Fail fetch ${itemName} data`);
          }
          
          const result = await response.json()
          const atributes = result.attributes.map((atribute: Attribute) => ({
            name:atribute.name,
            url: atribute.url
          }))
         
          const item = {
            id:result.id,
            name: result.name,
            cost: result.cost,
            imgSrc: result.sprites.default,
            attributes: atributes,
            category: result.category.name
          }
          set({dataItem:item})
        },

        toNextPage: async() => {
          const { init, limit } = get()
          set({init: init + limit})         
          set((state) => ({page: state.page + 1}))
          const response = fetch(`https://pokeapi.co/api/v2/item?offset=${init}&limit=${limit}`)
          const results = await (await response).json()
          const newItems = results.results.map((item: Item) => ({
            name: item.name,
            imgSrc:`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/${item.name}.png`
          }))
          set({items: newItems})
        },

        toPreviewPage: async() => {
          const {init, limit} = get()
          set((state) => ({
            init: state.page <= 1 ? 0 : init - limit
          }))
          set((state) => ({
            page: state.page <= 1 ? 1 : state.page - 1
          }))

          const response = fetch(`https://pokeapi.co/api/v2/item?offset=${init}&limit=${limit}`)
          const results = await (await response).json()
          const newItems = results.results.map((item: Item) => ({
            name: item.name,
            imgSrc:`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/${item.name}.png`
          }))
          set({items: newItems})
        },
        
        fetchLocations: async() => {       
          const response = await fetch(`https://pokeapi.co/api/v2/region`)


          if(!response.ok) {
            throw new Error("Error fetching items")
          }

          const results = await response.json()
          
          
          const listRegions = results.results.map((region: Region) => ({
            name: region.name,
            url: region.url
          }))
          set({regions: listRegions})
        },

        fetchDataLocation: async(nameLocation) =>  {
          const response = await fetch(`https://pokeapi.co/api/v2/region/${nameLocation}`)

          if(!response.ok) {
            throw new Error(`Error fetching data ${nameLocation}`)
          }

          const results = await response.json()
     
          const listLocations = results.locations.map((location: Location) => ({
            name: location.name,
            url: location.url
          }))
          set({locations: listLocations})
        },
      }),
      { name: "pokedexStore" }
    )
  )
);
