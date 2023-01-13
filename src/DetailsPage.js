import React from 'react'
import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'

export default function DetailsPage(props) {
    const [pokemon, setPokemon] = useState({})

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

        setPokemon(pokemonDetails)
    }

    useEffect(() => {
        getPokemonDetails()
    })

    //Display Extra Pokemon details

  return (
    <div>
        <Link to="/"><button>← Return to PokeDex</button></Link>
        <div key={pokemon.id}>
        <h3>{pokemon.name}</h3>
        <img src={pokemon.img} alt={pokemon.name}></img>
        {/* <p>Type: {pokemon.type && pokemon.type.join(', ')}</p>
        <p>Weaknesses: {pokemon.weaknesses && pokemon.weaknesses.join(', ')}</p>
        <span>Height: Weight:</span>
        <p>Candy: </p>
        <p>Spawn Chance: Spawn Time: Average Spawns: </p> */}

        <table>
            <tbody>
            <tr>
                <th>Num</th>
                <th>Type</th>
                <th>Weakness</th>
                <th>Height</th>
                <th>Weight</th>
                <th>Spawn Time</th>
            </tr>
            <tr>
                <td>{pokemon.num}</td>
                <td>{pokemon.type && pokemon.type.join(', ')}</td>
                <td>{pokemon.weaknesses && pokemon.weaknesses.join(', ')}</td>
                <td>{pokemon.height}</td>
                <td>{pokemon.weight}</td>
                <td>{pokemon.spawn_time}</td>
            </tr>
            </tbody>
        </table>

        {pokemon.prev_evolution && 
        <div>
        <p>Previous Evolution&#40;s&#41;: </p>
        <ul>
        {pokemon.prev_evolution && pokemon.prev_evolution.map((el) => {
            return (<Link to={`/${parseInt(el.num)}`}key={el.num}><li>{el.name}</li></Link>)
        })}
        </ul>
        </div>}

        {pokemon.next_evolution && 
        <div>
        <p>Evolution&#40;s&#41;: </p>
        <ul>
        {pokemon.next_evolution && pokemon.next_evolution.map((el) => {
            return (<Link to={`/${parseInt(el.num)}`}key={el.num}><li>{el.name}</li></Link>)
        })}
        </ul>
        </div>}
    </div>
    </div>
  )
}
