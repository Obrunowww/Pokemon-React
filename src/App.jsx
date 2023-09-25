import React, { useState } from 'react';
import Header from './Components/header';
import Main from './Components/main';
import './App.css';

function App() {
  const [nomePesquisado, setNomePesquisado] = useState('');

  const pesquisarNome = (nome) => {
    // Lógica para lidar com o nome pesquisado, por exemplo, filtrar os Pokémon com base no nome
    setNomePesquisado(nome);
  };

  return (
    <>
      <Header onSearch={pesquisarNome} />
      <Main nomePesquisado={nomePesquisado} />
    </>
  );
}

export default App;

