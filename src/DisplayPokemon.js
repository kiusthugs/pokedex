import React from 'react'
import FilterPokemon from './FilterPokemon'
import ListPokemon from './ListPokemon'

export default function DisplayPokemon({originalPokeData, pokeData, handleSearchBox, handleType, handleWeakness}) {
  return (
    <div>
    <h1>PokeDex</h1>
    {pokeData && <FilterPokemon originalPokeData={originalPokeData} handleSearchBox={handleSearchBox} handleType={handleType} handleWeakness={handleWeakness}/>}
    {<ListPokemon pokeData={pokeData}/>}
    </div>
  )
}
