import React from 'react'

export default function FilterPokemon({originalPokeData, handleSearchBox, handleType, handleWeakness}) {

    const dropdown = dropDownItems(originalPokeData)

    //Returns unique pokemon types for dropdown selection element
    function dropDownItems(originalPokeData) {
        let gatherTypesArr = []
        originalPokeData.forEach(pokemon => gatherTypesArr.push(pokemon.type))
        return gatherTypesArr.flat().filter((item, i, ar) => ar.indexOf(item) === i).sort()
    }


  return (
    <div>

    <div>
        <input size="35" type="text" id="name" name="name" placeholder="Search for specific Pokemon by name..." onChange={(e) => handleSearchBox(e.target.value)}></input>
    </div>
    
    <div>
    <label htmlFor="pokemonType">Choose a Pokemon Type:</label>
    <select name="pokemonType" id="pokemonType" defaultValue="All" onChange={(e) => handleType(e.target.value)}>
        <option value="All">All</option>
        {dropdown.map((type) => {
            return <option value={type} key={type}>{type}</option>
        })}
    </select>
    </div>

    <div>
    <label htmlFor="pokemonWeakness">Choose a Pokemon Weakness:</label>
    <select name="pokemonWeakness" id="pokemonWeakness" defaultValue="All" onChange={(e) => handleWeakness(e.target.value)}>
        <option value="All">All</option>
        {dropdown.map((type) => {
            return <option value={type} key={type}>{type}</option>
        })}
    </select>
    </div>

    </div>
  )
}
