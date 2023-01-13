import React from 'react'
import {Link} from 'react-router-dom'

export default function ListPokemon({pokeData}) {
  return (
        pokeData.map((pokemon) => {
        return (
            <div key={pokemon.id}>
                <h3>{pokemon.name}</h3>
                <img src={pokemon.img} alt={pokemon.name}></img>
                <p>Type: {pokemon.type.join(', ')}</p>
                <p>Weaknesses: {pokemon.weaknesses.join(', ')}</p>
                <p>#{pokemon.num}</p>
                <Link to={`${pokemon.id}`}>View More</Link>
            </div>
        )
    })
  )
}
