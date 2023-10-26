import React, { useState, useEffect } from 'react';
import Card from './mainCard';



function Main({ nomePesquisado, pokemons, loading, favoritos, setFavoritos, pegarFundo,pegarCor, setErro, adicionarFavorito, setAdicionarFavorito, favoritoAtual, setFavoritoAtual}) {
    const [quantidadeDesejada, setQuantidadeDesejada] = useState(50);
    const [pokemonsFiltrados, setPokemonsFiltrados] = useState([]);




    

    const carregarMaisPokemons = () => {
        setQuantidadeDesejada(quantidadeDesejada + 50);
    };


    useEffect(() => {
        const filteredPokemons = nomePesquisado
            ? pokemons.filter((pokemon) =>
                pokemon.name.toLowerCase().includes(nomePesquisado.toLowerCase()) || pokemon.order === parseInt(nomePesquisado)
            )
            : pokemons;

        setPokemonsFiltrados(filteredPokemons);
    }, [nomePesquisado, pokemons]);


    return (
        <main>
            <section className="tabuleiroDeCards">
                {pokemonsFiltrados.slice(0, quantidadeDesejada).map((pokemon) => (
                    <Card

                        key={pokemon.name}
                        nome={pokemon.name}
                        imagem={
                            pokemon.sprites.versions["generation-v"]["black-white"].animated.front_default
                                ? pokemon.sprites.versions["generation-v"]["black-white"].animated.front_default
                                : pokemon.sprites.front_default ? pokemon.sprites.front_default : "https://raw.githubusercontent.com/PokeAPI/media/master/logo/pokeapi_256.png"
                        }
                        virado={pokemon.sprites.versions["generation-v"]["black-white"].animated.back_default ?
                            pokemon.sprites.versions["generation-v"]["black-white"].animated.back_default
                            : pokemon.sprites.back_default ? pokemon.sprites.back_default : "https://raw.githubusercontent.com/PokeAPI/media/master/logo/pokeapi_256.png"}
                        shiny={
                            pokemon.sprites.versions["generation-v"]["black-white"].animated.front_shiny
                                ? pokemon.sprites.versions["generation-v"]["black-white"].animated.front_shiny
                                : pokemon.sprites.front_shiny ? pokemon.sprites.front_shiny : "https://raw.githubusercontent.com/PokeAPI/media/master/logo/pokeapi_256.png"
                        }
                        shinyVirado={pokemon.sprites.versions["generation-v"]["black-white"].animated.back_shiny ?
                            pokemon.sprites.versions["generation-v"]["black-white"].animated.back_shiny
                            : pokemon.sprites.back_shiny ? pokemon.sprites.back_shiny : "https://raw.githubusercontent.com/PokeAPI/media/master/logo/pokeapi_256.png"}

                        tipos={pokemon.types}
                        pegarCor={pegarCor}
                        pegarFundo={pegarFundo}
                        numero={pokemon.order}
                        favoritos={favoritos}
                        setFavoritos={setFavoritos}
                        setErro = {setErro}
                        adicionarFavorito = {adicionarFavorito}  
                        setAdicionarFavorito={setAdicionarFavorito} 
                        favoritoAtual = {favoritoAtual} 
                        setFavoritoAtual = {setFavoritoAtual}
                    />
                ))}
                <div className="third-column">
                    {pokemonsFiltrados.length === 0 ? (
                        <p>Nenhum Pokémon encontrado😢.</p>
                    ) : null}
                </div>
                <div>
                    {loading ? (
                        <div>

                            <div style={{
                                width: "100%",
                                height: "100%", display: "flex",
                                alignItems: "center", justifyContent: "center"
                            }}> <img className="pokebolaLoading" style={{ width: "100px" }}
                                src="https://i.pinimg.com/originals/09/a6/ae/09a6ae937a6d9ef5cd10d132b59d6f5d.png" alt="" /></div>



                        </div>
                    ) : (
                        pokemonsFiltrados.length > quantidadeDesejada && (
                            <button className="carregarMais" onClick={carregarMaisPokemons}>
                                Carregar Mais
                            </button>
                        )
                    )}
                </div>

            </section>
        </main>
    );
}



export default Main;
