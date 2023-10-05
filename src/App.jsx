import React, { useEffect ,useState } from 'react';

import axios from 'axios';
import Header from './Components/header';
import Main from './Components/main';
import MainClassic from './Components/MainClassic';
import MainSS from './Components/MainS&S';
import './App.css';

function App() {
  const [nomePesquisado, setNomePesquisado] = useState('');
  const [Pokemons, setPokemons] = useState([])
  const [loading, setLoading] = useState(true);
  const[pokedex, setPokedex] = useState("Pokedex");
  const[main, setMain] = useState(<Main nomePesquisado={nomePesquisado} pokemons={Pokemons} loading={loading} />)
  


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

        setPokemons(detalhesPokemons);
    } catch (erro) {
        console.error("Erro em buscar todos Pokemons", erro);
    } finally {
        setLoading(false);
    }
};

useEffect(()=>{
  switch (pokedex) {
    case "Pokedex":
      setMain(<Main nomePesquisado={nomePesquisado} pokemons={Pokemons} loading={loading} />)
      
      break;
      case "PokedexSword&Shild":
        setMain(<MainSS nomePesquisado={nomePesquisado} pokemons={Pokemons} loading={loading} />)
        
        break;
      case "PokedexClassica":
        setMain(<MainClassic nomePesquisado={nomePesquisado} pokemons={Pokemons} loading={loading} />)
        
        break;
  
    default:
      setMain(<MainClassic nomePesquisado={nomePesquisado} pokemons={Pokemons} loading={loading} />)
      break;
  }
  
}, [pokedex])


  const pesquisarNome = (nome) => {
    // Lógica para lidar com o nome pesquisado, por exemplo, filtrar os Pokémon com base no nome
    setNomePesquisado(nome);
  };

  return (
    <>
      <Header onSearch={pesquisarNome} setPokedex={setPokedex} pokedex={pokedex} />
      {main}
    </>
  );
}

export default App;

