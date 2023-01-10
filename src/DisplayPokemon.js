import React from 'react'

export default function DisplayPokemon({pokeData}) {
  return (
    pokeData.map((pokemon) => {
        return (
            <div key={pokemon.id}>
                <h3>{pokemon.name}</h3>
                <img src={pokemon.img} alt={pokemon.name}></img>
                <p>Type: {pokemon.type.join(', ')}</p>
                <p>Weaknesses: {pokemon.weaknesses.join(', ')}</p>
                <p>#{pokemon.num}</p>
            </div>
        )
    })
  )
}
