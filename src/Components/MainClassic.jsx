import React from "react";
import { useState } from "react";
import "./PokedexC.css"

function MainClassic({ nomePesquisado, pokemons, loading }) {
    const [pokemonAtual, setPokemonAtual] = useState(pokemons[1])
    const [habitat, setHabitat] = useState({
        grass: "https://i.pinimg.com/564x/50/4e/97/504e97eb934fbdf6f3011584c4d8c1e3.jpg",
        fire: "https://img.freepik.com/fotos-premium/erupcao-vulcanica-e-arte-digital-do-vulcao-ativo-da-lava_160901-5726.jpg",
        water: "https://static.vecteezy.com/ti/vetor-gratis/p1/7875091-tropical-pixel-praia-com-surf-seascape-com-ceu-azul-e-brilho-do-poente-espuma-branca-rola-em-areia-amarela-quente-ondas-oceanicas-coloridas-criando-clima-de-de-ferias-vetor.jpg",
        bug: "https://i.pinimg.com/originals/a5/9b/73/a59b735200362f91e6735b2abcb787b2.png",
        normal: "https://i.pinimg.com/originals/d5/c7/b8/d5c7b890f8468454a7c9ad6244623e1f.png",
        poison: "https://i.pinimg.com/originals/8f/82/5d/8f825d7fa5ea0cd3898caf0168e60db3.png",
        electric: "https://www.models-resource.com/resources/big_icons/17/16701.png?updated=1467826518",
        ground: "./images/terra.jpg",
        fairy: "./images/fada.jpg",
        flying: "./images/voador.jpg",
        fighting: "./images/lutador.jpg",
        rock: "./images/pedra.jpg",
        ice: "./images/gelo.jpg",
        psychic: "./images/psiquico.jpg",
        dragon: "./images/dragão.jpg",
        ghost: "./images/fantasma.jpg",
        steel: "./images/ferro.jpg",
        dark: "./images/dark.jpg",
        default: "./images/normal.jpg"
    })

    const MostrarPokemon = () => {
        console.log(pokemonAtual)
    }

    return (
        <main className="mainPokedexC">
            <section className="pokedexClassica">
                <section className="pokedexLadoEsquerdo">
                    <div className="botãoDeCima">
                        <button className="mudançaDeCor" onClick={() => MostrarPokemon()}></button>
                    </div>

                    <div className="imagemPoke">
                        <div className="esquerdaDaImagem"></div>
                        <figure className="LocalDaImagemPokemon">
                            <img src={`${pokemonAtual.sprites.versions["generation-v"]["black-white"].animated.front_default
                                ? pokemonAtual.sprites.versions["generation-v"]["black-white"].animated.front_default
                                : pokemonAtual.sprites.front_default ? pokemonAtual.sprites.front_default : "https://raw.githubusercontent.com/PokeAPI/media/master/logo/pokeapi_256.png"}`} alt="" />
                        </figure>
                    </div>

                    <div className="botõesDeBaixo"></div>
                </section>

                <section className="pokedexLadoDireito"></section>
            </section>
        </main>
    )
}

export default MainClassic