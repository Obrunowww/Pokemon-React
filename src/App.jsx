import React, { useEffect, useState } from 'react';
import AdicionarPoke from './Components/EditarDadosPoke';
import axios from 'axios';
import Header from './Components/header';
import Main from './Components/main';
import MainClassic from './Components/MainClassic';
import MainSS from './Components/MainS&S';
import './App.css';

function App() {
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

  const pegarFundo = (tipo) => {
    const fundo = {
      grass: "./images/grama.jpg",
      fire: "./images/fogo.jpg",
      water: "./images/agua.jpg",
      bug: "./images/inseto.jpg",
      normal: "./images/normal.jpg",
      poison: "./images/veneno.jpg",
      electric: "./images/eletrico.jpg",
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
    };


    return fundo[tipo.toLowerCase()] || cores.default;
  };
  const [adicionarFavorito, setAdicionarFavorito] = useState(false)
  const [erro, setErro] = useState(false)
  const [nomePesquisado, setNomePesquisado] = useState('');
  const [Pokemons, setPokemons] = useState([])
  const [loading, setLoading] = useState(true);
  const [pokedex, setPokedex] = useState("Pokedex");
  const [favoritos, setFavoritos] = useState(() => {
    const favoritosString = localStorage.getItem("favoritos");
    if (favoritosString) {
      return JSON.parse(favoritosString)
    }
    return []
  })
  const [favoritoAtual, setFavoritoAtual] = useState("")
  const [main, setMain] = useState(<Main nomePesquisado={nomePesquisado} pokemons={Pokemons} loading={loading}
    favoritos={favoritos} setFavoritos={setFavoritos} pegarFundo={pegarFundo} pegarCor={pegarCor} setErro={setErro}
    adicionarFavorito={adicionarFavorito} setAdicionarFavorito={setAdicionarFavorito} favoritoAtual={favoritoAtual} setFavoritoAtual={setFavoritoAtual}
  />)


  useEffect(() => {
    pegarTodosPokemons();
  }, []);


  useEffect(() => {
    const favoritosString = JSON.stringify(favoritos);
    localStorage.setItem('favoritos', favoritosString);
  }, [favoritos]);

  const pegarTodosPokemons = async () => {
    try {
      const resposta = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=1292&offset=0");
      const todosPokemons = resposta.data.results;

      const detalhesPokemons = await Promise.all(todosPokemons.map(async (pokemon) => {
        const detalhesResposta = await axios.get(pokemon.url);
        const pokedata = detalhesResposta.data;
        return pokedata;
      }));

      setPokemons(detalhesPokemons);
    } catch (erro) {
      console.error("Erro em buscar todos Pokemons", erro);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    switch (pokedex) {
      case "Pokedex":
        setMain(<Main nomePesquisado={nomePesquisado} pokemons={Pokemons} loading={loading} favoritos={favoritos} setFavoritos={setFavoritos} pegarFundo={pegarFundo}
          pegarCor={pegarCor} setErro={setErro} adicionarFavorito={adicionarFavorito} setAdicionarFavorito={setAdicionarFavorito}
          favoritoAtual={favoritoAtual} setFavoritoAtual={setFavoritoAtual} />)

        break;
      case "MeusPokemons":
        setMain(<MainSS nomePesquisado={nomePesquisado} favoritos={favoritos} setFavoritos={setFavoritos} pegarFundo={pegarFundo}
          pegarCor={pegarCor} />)

        break;
      case "PokedexClassica":
        setMain(<MainClassic nomePesquisado={nomePesquisado} pokemons={Pokemons} loading={loading} pegarFundo={pegarFundo}
          pegarCor={pegarCor} />)

        break;

      default:
        setMain(<MainClassic nomePesquisado={nomePesquisado} pokemons={Pokemons} pegarFundo={pegarFundo}
          pegarCor={pegarCor} />)
        break;
    }

  }, [pokedex, Pokemons, nomePesquisado, favoritos])


  const pesquisarNome = (nome) => {
    // Lógica para lidar com o nome pesquisado, por exemplo, filtrar os Pokémon com base no nome
    setNomePesquisado(nome);
  };




  return (
    <>
      <Header onSearch={pesquisarNome} setPokedex={setPokedex} pokedex={pokedex} />
      {main}
      {erro && (<div className='MostrarOErro'>
        <p>Você só pode ter 6 pokémons no seu time</p>
        <div className='barraContainer'>
          <div className='barra'></div>
        </div>
      </div>)}

      {adicionarFavorito && favoritos.length <=6 && (<AdicionarPoke
        adicionarFavorito={adicionarFavorito}
        setAdicionarFavorito={setAdicionarFavorito}
        favoritos={favoritos} 
        setFavoritos={setFavoritos}
        pegarFundo={pegarFundo}
         favoritoAtual={favoritoAtual} 
        setFavoritoAtual={setFavoritoAtual}></AdicionarPoke>)}
    </>
  );
}

export default App;

