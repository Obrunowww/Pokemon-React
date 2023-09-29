import React, { useEffect, useState } from 'react';
import axios from 'axios';



function Main({ nomePesquisado }) {
    const [quantidadeDesejada, setQuantidadeDesejada] = useState(50);
    const [pokemons, setPokemons] = useState([]);
    const [loading, setLoading] = useState(true);


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
          dark: escuro? `#D9D9CE`: `#1A1A1A`,
          default: escuro ? `#000000` : `#ffffff`, // Cor padrão se o tipo não for encontrado
        };
        
        return cores[tipo.toLowerCase()] || cores.default;
      };
    
      const pegarFundo = (tipo,) => {
        const fundo = {
          grass: "/images/grama.jpg",
          fire: "/images/fogo.jpg",
          water: "/images/agua.jpg",
          bug: "/images/inseto.jpg",
          normal: "/images/normal.jpg",
          poison: "/images/veneno.jpg",
          electric: "/images/eletrico.jpg",
          ground: "/images/terra.jpg",
          fairy: "/images/fada.jpg",
          flying: "/images/voador.jpg",
          fighting: "/images/lutador.jpg",
          rock: "/images/pedra.jpg",
          ice: "/images/gelo.jpg",
          psychic:"/images/psiquico.jpg",
          dragon: "/images/dragão.jpg",
          ghost: "/images/fantasma.jpg",
          steel: "/images/ferro.jpg",
          dark: "/images/dark.jpg",
          default: "/images/normal.jpg"
        };
        
        return fundo[tipo.toLowerCase()] || cores.default;
      };


useEffect(() => {
    pegarTodosPokemons();
}, []);


const pegarTodosPokemons = async () => {
    try {
        const resposta = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0");
        const todosPokemons = resposta.data.results;

        const detalhesPokemons = await Promise.all(todosPokemons.map(async (pokemon) => {
            const detalhesResposta = await axios.get(pokemon.url);
            const pokedata = detalhesResposta.data;
            return pokedata;
        }));

        //   if (detalhesPokemons.length <= quantidadeDesejada) {
        //     setMostrarBotaoCarregar(false);
        //   }

        setPokemons(detalhesPokemons);
    } catch (erro) {
        console.error("Erro em buscar todos Pokemons", erro);
    } finally {
        setLoading(false);
    }
};

const carregarMaisPokemons = () => {
    setQuantidadeDesejada(quantidadeDesejada + 50);
};


const pokemonsFiltrados = nomePesquisado
    ? pokemons.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(nomePesquisado.toLowerCase())
    )
    : pokemons;

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
                    virado = {pokemon.sprites.versions["generation-v"]["black-white"].animated.back_default?
                    pokemon.sprites.versions["generation-v"]["black-white"].animated.back_default 
                    : pokemon.sprites.back_default ? pokemon.sprites.back_default : "https://raw.githubusercontent.com/PokeAPI/media/master/logo/pokeapi_256.png"}
                    shiny={
                        pokemon.sprites.versions["generation-v"]["black-white"].animated.front_shiny
                        ? pokemon.sprites.versions["generation-v"]["black-white"].animated.front_shiny
                        : pokemon.sprites.front_shiny? pokemon.sprites.front_shiny : "https://raw.githubusercontent.com/PokeAPI/media/master/logo/pokeapi_256.png"
                    }
                    shinyVirado ={pokemon.sprites.versions["generation-v"]["black-white"].animated.back_shiny?
                    pokemon.sprites.versions["generation-v"]["black-white"].animated.back_shiny
                    : pokemon.sprites.back_shiny ? pokemon.sprites.back_shiny : "https://raw.githubusercontent.com/PokeAPI/media/master/logo/pokeapi_256.png"}
                    
                    tipos={pokemon.types}
                    pegarCor={pegarCor}
                    pegarFundo={pegarFundo}
                    numero={pokemon.order}
                />
            ))}
            <div className="third-column">
                {pokemonsFiltrados.length === 0 ? (
                    <p>Nenhum Pokémon encontrado😢.</p>
                ) : null}
            </div>
            <div>
                {loading ? (
                    <button className="carregarMais" disabled={true}>
                        <div className="lds-facebook">
                            <div></div>
                            <div></div>
                            <div></div>
                        </div>
                    </button>
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

function Card({ nome, imagem,shiny,virado, shinyVirado, tipos , pegarCor, pegarFundo, numero}) {
    let tipoPrincipal = tipos[0].type.name;

    const [imagemAtual, setImagemAtual] = useState(imagem)
    const [pokemonEstaVirado, setPokemonEstaVirado] = useState(false)
    const [pokemonEhShiny, setpokemonEhShiny] = useState(false)
    const [fundoAtual, setFundoAtual] = useState(pegarFundo(tipoPrincipal))
    const [tamanhoDoFundo, setTamanhoDoFundo] = useState("100% 100%")

    const tornarShiny = () =>{
        setpokemonEhShiny(!pokemonEhShiny)
        setImagemAtual(pokemonEstaVirado? (pokemonEhShiny? virado: shinyVirado):(pokemonEhShiny? imagem: shiny))
    }
    const girarPokemon = () =>{
        setPokemonEstaVirado(!pokemonEstaVirado)
        setImagemAtual(pokemonEhShiny? (pokemonEstaVirado ? shiny: shinyVirado ): (pokemonEstaVirado? imagem : virado) )

    }
    const trocarFundo = (tipo) =>{
        setFundoAtual(pegarFundo(tipo))
        setTamanhoDoFundo(tamanhoDoFundo)
        
    }
    
    return (
        <section className="cardPoke" 
        style = {{
            backgroundImage: `url(${fundoAtual})`,
            backgroundSize: tamanhoDoFundo, borderColor : `${pegarCor(tipoPrincipal, true)}`}}>
            <figure>
                <img src={imagemAtual} alt={`Imagem do ${nome}`} />
                <figcaption style={{color: `${pegarCor(tipoPrincipal, true)}`, background: `${pegarCor(tipoPrincipal)}`}}>{nome}</figcaption>
            </figure>
            <section className='tipos'>
                {tipos.map((tipo, index) => (
                      <span
                      key={index}
                      style={{backgroundColor: `${pegarCor(tipo.type.name)}`
                      ,color: `${pegarCor(tipo.type.name, true)}`}}
                      onClick={ () => trocarFundo(tipo.type.name)}
                    >
                     {tipo.type.name}
                    </span>
                ))}
            </section>
            <div className='interaçãoPokemon'>
                <p style={{color: `${pegarCor(tipoPrincipal)}`,
                fontSize: "12px",
                textAlign: "center",
                textShadow: `1px 1px ${pegarCor(tipoPrincipal, true)}`}}>#{numero > 0? numero: "none" }</p>
                <div className='botõesDoPoke'>
                    <button onClick={girarPokemon}>↩️</button>
                    <button onClick={tornarShiny}>⭐</button>
                </div>
            </div>
        </section>
    );
}

export default Main;
