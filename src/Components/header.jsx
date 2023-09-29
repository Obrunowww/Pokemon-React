import React, { useState } from 'react';

function Header({ onSearch }) {
  const [placeholder, setPlaceholder] = useState("Pesquisar");

  const clicado = () => {
    setPlaceholder("Pesquisar Pokémon");
  };

  const nãoClicado = () => {
    setPlaceholder("Pesquisar");
  };

  const pesquisarNome = (event) => {
    const nomePesquisado = event.target.value;
    // Chama a função de pesquisa definida em App.js
    onSearch(nomePesquisado);
  };

  return (
    <header>
      <section className="Pesquisa">
        <figure>
          <img src="https://raw.githubusercontent.com/PokeAPI/media/master/logo/pokeapi_256.png" alt="logoPokemon" />
        </figure>
        <nav>
          <ul>
            <li>Pokedex</li>
            <li>PokedexSword&shild</li>
            <li>PokedexClassica</li>
          </ul>
        </nav>
        <input
          type="text"
          placeholder={placeholder}
          onChange={pesquisarNome}
          onFocus={clicado}
          onBlur={nãoClicado}
        />
      </section>
    </header>
  );
}

export default Header;