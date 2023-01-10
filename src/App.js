import React, { useEffect, useState } from "react"
import './App.css';
import FilterPokemon from "./FilterPokemon";
import DisplayPokemon from "./DisplayPokemon";

function App() {

  const [pokeData, setPokeData] = useState("");
  const [originalPokeData, setOriginalPokeData] = useState("")
  const [filterType, setFilterType] = useState("All")
  const [filterWeakness, setFilterWeakness] = useState("All")

  //Grab pokemon API
  useEffect(() => {
      const url = "https://raw.githubusercontent.com/Biuni/PokemonGO-Pokedex/master/pokedex.json";
      // {pokemon: [{}]}

      const fetchData = async () => {
          try {
              const response = await fetch(url)
              const json = await response.json()
              console.log(json)
              setOriginalPokeData(json.pokemon)
              setPokeData(json.pokemon)
          } catch (error) {
              console.log("error", error)
          }
      };

      fetchData()
  }, []);

  //Displays specific pokemon given the name input from search box
  function handleSearchBox(input) {
    let searchMatch = originalPokeData.filter(pokemon => pokemon.name.toLowerCase() === input.toLowerCase())
    if (searchMatch.length > 0) {
      document.getElementById("pokemonType").selectedIndex = 0
      document.getElementById("pokemonWeakness").selectedIndex = 0
      setPokeData(searchMatch)
    } else if(input.length === 0) {
      document.getElementById("pokemonType").selectedIndex = 0
      document.getElementById("pokemonWeakness").selectedIndex = 0
      setPokeData(originalPokeData)
    }
  }

  //Display specific pokemon according to type selction, filter with weakness if it exists
  function handleType(type) {
    console.log(type)

    if(type !== "All") {
      let typeMatch = originalPokeData.filter(pokemon => pokemon.type.includes(type))
        if(filterWeakness !== "All") {
          console.log("if type")
          setFilterType(type)
          setPokeData(typeMatch.filter(pokemon => pokemon.weaknesses.includes(filterWeakness)))
        } else {
          console.log("else type")
          setFilterType(type)
          setPokeData(typeMatch)
        }
    } else if(type === "All") {
      //Reset back to all, if filter weakness exists, display pokemon based off weakness
      if (filterWeakness !== "All") {
        setFilterType(type)
        setPokeData(originalPokeData.filter(pokemon => pokemon.weaknesses.includes(filterWeakness)))
      } else {
        setFilterType(type)
        setPokeData(originalPokeData)
      }
    }
  }

  //Display pokemon based off weakness selection, filter with type if it exists
  function handleWeakness(weakness) {
    console.log(weakness)

    if(weakness !== "All") {
      let weaknessMatch = originalPokeData.filter(pokemon => pokemon.weaknesses.includes(weakness))
      console.log(weaknessMatch)
        if(filterType !== "All") {
          setFilterWeakness(weakness)
          setPokeData(weaknessMatch.filter(pokemon => pokemon.type.includes(filterType)))
        } else {
          setFilterWeakness(weakness)
          setPokeData(weaknessMatch)
        }
    } else if (weakness === "All") {
      //Reset back to all, if filter type exists, display pokemon based off type
      if(filterType !== "All") {
        console.log("oof filter type")
        setFilterWeakness(weakness)
        setPokeData(originalPokeData.filter(pokemon => pokemon.type.includes(filterType)))
      } else {
        setFilterWeakness(weakness)
        setPokeData(originalPokeData)
      }
    }
  }

  return (
    <div>
      <div>
      <h1>PokeDex</h1>
      {pokeData && <FilterPokemon originalPokeData={originalPokeData} handleSearchBox={handleSearchBox} handleType={handleType} handleWeakness={handleWeakness}/>}
      </div>
      {pokeData && <DisplayPokemon pokeData={pokeData}/>}
    </div>
  );
}

export default App;
