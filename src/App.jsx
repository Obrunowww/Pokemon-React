import React, { useEffect, useState } from 'react';
import AdicionarPoke from './Components/Main/pokedex/EditarDadosPoke';
import axios from 'axios';
import Header from './Components/Header/header';
import Main from './Components/Main/pokedex/main';
import MainClassic from './Components/Main/pokedexClassica/MainClassic';
import MainSS from './Components/Main/meusPokemons/MainS&S';
import { pegarCor,pegarFundo } from './appLogica';
import './App.css';

function App() {

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
    pegarTodosPokemons();
  }, []);


  useEffect(() => {
    const favoritosString = JSON.stringify(favoritos);
    localStorage.setItem('favoritos', favoritosString);
  }, [favoritos]);


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
        pegarCor = {pegarCor}
         favoritoAtual={favoritoAtual} 
        setFavoritoAtual={setFavoritoAtual}></AdicionarPoke>)}
    </>
  );
}

export default App;

