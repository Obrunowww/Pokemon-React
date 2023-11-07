import React from "react";
import { useEffect, useState } from "react";
import LadoEsquerdoDex from "./Ladoesquerdo";
import LadoDireitoDex from "./Ladodireito";
import "./PokedexC.css"
import axios from 'axios';
function MainClassic({ nomePesquisado, pokemons, loading, pegarFundo, pegarCor }) {

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
                <LadoEsquerdoDex
                    pegarCor={pegarCor} MostrarPokemon={MostrarPokemon} pokemonAtual={pokemonAtual}
                    imagemDoPokemonAtual={imagemDoPokemonAtual} pokemonAnterior={pokemonAnterior} proximoPokemon={proximoPokemon}
                    setMostrarStatus={setMostrarStatus} setMostrarAtaques={setMostrarAtaques} mostrarAtaques={mostrarAtaques}
                    pokemonEstaVirado={pokemonEstaVirado} setPokemonEstaVirado={setPokemonEstaVirado} pokemonEhShiny={pokemonEhShiny}
                    setpokemonEhShiny={setpokemonEhShiny} setEvoluções={setEvoluções} fundoAtual={fundoAtual} trocarFundo={trocarFundo}

                />
                <LadoDireitoDex
                    mostrarStatus={mostrarStatus} pokemonAtual={pokemonAtual} mostrarAtaques={mostrarAtaques} carregandoAtaques={carregandoAtaques}
                    ataquesDoPoke={ataquesDoPoke} evoluções={evoluções} carregandoEvoluções={carregandoEvoluções} linhaEvoDosPoke={linhaEvoDosPoke}
                    setPesquisa= {setPesquisa} reset = {reset} pesquisarPokemon ={pesquisarPokemon} pesquisaDaDex= {pesquisaDaDex} 
                    setPesquisaDaDex = {setPesquisaDaDex} pesquisarPoke= {pesquisarPoke} setMostrarAtaques = {setMostrarAtaques}  setMostrarStatus= {setMostrarStatus}
                    setEvoluções = {setEvoluções} pesquisa={pesquisa} pegarCor =  {pegarCor} atualizarEvoluções = {atualizarEvoluções} pesquisarComEnter = {pesquisarComEnter}
                />



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