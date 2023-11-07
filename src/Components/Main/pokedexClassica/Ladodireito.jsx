
function LadoDireitoDex({mostrarStatus, pokemonAtual, mostrarAtaques, carregandoAtaques, 
    ataquesDoPoke, evoluções, carregandoEvoluções,linhaEvoDosPoke,setPesquisa,
     reset, pesquisarPokemon, pesquisaDaDex, setPesquisaDaDex, pesquisarPoke,
     setMostrarAtaques,setMostrarStatus,setEvoluções, pesquisa , pegarCor, atualizarEvoluções, pesquisarComEnter  }){

    return(
        <section className="pokedexLadoDireito">

                    <div className="informaçõesAvPokemon">
                        {mostrarStatus ? (

                            <div className="status">
                                <h2 style={{ textAlign: "center" }}>Status</h2>
                                {pokemonAtual.stats.map((status, index) => (
                                    <div className="status" key={index}>
                                        <h3>{status.stat.name}</h3>
                                        <p style={{ display: "flex", height: "24px", justifyContent: "space-around" }}> <span style={{ width: "10%" }}>{status.base_stat}</span>
                                            <div className="barraContainer" style={{ width: "60%", height: "100%", border: "solid 1px" }}>
                                                <div className="barra" style={{ width: `${status.base_stat}px`, height: "100%", backgroundColor: `${pegarCor(pokemonAtual.types[0].type.name)}` }}></div>
                                            </div></p>
                                    </div>
                                ))}</div>
                        ) : mostrarAtaques ? (
                            carregandoAtaques ?
                                (
                                    <div style={{
                                        width: "100%",
                                        height: "100%", display: "flex",
                                        alignItems: "center", justifyContent: "center"
                                    }}> <img className="pokebolaLoading" style={{ width: "100px" }} src="https://i.pinimg.com/originals/09/a6/ae/09a6ae937a6d9ef5cd10d132b59d6f5d.png" alt="" />
                                    </div>
                                )
                                : (
                                    <div>
                                        <h2>Ataques ({ataquesDoPoke.length}) </h2>
                                        <div className="ataquesGrid">
                                            {ataquesDoPoke.map((ataque, index) => (
                                                <div key={index} className="ataque" style={{ backgroundColor: `${pegarCor(ataque.type.name)}`, color: `${pegarCor(ataque.type.name, true)}` }}>
                                                    <h3>
                                                        {ataque.name}
                                                    </h3>
                                                    <div style={{
                                                        width: "100%", height: "40%", display: "grid",
                                                        gridTemplateColumns: "2fr 2fr 1fr"

                                                    }}>
                                                        <p> {ataque.power ? "power: " + ataque.power : "power: 0"}</p>
                                                        <p>Tipo: {ataque.type.name}</p>
                                                        <p style={{ textAlign: "end" }}>pp :{ataque.pp}</p>
                                                    </div>

                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )
                        ) : evoluções ?
                            (carregandoEvoluções ? (
                                <div style={{
                                    width: "100%",
                                    height: "100%", display: "flex",
                                    alignItems: "center", justifyContent: "center"
                                }}> <img className="pokebolaLoading" style={{ width: "100px" }} src="https://i.pinimg.com/originals/09/a6/ae/09a6ae937a6d9ef5cd10d132b59d6f5d.png" alt="" /></div>
                            ) : (

                                <div>
                                    <h1 style={{ paddingTop: "5px", textAlign: "center" }}>Variantes E Evoluções  {(pokemonAtual.name).toUpperCase()}</h1>
                                    <figure className="evoluções">
                                        {linhaEvoDosPoke.map((linha) => (
                                            <div>
                                                <img src={linha.imagem} alt="" />
                                                <figcaption>{linha.name}</figcaption>
                                            </div>
                                        ))}


                                    </figure>
                                </div>

                            )


                            ) : (

                                <div className="InfoBasica">
                                    <h2>Habilidades</h2>
                                    {pokemonAtual.abilities.map((habilidade, index) => (
                                        <p key={index}>{habilidade.ability.name}</p>
                                    ))}
                                    <h2>Base de xp</h2>
                                    <p>
                                        {pokemonAtual.base_experience == null ? "Sem base" : pokemonAtual.base_experience + "xp"}
                                    </p>
                                    <h2>Peso e Altura</h2>
                                    <p>
                                        {(pokemonAtual.weight / 10).toFixed(2)}Kg
                                    </p>
                                    <p>{(pokemonAtual.height / 10).toFixed(2)}m</p>

                                </div>
                            )}
                    </div>
                    <div className="informaçõesAvPokeBotões">

                        <div className="caixaDePesquisa">
                            <button onClick={() => {
                                setPesquisa(!pesquisa)


                            }}></button>
                            {pesquisa && (
                                <>
                                    <input type="text"
                                        onKeyDown={pesquisarComEnter}
                                        onChange={pesquisarPoke} />
                                    <button onClick={() => { reset(), pesquisarPokemon(pesquisaDaDex), setPesquisa(false), setPesquisaDaDex("") }} className="pesquisar">🔍</button>
                                </>
                            )}

                        </div>

                        <div className="ParteDeBaixoLadoDireito" >

                            <button onClick={() => {
                                atualizarEvoluções()
                                setMostrarAtaques(false)
                                setMostrarStatus(false)
                                setEvoluções(!evoluções)

                            }
                            } ></button>
                            <button style={{
                                border: "solid 3px black"
                                , borderRadius: "5px",
                                backgroundColor: "#FB9B05", color: "#557FC6", fontSize: "20px"
                            }}
                                onClick={() => setMostrarStatus(!mostrarStatus)}>Status</button>

                        </div>
                    </div>

                </section>
    )
}
export default LadoDireitoDex