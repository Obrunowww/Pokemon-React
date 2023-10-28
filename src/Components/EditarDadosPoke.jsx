import { useState } from "react"

function AdicionarPoke({
    adicionarFavorito,
    setAdicionarFavorito,
    favoritos,
    setFavoritos,
    pegarFundo,
    favoritoAtual,
    setFavoritoAtual, }) {
    const [novoNome, setNovoNome] = useState("")
    const [numero, setNumero] = useState(favoritos.findIndex((favorito) => favorito.nome === favoritoAtual))


    const MudarONome = () => {

        const NovaLista = [...favoritos]
        const NovoNomeado = NovaLista.findIndex((favorito) => favorito.nome === favoritoAtual)
        if (favoritoAtual !== "") {
            NovaLista[NovoNomeado].apelido = novoNome
        }

        setFavoritos(NovaLista)
        setFavoritoAtual("")
        setAdicionarFavorito(false)
    }


    return (
        <div style={{ width: "40%", height: "88%" }}>
            {favoritos.length > 0 && favoritos.length <= 6 ?
                (<div className="SessãoDosFavoritos">
                    {favoritos[numero] && favoritos[numero].tipos ? (
                        <figure onClick={() => console.log(favoritos[numero].tipos[0].type.name)}
                            style={{ backgroundImage: `url(${pegarFundo(favoritos[numero].tipos[0].type.name)})` }}>
                            <img src={favoritos[numero].imagem} alt="" />
                            <h1 className="NomeNovo">{novoNome} </h1>
                        </figure>
                    ) : (
                        <div>Informações não disponíveis</div>
                    )}


                    <label htmlFor="Nome">Nome</label>
                    <input type="text"
                        onChange={(e) => setNovoNome(e.target.value)}
                        id="Nome"
                        placeholder="Nome do pokémon"
                        style={{ padding: "3px" }} />
                    <div className="botõesParaEnviar">
                        <button onClick={() => MudarONome()}>Capturar</button>
                        <button onClick={() => setAdicionarFavorito(false)}>Libertar</button>
                    </div>

                    <h1>{favoritoAtual}</h1>
                </div>) : (<div></div>)}
        </div>
    )
}

export default AdicionarPoke