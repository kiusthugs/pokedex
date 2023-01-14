import React from 'react'
import FilterPokemon from './FilterPokemon'
import ListPokemon from './ListPokemon'

export default function DisplayPokemon({originalPokeData, pokeData, handleSearchBox, handleType, handleWeakness}) {
  return (
    <>
    <header>
    <h1>Pokedex</h1>
    {pokeData && <FilterPokemon originalPokeData={originalPokeData} handleSearchBox={handleSearchBox} handleType={handleType} handleWeakness={handleWeakness}/>}
    </header>
    <div className="list">
    {<ListPokemon pokeData={pokeData}/>}
    </div>
    </>
  )
}
