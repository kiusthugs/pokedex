import React from 'react'
import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'

export default function DetailsPage(props) {
    const [pokemon, setPokemon] = useState({})
    const [nextEvolution, setNextEvolution] = useState(false)

    const {id} = useParams()

    // function handleNextEvolution(pokemon) {
    //     setPokemon(pokemon)
    // }

    // function findNextEvolution(num) {
    //     const evolution = props.originalPokeData.find(el => el.num === num)
    //     console.log(evolution)
    // }

    const getPokemonDetails = () => {
        const pokemonDetails = props.pokeData.find(el => {
            return el.id === parseInt(id)
        })

        if(pokemonDetails.hasOwnProperty("next_evolution")) {
            setNextEvolution(true)
        }

        setPokemon(pokemonDetails)
    }

    useEffect(() => {
        getPokemonDetails()
    })

    //Evolution implementation
    //if has next_evolution, list out evolutions
    //on evolution screen, have home button and previous evolution button

  return (
    <div key={pokemon.id}>
        <Link to="/"><button>← Return to PokeDex</button></Link>
        <h3>{pokemon.name}</h3>
        <img src={pokemon.img} alt={pokemon.name}></img>
        <p>Type: {pokemon.type && pokemon.type.join(', ')}</p>
        <p>Weaknesses: {pokemon.weaknesses && pokemon.weaknesses.join(', ')}</p>
        <p>#{pokemon.num}</p>
        <span>Height: Weight:</span>
        <p>Candy: </p>
        <p>Spawn Chance: Spawn Time: Average Spawns: </p>
        <p>Next Evolution: </p>
        <ul>
        {nextEvolution === true && pokemon.next_evolution.map((el) => {
            return (<Link><li>{el.name}</li></Link>)
        })}
        </ul>
    </div>
  )
}
