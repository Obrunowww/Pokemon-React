

function LadoEsquerdoDex({ pegarCor, MostrarPokemon, pokemonAtual,
    imagemDoPokemonAtual, pokemonAnterior, proximoPokemon, setMostrarStatus,
    setMostrarAtaques, mostrarAtaques, pokemonEstaVirado, setPokemonEstaVirado, pokemonEhShiny, setpokemonEhShiny, setEvoluções, fundoAtual, trocarFundo }) {
    return (
        <section className="pokedexLadoEsquerdo">
            <div className="botãoDeCima">
                <button className="mudançaDeCor" style={{

                    backgroundColor: `${pegarCor(pokemonAtual.types[0].type.name)}`
                }} onClick={() => MostrarPokemon()
                }></button>
            </div>

            <div className="imagemPoke">
                <div className="esquerdaDaImagem" style={{ color: `${pegarCor(pokemonAtual.types[0].type.name)}` }}>
                    <h2>Nome</h2>
                    <p style={{ textShadow: `1px 1px 10px ${pegarCor(pokemonAtual.types[0].type.name)}` }}>{(pokemonAtual.name).toUpperCase()}</p>
                    <h2>Número</h2>
                    <p style={{ textShadow: `1px 1px 10px ${pegarCor(pokemonAtual.types[0].type.name)}` }} >#{pokemonAtual.order > 0 ? pokemonAtual.order : "none"}</p>
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
                        <button onClick={() => { setMostrarStatus(false); setMostrarAtaques(!mostrarAtaques) }}></button>
                        <button onClick={() => setPokemonEstaVirado(!pokemonEstaVirado)}></button>
                        <button onClick={() => setpokemonEhShiny(!pokemonEhShiny)}></button>
                    </div>
                    <div className="interaçãoBotãoBaixo">
                        <button onClick={() => {
                            setMostrarStatus(false)
                            setMostrarAtaques(false)
                            setEvoluções(false)
                        }
                        }></button>
                    </div>

                </div>
            </div>
        </section>
    )
}
export default LadoEsquerdoDex