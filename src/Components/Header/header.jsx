import React, { useState } from 'react';

function Header({ onSearch, setPokedex, pokedex }) {
  const [placeholder, setPlaceholder] = useState("Pesquisar");


  const mudarMain = (umaPokedex) => {

    if (umaPokedex === pokedex) {

    } else if (umaPokedex != pokedex && umaPokedex === "Pokedex") {

      setPokedex("Pokedex")

    } else if (umaPokedex != pokedex && umaPokedex === "MeusPokemons") {

      setPokedex("MeusPokemons")

    } else if (umaPokedex != pokedex && umaPokedex === "PokedexClassica") {

      setPokedex("PokedexClassica")

    }


  }

  const clicado = () => {
    setPlaceholder("Pesquisar Pokémon");
  };

  const nãoClicado = () => {
    setPlaceholder("Pesquisar");
  };

  const pesquisarNome = (event) => {
    const nomePesquisado = event.target.value;

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
            <li onClick={() => mudarMain("Pokedex")} style={{ color: `${pokedex === "Pokedex" ? "red" : ""}` }} >Pokedex</li>
            <li onClick={() => mudarMain("MeusPokemons")} style={{ color: `${pokedex === "MeusPokemons" ? "red" : ""}` }}>Meus Pokémons</li>
            <li onClick={() => mudarMain("PokedexClassica")} style={{ color: `${pokedex === "PokedexClassica" ? "red" : ""}` }}>PokedexClassica</li>
          </ul>
        </nav>
        <div className='caixaDeInput'>

          {pokedex != "MeusPokemons" && (<input
            type="text"
            placeholder={placeholder}
            onChange={pesquisarNome}
            onFocus={clicado}
            onBlur={nãoClicado}
          />)}


        </div>
      </section>
    </header>
  );
}

export default Header;