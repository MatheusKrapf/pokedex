import React from 'react';
import '../../styles/scss/card.scss'
import pokemonType from '../helpers/pokemonType'

function Card({ pokemon }) {
    return (
        <div className="cards">
            <div className="card">
                <div className="card-img">
                    <img src={pokemon.sprites.front_default} alt=""/>
                </div>
                <div className="card-name">
                    {pokemon.name}
                </div>
                <div className="card-types">
                    {pokemon.types.map(type => {
                        return (
                            <div className="wrap-types">
                                <div className="card-type" style={{ backgroundColor: pokemonType[type.type.name]}}>
                                    {type.type.name}
                                </div>
                            </div>
                        )
                    })}
                </div>
                <div className="card-info">
                    <div className="card-data-weight">
                        <p className="weight">Weight</p>
                        <p>{pokemon.weight}</p>
                    </div>
                    <div className="card-data-ability">
                        <p className="ability">Ability</p>
                        <p>{pokemon.ability}</p>
                        <p>{pokemon.abilities[0].ability.name}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Card;