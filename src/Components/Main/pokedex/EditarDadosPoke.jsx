import { useState } from "react"

function AdicionarPoke({
    adicionarFavorito,
    setAdicionarFavorito,
    favoritos,
    setFavoritos,
    pegarFundo,
    pegarCor,
    favoritoAtual,
    setFavoritoAtual, }) {
    const [novoNome, setNovoNome] = useState("")
    const [numero, setNumero] = useState(favoritos.findIndex((favorito) => favorito.nome === favoritoAtual))
    const [animação, setAnimação] = useState("MostrarInfoFav")


    const MudarONome = () => {

        const NovaLista = [...favoritos]
        const NovoNomeado = NovaLista.findIndex((favorito) => favorito.nome === favoritoAtual)
        if (favoritoAtual !== "") {
            NovaLista[NovoNomeado].apelido = novoNome
        }

        setAnimação("FecharFvoritos")
        setTimeout(()=>{
            setFavoritos(NovaLista)
            setFavoritoAtual("")
            setAdicionarFavorito(false)
            setAnimação("MostrarInfoFav")
        },1500)
    }
    const Liberar = () =>{
        const NovaLista = [...favoritos]
        const PokemonAbandonado = NovaLista.findIndex((favorito) => favorito.nome === favoritoAtual)

        setAnimação("FecharFvoritos")
        setTimeout(() => {
            
            NovaLista.splice(PokemonAbandonado, 1)
            setFavoritos(NovaLista)
            setAdicionarFavorito(false)
            setAnimação("MostrarInfoFav")
        }, 1500);

    }


    return (
        <div>
            {favoritos.length > 0 && favoritos.length <= 6 &&
                (<div className="SessãoDosFavoritos" style={{animation: ` ${animação} ease 2s`}}>
                    {favoritos[numero] && favoritos[numero].tipos ? (
                        <figure onClick={() => console.log(favoritos[numero].tipos[0].type.name)}
                            style={{ backgroundImage: `url(${pegarFundo(favoritos[numero].tipos[0].type.name)})` }}>
                            <img src={favoritos[numero].imagem} alt="" />
                            <h1 style={{color: `${pegarCor(favoritos[numero].tipos[0].type.name)}`}} className="NomeNovo">{novoNome} </h1>
                        </figure>
                    ) : (
                        <div>Informações não disponíveis</div>
                    )}


                    <label htmlFor="Nome">Nome: <span style={{textTransform: "capitalize",color: `${pegarCor(favoritos[numero].tipos[0].type.name)}`}}>{favoritoAtual}</span> </label>
                    <input type="text"
                        onChange={(e) => setNovoNome(e.target.value)}
                        id="Nome"
                        placeholder="Apelido do pokémon"
                        style={{ padding: "3px" }}
                        maxLength={10} />
                    <div className="botõesParaEnviar">
                        <button onClick={() => MudarONome()}>Guardar</button>
                        <button onClick={() => Liberar()}>Libertar</button>
                    </div>
                    

                </div>)}
        </div>
    )
}

export default AdicionarPoke