import React, { useEffect, useState } from "react"
import './css/App.css';
import DisplayPokemon from "./DisplayPokemon";
import DetailsPage from "./DetailsPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {

  const [pokeData, setPokeData] = useState("");
  const [originalPokeData, setOriginalPokeData] = useState("")
  const [filterType, setFilterType] = useState("All")
  const [filterWeakness, setFilterWeakness] = useState("All")
  const [filterList, setFilterList] = useState("")

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
    let searchFilteredMatch
    if(filterList) {
      searchFilteredMatch = filterList.filter(pokemon => pokemon.name.toLowerCase() === input.toLowerCase())
    }

    //Search based off filters
    if(filterType !== "All" && filterWeakness !== "All" && searchFilteredMatch.length > 0) {
      setPokeData(searchFilteredMatch)
      return
    } else if (filterType !== "All" && filterWeakness !== "All" && input.length === 0) {
      setPokeData(filterList)
    }
    
    if (searchMatch.length > 0) {
      setPokeData(searchMatch)
    } else if (input.length === 0 && filterType === "All" && filterWeakness === "All") {
      setPokeData(originalPokeData)
    } else if (input.length === 0 && (filterType !== "All" || filterWeakness !== "All")) {
      setPokeData(filterList)
    }
  }

  //Display specific pokemon according to type selction, filter with weakness if it exists
  function handleType(type) {
    console.log(type)

    if(type !== "All") {
      let typeMatch = originalPokeData.filter(pokemon => pokemon.type.includes(type))
        if(filterWeakness !== "All") {
          setFilterType(type)
          setFilterList(typeMatch.filter(pokemon => pokemon.weaknesses.includes(filterWeakness)))
          setPokeData(typeMatch.filter(pokemon => pokemon.weaknesses.includes(filterWeakness)))
        } else {
          setFilterType(type)
          setFilterList(typeMatch)
          setPokeData(typeMatch)
        }
    } else if(type === "All") {
      //Reset back to all, if filter weakness exists, display pokemon based off weakness
      if (filterWeakness !== "All") {
        setFilterType(type)
        setFilterList(originalPokeData.filter(pokemon => pokemon.weaknesses.includes(filterWeakness)))
        setPokeData(originalPokeData.filter(pokemon => pokemon.weaknesses.includes(filterWeakness)))
      } else {
        setFilterType(type)
        setFilterList(originalPokeData)
        setPokeData(originalPokeData)
      }
    }
  }

  //Display pokemon based off weakness selection, filter with type if it exists
  function handleWeakness(weakness) {
    console.log(weakness)

    if(weakness !== "All") {
      let weaknessMatch = originalPokeData.filter(pokemon => pokemon.weaknesses.includes(weakness))
        if(filterType !== "All") {
          setFilterWeakness(weakness)
          setFilterList(weaknessMatch.filter(pokemon => pokemon.type.includes(filterType)))
          setPokeData(weaknessMatch.filter(pokemon => pokemon.type.includes(filterType)))
        } else {
          setFilterWeakness(weakness)
          setFilterList(weaknessMatch)
          setPokeData(weaknessMatch)
        }
    } else if (weakness === "All") {
      //Reset back to all, if filter type exists, display pokemon based off type
      if(filterType !== "All") {
        setFilterWeakness(weakness)
        setFilterList(originalPokeData.filter(pokemon => pokemon.type.includes(filterType)))
        setPokeData(originalPokeData.filter(pokemon => pokemon.type.includes(filterType)))
      } else {
        setFilterWeakness(weakness)
        setFilterList(originalPokeData)
        setPokeData(originalPokeData)
      }
    }
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={pokeData && <DisplayPokemon originalPokeData={originalPokeData} handleSearchBox={handleSearchBox} handleType={handleType} handleWeakness={handleWeakness} pokeData={pokeData}/>} />
        <Route path="/:id" element={pokeData && <DetailsPage pokeData={pokeData} originalPokeData={originalPokeData}/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
