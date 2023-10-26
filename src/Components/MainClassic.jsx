import React from "react";
import { useEffect, useState } from "react";
import "./PokedexC.css"
import axios from 'axios';
function MainClassic({ nomePesquisado, pokemons, loading, pegarFundo, pegarCor}) {

    const [pesquisa, setPesquisa] = useState(false)
    const [pesquisaDaDex, setPesquisaDaDex] = useState("")
    const [pokemonEstaVirado, setPokemonEstaVirado] = useState(false)
    const [ataquesDoPoke, setAtaquesDoPoke] = useState([])
    const [mostrarLinhaDeEvolução, setMostrarLinhaDeEvolução] = useState([])
    const [evoluções, setEvoluções] = useState(false)
    const [carregandoAtaques, setCarregandoAtaques] = useState(true)
    const [carregandoEvoluções, setCarregandoEvoluções] = useState(true)
    const [pokemonEhShiny, setpokemonEhShiny] = useState(false)
    const [mostrarStatus, setMostrarStatus] = useState(false)
    const [mostrarAtaques, setMostrarAtaques] = useState(false)
    const [numeroDoPokemon, setNumeroDoPokemon] = useState(0)
    const [imagemDoPokemonAtual, setImagemDoPokemonAtual] = useState("")
    const [pokemonAtual, setPokemonAtual] = useState(pokemons[numeroDoPokemon])
    
    const [linhaEvoDosPoke, setLinhaEvoDosPoke] = useState([])

    const [tipoPrincipal, setTipoPrincipal] = useState(pokemonAtual.types[0].type.name)

    const [fundoAtual, setFundoAtual] = useState(pegarFundo(tipoPrincipal))


    useEffect(() => {


        const normal = pokemonAtual.sprites.versions["generation-v"]["black-white"].animated.front_default
            ? pokemonAtual.sprites.versions["generation-v"]["black-white"].animated.front_default
            : pokemonAtual.sprites.front_default
                ? pokemonAtual.sprites.front_default
                : "https://raw.githubusercontent.com/PokeAPI/media/master/logo/pokeapi_256.png"

        const shiny = pokemonAtual.sprites.versions["generation-v"]["black-white"].animated.front_shiny
            ? pokemonAtual.sprites.versions["generation-v"]["black-white"].animated.front_shiny
            : pokemonAtual.sprites.front_shiny ? pokemonAtual.sprites.front_shiny : "https://raw.githubusercontent.com/PokeAPI/media/master/logo/pokeapi_256.png"

        const shinyVirado = pokemonAtual.sprites.versions["generation-v"]["black-white"].animated.back_shiny ?
            pokemonAtual.sprites.versions["generation-v"]["black-white"].animated.back_shiny
            : pokemonAtual.sprites.back_shiny ? pokemonAtual.sprites.back_shiny : "https://raw.githubusercontent.com/PokeAPI/media/master/logo/pokeapi_256.png"


        const virado = pokemonAtual.sprites.versions["generation-v"]["black-white"].animated.back_default ?
            pokemonAtual.sprites.versions["generation-v"]["black-white"].animated.back_default
            : pokemonAtual.sprites.back_default ? pokemonAtual.sprites.back_default : "https://raw.githubusercontent.com/PokeAPI/media/master/logo/pokeapi_256.png"

        let imagemAtual = (pokemonEstaVirado ? (pokemonEhShiny ? shinyVirado : virado) : (pokemonEhShiny ? shiny : normal))



        setImagemDoPokemonAtual(imagemAtual);


        setTipoPrincipal(pokemonAtual.types[0].type.name);
        setFundoAtual(pegarFundo(tipoPrincipal))


    }, [pokemonAtual, tipoPrincipal, pokemonEhShiny, pokemonEstaVirado]);

    useEffect(() => {
        pegarAtaques(pokemonAtual)
        pegarLinhaEvolutiva(pokemonAtual)


    }, [pokemonAtual])


    const MostrarPokemon = () => {
        const teste = nomePesquisado
        console.log(teste)
    }
    const reset = () => {
        setPokemonEstaVirado(false)
        setpokemonEhShiny(false)
        setMostrarStatus(false)
        setMostrarAtaques(false)
        setEvoluções(false)
    }
    const proximoPokemon = () => {
        reset()
        setNumeroDoPokemon((s) => {
            s = s + 1;
            if (s > pokemons.length - 1) {
                s = 0;
            }
            setPokemonAtual(pokemons[s]);
            return s;
        });
    }

    const trocarFundo = (tipo) => {
        setFundoAtual(pegarFundo(tipo))

    }
    const pokemonAnterior = () => {
        reset()
        setNumeroDoPokemon((s) => {
            s = s - 1;
            if (s < 0) {
                s = pokemons.length - 1;
            }
            setPokemonAtual(pokemons[s]);
            return s;
        });
    }

    const pegarAtaques = async (pokemon) => {
        try {
            setCarregandoAtaques(true)
            const detalhesDoAtaques = await Promise.all(pokemon.moves.map(async (movimento) => {
                const detalhesResposta = await axios.get(movimento.move.url)

                return detalhesResposta.data
            }
            ))
            setAtaquesDoPoke(detalhesDoAtaques)
        } catch (erro) {

            console.log("erro ao pegar Ataques", erro)
        } finally {
            setTimeout(() => {
                setCarregandoAtaques(false)
            }, 400);
        }
    }

    const pegarLinhaEvolutiva = async (pokemon) => {
        let resposta;
        let linhaEvolutiva;

        try {

            setCarregandoEvoluções(true)

            const caminho = pokemon.species.url
            resposta = (await axios.get(caminho)).data;
            const caminhoParaEvoluções = resposta.evolution_chain.url
            linhaEvolutiva = (await axios.get(caminhoParaEvoluções)).data
            setMostrarLinhaDeEvolução(linhaEvolutiva)

        } catch (erro) {
            console.log("deu um erro: ", erro)
        } finally {

            setCarregandoEvoluções(false)

        }
    }

    const pegarImagemDasEvo = (evolução) => {
        let primeiro;
        if (evolução) {
            primeiro = pokemons.filter((pokemon) =>
                pokemon.name.toLowerCase().includes(evolução.toLowerCase()))

        }

        return primeiro

    }



    const atualizarEvoluções = () => {
        let primeiroEvo, segundaEvo, terceiraEvo
        let todosPoke = []
        let todasAsimagens = []
        if (mostrarLinhaDeEvolução.chain.species.name) {

            primeiroEvo = pegarImagemDasEvo(mostrarLinhaDeEvolução.chain.species.name)
            todosPoke.push(primeiroEvo)
        }
        if (mostrarLinhaDeEvolução.chain.evolves_to.length > 2) {
            mostrarLinhaDeEvolução.chain.evolves_to.forEach((evo) => {
                primeiroEvo = pegarImagemDasEvo(evo.species.name)
                todosPoke.push(primeiroEvo)
            })
        }
        if (mostrarLinhaDeEvolução.chain.evolves_to[0]?.species.name) {
            segundaEvo = pegarImagemDasEvo(mostrarLinhaDeEvolução.chain.evolves_to[0]?.species.name)
            todosPoke.push(segundaEvo)
        } if (mostrarLinhaDeEvolução.chain.evolves_to[0]?.evolves_to[0]?.species.name) {

            terceiraEvo = pegarImagemDasEvo(mostrarLinhaDeEvolução.chain.evolves_to[0]?.evolves_to[0]?.species.name)
            todosPoke.push(terceiraEvo)
        }



        todosPoke.forEach((poke) => {
            poke.forEach((unidade) => {
                let imagem = (unidade.sprites.versions["generation-v"]["black-white"].animated.front_default
                    ? unidade.sprites.versions["generation-v"]["black-white"].animated.front_default
                    : unidade.sprites.front_default
                        ? unidade.sprites.front_default
                        : "https://raw.githubusercontent.com/PokeAPI/media/master/logo/pokeapi_256.png")
                let name = unidade.name
                const duplicata = todasAsimagens.some((pokemon) => pokemon.name === name);

                if (!duplicata) {
                    todasAsimagens.push({ name: name, imagem: imagem });
                }
            })
        })

        setLinhaEvoDosPoke(todasAsimagens)

    }

    const pesquisarPoke = (event) => {
        const pokemonPesquisado = event.target.value

        setPesquisaDaDex(pokemonPesquisado.toLowerCase())
    }

    const [mostrarErroNaPesquisa, setMostrarErroNaPesquisa] = useState(false)
    const pesquisarPokemon = (pesquisa) => {
        const pesquisado = pokemons.findIndex((pokemon) => {
            return pokemon.order == pesquisa || 
            pokemon.name.toLowerCase().includes(pesquisa.toLowerCase())
        })

        if (pesquisado !== -1) {
            setNumeroDoPokemon(pesquisado)
            setPokemonAtual(pokemons[pesquisado]);
        } else {

            setMostrarErroNaPesquisa(true)
            setTimeout(() => {
            setMostrarErroNaPesquisa(false)
                
            }, 2980);   
        

        }


    }
    const pesquisarComEnter = (event) => {
        if (event.key === "Enter") {
            reset();
            pesquisarPokemon(pesquisaDaDex);
            setPesquisa(false);
            setPesquisaDaDex("");
        }
    }

    useEffect(() => {
        pesquisarPokemon(nomePesquisado)
      }, [nomePesquisado]);

    return (
        <main className="mainPokedexC">
            <section className="pokedexClassica">
                <section className="pokedexLadoEsquerdo">
                    <div className="botãoDeCima">
                        <button className="mudançaDeCor" style={{

                            backgroundColor: `${pegarCor(pokemonAtual.types[0].type.name)}`
                        }} onClick={() => MostrarPokemon()
                        }></button>
                    </div>

                    <div className="imagemPoke">
                        <div className="esquerdaDaImagem" style={{ color: `${pegarCor(pokemonAtual.types[0].type.name)}` }}>
                            <h2>Nome</h2>
                            <p style={{ textShadow: `1px 1px 10px ${pegarCor(pokemonAtual.types[0].type.name)}` }}>{(pokemonAtual.name).toUpperCase()}</p>
                            <h2>Número</h2>
                            <p style={{ textShadow: `1px 1px 10px ${pegarCor(pokemonAtual.types[0].type.name)}` }} >#{pokemonAtual.order > 0 ? pokemonAtual.order : "none"}</p>
                            <h2>Tipos</h2>
                            <div className="PokeAtualtipos">
                                {pokemonAtual.types.map((tipo, index) => (
                                    <button key={index}
                                        style={{
                                            backgroundColor: `${pegarCor(tipo.type.name)}`
                                            , color: `${pegarCor(tipo.type.name, true)}`,
                                            cursor: "pointer"

                                        }} onClick={() => trocarFundo(tipo.type.name)}>{tipo.type.name}</button>
                                ))}

                            </div>


                        </div>
                        <figure className="LocalDaImagemPokemon" style={{ backgroundImage: `url(${fundoAtual})` }}>
                            <img src={`${imagemDoPokemonAtual}`} alt="" />
                        </figure>
                    </div>

                    <div className="botõesDeBaixo">

                        <div className="avançarPokes">
                            <button onClick={() => pokemonAnterior()}></button>
                            <button onClick={() => proximoPokemon()}></button>
                        </div>

                        <div className="interagirComPokes">
                            <div className="interaçãoBotãoCima">
                                <button onClick={() => { setMostrarStatus(false); setMostrarAtaques(!mostrarAtaques) }}></button>
                                <button onClick={() => setPokemonEstaVirado(!pokemonEstaVirado)}></button>
                                <button onClick={() => setpokemonEhShiny(!pokemonEhShiny)}></button>
                            </div>
                            <div className="interaçãoBotãoBaixo">
                                <button onClick={() => {
                                    setMostrarStatus(false)
                                    setMostrarAtaques(false)
                                    setEvoluções(false)
                                }
                                }></button>
                            </div>

                        </div>
                    </div>
                </section>

                <section className="pokedexLadoDireito">

                    <div className="informaçõesAvPokemon">
                        {mostrarStatus ? (

                            <div className="status">
                                <h2 style={{ textAlign: "center" }}>Status</h2>
                                {pokemonAtual.stats.map((status, index) => (
                                    <div className="status" key={index}>
                                        <h3>{status.stat.name}</h3>
                                        <p style={{ display: "flex", height: "24px", justifyContent: "space-around" }}> <span style={{ width: "10%" }}>{status.base_stat}</span>
                                            <div className="barraContainer" style={{ width: "60%", height: "100%", border: "solid 1px" }}>
                                                <div className="barra" style={{ width: `${status.base_stat}px`, height: "100%", backgroundColor: `${pegarCor(pokemonAtual.types[0].type.name)}` }}></div>
                                            </div></p>
                                    </div>
                                ))}</div>
                        ) : mostrarAtaques ? (
                            carregandoAtaques ?
                                (
                                    <div style={{
                                        width: "100%",
                                        height: "100%", display: "flex",
                                        alignItems: "center", justifyContent: "center"
                                    }}> <img className="pokebolaLoading" style={{ width: "100px" }} src="https://i.pinimg.com/originals/09/a6/ae/09a6ae937a6d9ef5cd10d132b59d6f5d.png" alt="" />
                                    </div>
                                )
                                : (
                                    <div>
                                        <h2>Ataques ({ataquesDoPoke.length}) </h2>
                                        <div className="ataquesGrid">
                                            {ataquesDoPoke.map((ataque, index) => (
                                                <div key={index} className="ataque" style={{ backgroundColor: `${pegarCor(ataque.type.name)}`, color: `${pegarCor(ataque.type.name, true)}` }}>
                                                    <h3>
                                                        {ataque.name}
                                                    </h3>
                                                    <div style={{
                                                        width: "100%", height: "40%", display: "grid",
                                                        gridTemplateColumns: "2fr 2fr 1fr"

                                                    }}>
                                                        <p> {ataque.power ? "power: " + ataque.power : "power: 0"}</p>
                                                        <p>Tipo: {ataque.type.name}</p>
                                                        <p style={{ textAlign: "end" }}>pp :{ataque.pp}</p>
                                                    </div>

                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )
                        ) : evoluções ?
                            (carregandoEvoluções ? (
                                <div style={{
                                    width: "100%",
                                    height: "100%", display: "flex",
                                    alignItems: "center", justifyContent: "center"
                                }}> <img className="pokebolaLoading" style={{ width: "100px" }} src="https://i.pinimg.com/originals/09/a6/ae/09a6ae937a6d9ef5cd10d132b59d6f5d.png" alt="" /></div>
                            ) : (

                                <div>

                                    <h1 style={{ paddingTop: "5px", textAlign: "center" }}>Variantes E Evoluções  {(pokemonAtual.name).toUpperCase()}</h1>


                                    <figure className="evoluções">
                                        {linhaEvoDosPoke.map((linha) => (
                                            <div>
                                                <img src={linha.imagem} alt="" />
                                                <figcaption>{linha.name}</figcaption>
                                            </div>
                                        ))}


                                    </figure>
                                    {/* fazer isso só pro eevee */}
                                    {/* {mostrarLinhaDeEvolução.chain.evolves_to.length > 0 ? (
                                        mostrarLinhaDeEvolução.chain.evolves_to.map((evo, index) => (
                                            <p key={index}>{evo.species.name}</p>
                                        ))
                                    ) : (
                                        <p>Não há evoluções disponíveis.</p>
                                    )} */}
                                </div>

                            )


                            ) : (

                                <div className="InfoBasica">
                                    <h2>Habilidades</h2>
                                    {pokemonAtual.abilities.map((habilidade, index) => (
                                        <p key={index}>{habilidade.ability.name}</p>
                                    ))}
                                    <h2>Base de xp</h2>
                                    <p>
                                        {pokemonAtual.base_experience == null ? "Sem base" : pokemonAtual.base_experience + "xp"}
                                    </p>
                                    <h2>Peso e Altura</h2>
                                    <p>
                                        {(pokemonAtual.weight / 10).toFixed(2)}Kg
                                    </p>
                                    <p>{(pokemonAtual.height / 10).toFixed(2)}m</p>

                                </div>
                            )}
                    </div>
                    <div className="informaçõesAvPokeBotões">

                        <div className="caixaDePesquisa">
                            <button onClick={() => {
                                setPesquisa(!pesquisa)


                            }}></button>
                            {pesquisa && (
                                <>
                                    <input type="text"
                                        onKeyDown={pesquisarComEnter}
                                        onChange={pesquisarPoke} />
                                    <button onClick={() => { reset(), pesquisarPokemon(pesquisaDaDex), setPesquisa(false), setPesquisaDaDex("") }} className="pesquisar">🔍</button>
                                </>
                            )}

                        </div>

                        <div className="ParteDeBaixoLadoDireito" >

                            <button onClick={() => {
                                atualizarEvoluções()
                                setMostrarAtaques(false)
                                setMostrarStatus(false)
                                setEvoluções(!evoluções)

                            }
                            } ></button>
                            <button style={{
                                border: "solid 3px black"
                                , borderRadius: "5px",
                                backgroundColor: "#FB9B05", color: "#557FC6", fontSize: "20px"
                            }}
                                onClick={() => setMostrarStatus(!mostrarStatus)}>Status</button>

                        </div>
                    </div>

                </section>

            </section>
            {mostrarErroNaPesquisa && (
                <div className="mostrarErro">Pokémon não existente 😿
                    <div className="progreçoContainer">
                        <div className="progreço"></div>
                    </div>
                </div>
            )}

        </main>
    )
}

export default MainClassic