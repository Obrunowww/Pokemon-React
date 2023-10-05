import React, { useState } from 'react';

function Header({ onSearch, setPokedex, pokedex }) {
  const [placeholder, setPlaceholder] = useState("Pesquisar");
 

  const mudarMain = (umaPokedex) =>{
    console.log(`Foi clicado a ${umaPokedex}`)
    if(umaPokedex ===pokedex){
      console.log('Sem mudanças')
    }else if(umaPokedex !=pokedex && umaPokedex === "Pokedex"){
      
      setPokedex("Pokedex")
      // codigo aqui...
    }else if(umaPokedex !=pokedex && umaPokedex === "PokedexSword&Shild"){
     
      setPokedex("PokedexSword&Shild")
      // codigo aqui...
    }else if(umaPokedex !=pokedex && umaPokedex === "PokedexClassica"){
      
      setPokedex("PokedexClassica")
      // codigo aqui...
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
            <li onClick={() =>mudarMain("Pokedex")} style={{color: `${pokedex === "Pokedex"? "red": ""}`}} >Pokedex</li>
            <li onClick={() =>mudarMain("PokedexSword&Shild")} style={{color: `${pokedex === "PokedexSword&Shild"? "red": ""}`}}>PokedexSword&Shild</li>
            <li onClick={() =>mudarMain("PokedexClassica")} style={{color: `${pokedex === "PokedexClassica"? "red": ""}`}}>PokedexClassica</li>
          </ul>
        </nav>
        <div className='caixaDeInput'>

        <input
          type="text"
          placeholder={placeholder}
          onChange={pesquisarNome}
          onFocus={clicado}
          onBlur={nãoClicado}
        />

        </div>
      </section>
    </header>
  );
}

export default Header;