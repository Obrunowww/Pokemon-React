import React from "react";
import { useEffect, useState } from "react";
import "./PokedexC.css"
import axios from 'axios';
function MainClassic({ nomePesquisado, pokemons, loading }) {

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
    const [pokemonAtual, setPokemonAtual] = useState(pokemons[0])
    const [habitat, setHabitat] = useState({
        grass: "https://i.pinimg.com/564x/50/4e/97/504e97eb934fbdf6f3011584c4d8c1e3.jpg",
        fire: "https://img.freepik.com/fotos-premium/erupcao-vulcanica-e-arte-digital-do-vulcao-ativo-da-lava_160901-5726.jpg",
        water: "https://static.vecteezy.com/ti/vetor-gratis/p1/7875091-tropical-pixel-praia-com-surf-seascape-com-ceu-azul-e-brilho-do-poente-espuma-branca-rola-em-areia-amarela-quente-ondas-oceanicas-coloridas-criando-clima-de-de-ferias-vetor.jpg",
        bug: "https://i.pinimg.com/originals/a5/9b/73/a59b735200362f91e6735b2abcb787b2.png",
        normal: "https://i.pinimg.com/originals/d5/c7/b8/d5c7b890f8468454a7c9ad6244623e1f.png",
        poison: "https://i.pinimg.com/originals/8f/82/5d/8f825d7fa5ea0cd3898caf0168e60db3.png",
        electric: "https://www.models-resource.com/resources/big_icons/17/16701.png?updated=1467826518",
        ground: "https://images.ecycle.com.br/wp-content/uploads/2023/01/19145711/andrzej-kryszpiniuk-D1IS5s5O9xo-unsplash-scaled.jpg.webp",
        fairy: "https://static.vecteezy.com/ti/fotos-gratis/p2/1414787-planicie-florida-foto.jpg",
        flying: "https://media.istockphoto.com/id/1324413691/photo/beautiful-sky-with-white-clouds.jpg?b=1&s=612x612&w=0&k=20&c=1PZj5YunYSSl_UJBQusU9nyoHrg8PbF4Ul9ZCxv3eDo=",
        fighting: "https://media.istockphoto.com/id/1286724959/pt/foto/indoor-empty-room-japan-style-3d-rendering.jpg?s=612x612&w=0&k=20&c=q98y_KxitXeWt468jqIPKAM5b-xv_0Sy2mJeoCM6prA=",
        rock: "https://e1.pxfuel.com/desktop-wallpaper/810/702/desktop-wallpaper-pixel-art-mountains-and-mobile-backgrounds-1920x1080-pixel-art.jpg",
        ice: "https://media.timeout.com/images/105237092/750/422/image.jpg",
        psychic: "https://static.mundoeducacao.uol.com.br/mundoeducacao/conteudo_legenda/4c7a0ac590c714f38e9301b88d987665.jpg",
        dragon: "https://colorindonuvens.com/wp-content/uploads/2014/09/ArteConceitual-ComoTreinarSeuDragao-ColorindoNuvens1.png",
        ghost: "https://e0.pxfuel.com/wallpapers/649/180/desktop-wallpaper-ghost-pokemon.jpg",
        steel: "https://st4.depositphotos.com/4552837/39986/i/450/depositphotos_399860170-stock-photo-a-cave-in-the-rock.jpg",
        dark: "https://cdn.steamstatic.com/steamcommunity/public/images/items/573210/666974d94dc7e370f8cb279fd986ff477f00ccb7.jpg",
        default: "https://i.pinimg.com/originals/d5/c7/b8/d5c7b890f8468454a7c9ad6244623e1f.pn"
    })

    const [tipoPrincipal, setTipoPrincipal] = useState(pokemonAtual.types[0].type.name)
    const [evoImagem, setEvoImagens] = useState([])

    const pegarFundo = (tipo) => {
        return habitat[tipo.toLowerCase()] || habitat.default;
    }
    const [fundoAtual, setFundoAtual] = useState(pegarFundo(tipoPrincipal))
    const pegarCor = (tipo, escuro = false) => {
        const cores = {
            grass: escuro ? `#000000` : `#8bbe8a`,
            fire: escuro ? `#230500` : `#ffa756`,
            water: escuro ? `#230500` : `#58abf6`,
            bug: escuro ? `#230500` : `#8bd674`,
            normal: escuro ? `#230500` : `#BEC2CF`,
            poison: escuro ? `#000000` : `#9f6e97`,
            electric: escuro ? `#000000` : `#FFD65A`,
            ground: escuro ? `#281506` : `#f78551`,
            fairy: escuro ? `#130D0D` : `#eba8c3`,
            flying: escuro ? `#0B1626` : `#748fc9`,
            fighting: escuro ? `#120306` : `#eb4971`,
            rock: escuro ? `#000000` : `#6f6e78`,
            ice: escuro ? `#0C2528` : `#91d8df`,
            psychic: escuro ? `#481515` : `#ff6568`,
            dragon: escuro ? `#0E1321` : `#7383b9`,
            ghost: escuro ? `#2A2442` : `#8571be`,
            steel: escuro ? `#112330` : `#4c91b2`,
            dark: escuro ? `#D9D9CE` : `#1A1A1A`,
            default: escuro ? `#000000` : `#ffffff`, // Cor padrão se o tipo não for encontrado
        };

        return cores[tipo.toLowerCase()] || cores.default;
    };

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
        pegarImagemDasEvo(mostrarLinhaDeEvolução.chain.species.name)
    }
    const proximoPokemon = () => {
        setNumeroDoPokemon((s) => {
            let proximoNumero = s + 1;
            setPokemonEstaVirado(false)
            setpokemonEhShiny(false)
            setMostrarStatus(false)
            setMostrarAtaques(false)
            setEvoluções(false)
            if (proximoNumero > pokemons.length - 1) {
                proximoNumero = 0
            }
            setPokemonAtual(pokemons[proximoNumero]);
            return proximoNumero < pokemons.length ? proximoNumero : s;
        });
    }

    const trocarFundo = (tipo) => {
        setFundoAtual(pegarFundo(tipo))

    }
    const pokemonAnterior = () => {
        setNumeroDoPokemon((s) => {
            setPokemonEstaVirado(false)
            setpokemonEhShiny(false)
            setMostrarStatus(false)
            setMostrarAtaques(false)
            setEvoluções(false)
            let proximoNumero = s - 1;


            if (proximoNumero >= 0) {
                setPokemonAtual(pokemons[proximoNumero]);
            } else {

                proximoNumero = pokemons.length - 1;
                setPokemonAtual(pokemons[proximoNumero]);
            }

            return proximoNumero;
        });

    };

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
        } catch (erro) {
            console.log("deu um erro: ", erro)
        } finally {
            console.log(linhaEvolutiva)
            setMostrarLinhaDeEvolução(linhaEvolutiva)
            setCarregandoEvoluções(false)

        }
    }

    const pegarImagemDasEvo = (evolução) => {

        let imagen = ""



        if (evolução) {
            let primeiro = pokemons.filter((pokemon) =>
                pokemon.name.toLowerCase().includes(evolução.toLowerCase()))

            imagen = (primeiro[0].sprites.versions["generation-v"]["black-white"].animated.front_default
                ? primeiro[0].sprites.versions["generation-v"]["black-white"].animated.front_default
                : primeiro[0].sprites.front_default
                    ? primeiro[0].sprites.front_default
                    : "https://raw.githubusercontent.com/PokeAPI/media/master/logo/pokeapi_256.png")

        }

        return imagen

    }


    return (
        <main className="mainPokedexC">
            <section className="pokedexClassica">
                <section className="pokedexLadoEsquerdo">
                    <div className="botãoDeCima">
                        <button className="mudançaDeCor" style={{
                            // pegar os tipos do pokemon tcg e baixar as imagens para esse
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
                                    }}> <img className="pokebolaLoading" style={{ width: "100px" }} src="https://i.pinimg.com/originals/09/a6/ae/09a6ae937a6d9ef5cd10d132b59d6f5d.png" alt="" /></div>
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

                                    <h1 style={{paddingTop: "5px", textAlign: "center"}}>Linha Evolutiva Do  {(pokemonAtual.name).toUpperCase()}</h1>


                                    <div className="evolções">

                                        {mostrarLinhaDeEvolução.chain.species.name && (

                                        <figure>
                                            <img src={`${pegarImagemDasEvo(mostrarLinhaDeEvolução.chain.species.name)}`} alt="" />
                                            <figcaption>{mostrarLinhaDeEvolução.chain.species.name}</figcaption>
                                        </figure>
                                        ) }

                                        {mostrarLinhaDeEvolução.chain.evolves_to[0]?.species.name && (
                                        <figure>

                                            <img src={`${pegarImagemDasEvo(mostrarLinhaDeEvolução.chain.evolves_to[0]?.species.name)}`} alt="" />
                                            <figcaption>{mostrarLinhaDeEvolução.chain.evolves_to[0]?.species.name}</figcaption>
                                        </figure>

                                        )}
                                        {mostrarLinhaDeEvolução.chain.evolves_to[0]?.evolves_to[0]?.species.name &&(

                                        <figure>
                                            <img src={`${pegarImagemDasEvo(mostrarLinhaDeEvolução.chain.evolves_to[0]?.evolves_to[0]?.species.name)}`} alt="" />
                                            <figcaption>{mostrarLinhaDeEvolução.chain.evolves_to[0]?.evolves_to[0]?.species.name}</figcaption>
                                        </figure>
                                        )

                                        }
                                    </div>
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

                        <div className="ParteDeBaixoLadoDireito" >

                        <button onClick={() => {
                            setMostrarAtaques(false)
                            setMostrarStatus(false)
                            setEvoluções(!evoluções)

                        }
                        } ></button>
                        <button style= {{
                            border: "solid 3px black"
                            ,borderRadius: "5px",
                            backgroundColor: "#FB9B05", color: "#557FC6", fontSize: "20px"
                        }}
                        onClick={() => setMostrarStatus(!mostrarStatus)}>Status</button>

                        </div>
                    </div>

                </section>
            </section>
        </main>
    )
}

export default MainClassic