
export  const pegarCor = (tipo, escuro = false) => {
    const cores = {
      grass: escuro ? `#000000` : `#8bbe8a`,
      fire: escuro ? `#230500` : `#ffa756`,
      water: escuro ? `#230500` : `#58abf6`,
      bug: escuro ? `#230500` : `#8bd674`,
      normal: escuro ? `#230500` : `#BEC2CF`,
      poison: escuro ? `#000000` : `#9f6e97`,
      electric: escuro ? `#000000` : `#FFD65A`,
      ground: escuro ? `#281506` : `#f78551`,
      fairy: escuro ? `#130D0D` : `#eba8c3`,
      flying: escuro ? `#0B1626` : `#748fc9`,
      fighting: escuro ? `#120306` : `#eb4971`,
      rock: escuro ? `#000000` : `#6f6e78`,
      ice: escuro ? `#0C2528` : `#91d8df`,
      psychic: escuro ? `#481515` : `#ff6568`,
      dragon: escuro ? `#0E1321` : `#7383b9`,
      ghost: escuro ? `#2A2442` : `#8571be`,
      steel: escuro ? `#112330` : `#4c91b2`,
      dark: escuro ? `#D9D9CE` : `#1A1A1A`,
      default: escuro ? `#000000` : `#ffffff`, // Cor padrão se o tipo não for encontrado
    };

    return cores[tipo.toLowerCase()] || cores.default;
  };

export   const pegarFundo = (tipo) => {
    const fundo = {
      grass: "./images/grama.jpg",
      fire: "./images/fogo.jpg",
      water: "./images/agua.jpg",
      bug: "./images/inseto.jpg",
      normal: "./images/normal.jpg",
      poison: "./images/veneno.jpg",
      electric: "./images/eletrico.jpg",
      ground: "./images/terra.jpg",
      fairy: "./images/fada.jpg",
      flying: "./images/voador.jpg",
      fighting: "./images/lutador.jpg",
      rock: "./images/pedra.jpg",
      ice: "./images/gelo.jpg",
      psychic: "./images/psiquico.jpg",
      dragon: "./images/dragão.jpg",
      ghost: "./images/fantasma.jpg",
      steel: "./images/ferro.jpg",
      dark: "./images/dark.jpg",
      default: "./images/normal.jpg"
    };


    return fundo[tipo.toLowerCase()] || cores.default;
  };

