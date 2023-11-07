import { useState } from "react"
import { Navigation, Pagination, EffectCoverflow } from 'swiper/modules';
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import "swiper/css/effect-coverflow"
import "swiper/css/pagination"
import "swiper/css/navigation"

import "./MainS&s.css"



function MainSS({ favoritos, setFavoritos, pegarFundo, pegarCor }) {
    const removerFavorito = (index) => {


        const listaNova = [...favoritos];
        listaNova.splice(index, 1);
        setFavoritos(listaNova);

    }
    return (
        <main>
            <Swiper
                effect={'coverflow'}
                grabCursor={true}
                centeredSlides={true}
                loop={favoritos.length > 2}
                slidesPerView={"auto"}
                coverflowEffect={{
                    rotate: 10,
                    stretch: 0,
                    depth: 230,
                    modifier: 2.5,
                    slideShadows: true,

                }}
                pagination={{ el: ".swiper-pagination", clickable: true, dynamicBullets: true, }}
                navigation={{
                    nextEl: ".swiper-button-next",
                    prevEl: ".swiper-button-prev",
                    clickable: true,

                }}
                modules={[EffectCoverflow, Pagination, Navigation]}

                className="CarrosselDePokemons"  >
                {favoritos.length > 0 ? (
                    favoritos.map((favorito, index) => {

                        return (
                            <SwiperSlide className="slide" key={index}>
                                <SessãoDoFavorito

                                    favoritos={favoritos}
                                    favorito={favorito}
                                    index={index}
                                    pegarFundo={pegarFundo}
                                    pegarCor={pegarCor}
                                    setFavoritos={setFavoritos}
                                    removerFavorito={removerFavorito}
                                />
                            </SwiperSlide>
                        );

                    })) : (
                    <SwiperSlide className="slide">
                        <figure style={{ width: "100%", height: "100%", position: "relative" }}>
                            <img style={{ width: "100%", height: "100%" }} src="https://assetsio.reedpopcdn.com/pikachu_i4gYCqU.jpg?width=1600&height=900&fit=crop&quality=100&format=png&enable=upscale&auto=webp" alt="" />
                            <p style={{ position: "absolute", left: "0", bottom: "0", width: "100%", textAlign: "center", color: "black", fontSize: "40px" }}>Sem pokémons, vá capturar alguns</p>
                        </figure>


                    </SwiperSlide>
                )}

                <div className="slider-sontroler">
                    <div className="swiper-button-prev slider-arrow">
                        <div name="arrow-back-outline"></div>
                    </div>
                    <div className="swiper-button-next slider-arrow">
                        <div name="arrow-forward-outline"> </div>
                    </div>
                    <div className="swiper-pagination"></div>
                </div>

            </Swiper>
        </main>
    )
}

function SessãoDoFavorito({ favoritos, favorito, index, pegarFundo, pegarCor, removerFavorito }) {
    const [tipoPrincipal, setTipoPrincipal] = useState(favorito.tipos[0].type.name)
    const [animação, setAnimação] = useState(false)
    return (
        <div className="conteudoSlider" style={{
            backgroundImage: `url(${pegarFundo(tipoPrincipal)}`,
        }} onMouseEnter={() => setAnimação(true)}
            onMouseLeave={() => setAnimação(false)}
        >
            <img src={favorito.imagem} alt="" />
            <figcaption style={{
                backgroundColor: `${pegarCor(tipoPrincipal)}`,
                color: `${pegarCor(tipoPrincipal, true)}`
            }}>{favorito.apelido? favorito.apelido : favorito.nome}</figcaption>
            <div className="tiposDoFavorito">{favorito.tipos.map((tipo, quantidade) => (
                <div style={{
                    backgroundColor: `${pegarCor(tipo.type.name)}`,
                    color: `${pegarCor(tipo.type.name, true)}`
                }} onClick={() => {
                    setTipoPrincipal(favoritos.length >= 1 ? favorito.tipos[quantidade].type.name : favorito.tipos[0].type.name)
                }}>{tipo.type.name}</div>
            ))}</div>
            <button className="removerFavorito"
                onClick={() => removerFavorito(index)}>❌</button>
            {favorito.shiny && (
                <div className="Éshiny">✨</div>
            )}
            {animação && favorito.shiny && (<div className="animaçãoDeBrilhar">
                <div className="brilhando">✨</div>
                <div className="brilhando">✨</div>
                <div className="brilhando">✨</div>
                <div className="brilhando">✨</div>
                <div className="brilhando">✨</div>
                <div className="brilhando">✨</div>
                <div className="brilhando">✨</div>
                <div className="brilhando">✨</div>
            </div>)}


        </div>

    )
}




export default MainSS