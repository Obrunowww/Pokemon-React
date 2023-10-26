import { useState } from "react";


function Card({ nome, imagem, shiny, virado, shinyVirado, tipos, pegarCor, pegarFundo, numero, favoritos, setFavoritos , setErro, adicionarFavorito , setAdicionarFavorito, favoritoAtual , setFavoritoAtual}) {
    let tipoPrincipal = tipos[0].type.name;

    const [imagemAtual, setImagemAtual] = useState(imagem)
    const [pokemonEstaVirado, setPokemonEstaVirado] = useState(false)
    const [pokemonEhShiny, setpokemonEhShiny] = useState(false)
    const [fundoAtual, setFundoAtual] = useState(pegarFundo(tipoPrincipal))
   



    const tornarShiny = () => {
        setpokemonEhShiny(!pokemonEhShiny)
        setImagemAtual(pokemonEstaVirado ? (pokemonEhShiny ? virado : shinyVirado) : (pokemonEhShiny ? imagem : shiny))
    }
    const girarPokemon = () => {
        setPokemonEstaVirado(!pokemonEstaVirado)
        setImagemAtual(pokemonEhShiny ? (pokemonEstaVirado ? shiny : shinyVirado) : (pokemonEstaVirado ? imagem : virado))

    }
    const trocarFundo = (tipo) => {
        setFundoAtual(pegarFundo(tipo))

    }

    const VerificarFavoritos = () => {

        

        const listaNova = [...favoritos];
        const PokemonFavoritado = { nome: nome,
            imagem: pokemonEhShiny? shiny : imagem,
            tipos: tipos,
            shiny: pokemonEhShiny? true: false
         };

        const FavoritadoAtual = listaNova.findIndex((favorito) => favorito.nome === PokemonFavoritado.nome);

        if (FavoritadoAtual !== -1) {
           
            listaNova.splice(FavoritadoAtual, 1);
            setFavoritos(listaNova);
        } else if (listaNova.length < 6) {
            listaNova.push(PokemonFavoritado); 
            setFavoritos(listaNova);
        }else if( listaNova.length){
            setErro(true)
            setTimeout(() => {
                setErro(false)
            }, 3000);

        }
    }

    return (
        <section className="cardPoke"
            style={{
                backgroundImage: `url(${fundoAtual})`,
                borderColor: `${pegarCor(tipoPrincipal, true)}`
            }}>
            <figure>
                <img src={imagemAtual} alt={`Imagem do ${nome}`} />
                <figcaption style={{
                    color: `${pegarCor(tipoPrincipal, true)}`
                    , background: `${pegarCor(tipoPrincipal)}`
                }}>{nome}</figcaption>
            </figure>
            <section className='tipos'>
                {tipos.map((tipo, index) => (
                    <span
                        key={index}
                        style={{
                            backgroundColor: `${pegarCor(tipo.type.name)}`
                            , color: `${pegarCor(tipo.type.name, true)}`
                        }}
                        onClick={() => trocarFundo(tipo.type.name)}
                    >
                        {tipo.type.name}
                    </span>
                ))}
            </section>
            <div className='interaçãoPokemon'>
                <p style={{
                    color: `${pegarCor(tipoPrincipal)}`,
                    fontSize: "12px",
                    textAlign: "center",
                    textShadow: `1px 1px ${pegarCor(tipoPrincipal, true)}`
                }}>#{numero > 0 ? numero : "none"}</p>
                <div className='botõesDoPoke'>
                    <button onClick={girarPokemon}>↩️</button>
                    <button onClick={tornarShiny}>⭐</button>
                </div>
            </div>
            <div className='favoritar'>
                <button onClick={() => {
                    if(favoritos.some((fav) => fav.nome === nome)){
                        setAdicionarFavorito(false) 
                    }else{
                        setAdicionarFavorito(true)
                    }
                    VerificarFavoritos()
                    setFavoritoAtual(nome)
                    

                }}>
                    {favoritos.some((fav) => fav.nome === nome) ? "❤️" : "🖤"}
                </button>
            </div>
                
        </section>
    );
}
export default Card