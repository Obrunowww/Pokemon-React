import React from "react";
import { useEffect, useState } from "react";
import "./PokedexC.css"

function MainClassic({ nomePesquisado, pokemons, loading }) {
    const [pokemonEstaVirado, setPokemonEstaVirado] = useState(false)
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


    const MostrarPokemon = () => {
        console.log(pokemonAtual)
    }
    const proximoPokemon = () => {
        setNumeroDoPokemon((s) => {
            let proximoNumero = s + 1;
            setpokemonEhShiny(false)
            setPokemonEstaVirado(false)
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
            setpokemonEhShiny(false)
            setPokemonEstaVirado(false)
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


    return (
        <main className="mainPokedexC">
            <section className="pokedexClassica">
                <section className="pokedexLadoEsquerdo">
                    <div className="botãoDeCima">
                        <button className="mudançaDeCor" style={{
                            // pegar os tipos do pokemon tcg e baixar as imagens para esse
                            backgroundColor: `${pegarCor(pokemonAtual.types[0].type.name)}`
                        }} onClick={() => MostrarPokemon()}></button>
                    </div>

                    <div className="imagemPoke">
                        <div className="esquerdaDaImagem" style={{ color: `${pegarCor(pokemonAtual.types[0].type.name)}` }}>
                            <h2>Nome</h2>
                            <p>{(pokemonAtual.name).toUpperCase()}</p>
                            <h2>Número</h2>
                            <p>#{pokemonAtual.order > 0 ? pokemonAtual.order : "none"}</p>
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
                                <button onClick={() => setMostrarAtaques(!mostrarAtaques)}></button>
                                <button onClick={() => setPokemonEstaVirado(!pokemonEstaVirado)}></button>
                                <button onClick={() => setpokemonEhShiny(!pokemonEhShiny)}></button>
                            </div>
                            <div className="interaçãoBotãoBaixo">
                                <button onClick={() =>{
                                    setMostrarStatus(false)
                                    setMostrarAtaques(false)
                                } 
                                }></button>
                            </div>

                        </div>
                    </div>
                </section>

                <section className="pokedexLadoDireito">

                    <div className="informaçõesAvPokemon">
                        {mostrarStatus ? (
                            // Conteúdo a ser renderizado se mostrarStatus for verdadeiro
                            <div>Conteúdo para mostrar Status verdadeiro</div>
                        ) : mostrarAtaques ? (
                            // Conteúdo a ser renderizado se mostrarAtaques for verdadeiro
                            <div>Conteúdo para mostrar Ataques verdadeiro</div>
                        ) : (
                            // Conteúdo padrão se nenhum dos dois for verdadeiro
                            <div className="status">
                                <h2>Habilidades</h2>
                                {pokemonAtual.abilities.map((habilidade, index) => (
                                    <p key={index}>{habilidade.ability.name}</p>
                                ))}
                                <h2>Base de xp</h2>
                                <p>
                                    {pokemonAtual.base_experience}xp
                                </p>
                                <h2>Peso e Altura</h2>
                                <p>
                                    {(pokemonAtual.weight / 10).toFixed(2)}Kg
                                </p>
                                <p>{(pokemonAtual.height / 10).toFixed(2)}m</p>

                            </div>
                        )}
                    </div>
                    <div className="informaçõesAvPokeBotões"></div>

                </section>
            </section>
        </main>
    )
}

export default MainClassic