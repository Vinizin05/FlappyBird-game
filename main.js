let frames = 0;
const somgame = new Audio();
somgame.src = './efeitos/hit.wav'

const sprites = new Image();
sprites.src = './sprites.png'

const canvas = document.querySelector("canvas");
const contexto = canvas.getContext("2d");

// [planos de fundo]
const planodefundo = {
  spriteX: 391,
  spriteY: 0,
  largura: 275,
  altura: 204,
  x: 0,
  y: canvas.height - 204,
  desenha() {
    contexto.fillStyle = "#70c5ce";
    contexto.fillRect(0, 0, canvas.width, canvas.height);

    contexto.drawImage(
      sprites,
      planodefundo.spriteX,
      planodefundo.spriteY,
      planodefundo.largura,
      planodefundo.altura,
      planodefundo.x,
      planodefundo.y,
      planodefundo.largura,
      planodefundo.altura
    );

    contexto.drawImage(
      sprites,
      planodefundo.spriteX,
      planodefundo.spriteY,
      planodefundo.largura,
      planodefundo.altura,
      planodefundo.x + planodefundo.y,
      planodefundo.y,
      planodefundo.largura,
      planodefundo.altura
    );
  },
};

// (chao)
function criachao(){
  const chao = {
    spriteX: 0,
    spriteY: 610,
    largura: 224,
    altura: 112,
    x: 0,
    y: canvas.height - 112,
    atualiza(){
      const movimentaochao = 1;
      const repeat = chao.largura / 2;
      const movimentacao = chao.x - movimentaochao
      
      // console.log('[chao.x]', chao.x);
      // console.log('[repeat]', repeat);
      // console.log('[movimentacao]', movimentacao % repeat)

      chao.x = movimentacao % repeat;
    },
    desenha() {
      contexto.drawImage(
        sprites,
        chao.spriteX,
        chao.spriteY,
        chao.largura,
        chao.altura,
        chao.x,
        chao.y,
        chao.largura,
        chao.altura
      );
  
      contexto.drawImage(
        sprites,
        chao.spriteX,
        chao.spriteY,
        chao.largura,
        chao.altura,
        chao.x + chao.largura,
        chao.y,
        chao.largura,
        chao.altura
      );
    },
  };
  return chao;
}

function fazColisao(flappybird, chao) {
  const flappybirdY = flappybird.y + flappybird.altura;
  const chaoY = chao.y;

  if (flappybirdY >= chaoY) {
    return true;
  }

  return false;
}

function criaFlappyBird() {
  const flappybird = {
    spriteX: 0,
    spriteY: 0,
    largura: 33,
    altura: 24,
    x: 10,
    y: 50,
    pulo: 4.6,
    pula() {
      flappybird.velocidade = -flappybird.pulo;
    },
    gravidade: 0.26,
    velocidade: 0,
    atualiza() {
      if (fazColisao(flappybird, globais.chao)) {
        console.log("faz colisao");
        somgame.play();

        setTimeout(() => {
          mudaParaTela(telas.inicio);
        }, 500);

        return;
      }

      flappybird.velocidade = flappybird.velocidade + flappybird.gravidade;
      flappybird.y = flappybird.y + flappybird.velocidade;
    },
    movimentos: [
      { spriteX: 0, spriteY: 0, },  //asa pra cima
      { spriteX: 0, spriteY: 26, }, //asa no meio
      { spriteX: 0, spriteY: 52, }, //asa pra bx
    ],
    frameAtual: 0,
    atualizaframeatual() {
      const intervaloframe = 10;
      const passouintervalo = frames % intervaloframe === 0;
      
      if(passouintervalo){
      const baseDoincremento = 1;
      const incremento = baseDoincremento + flappybird.frameAtual;
      const baseRepeticao = flappybird.movimentos.length;
      flappybird.frameAtual = incremento % baseRepeticao
    }
      // console.log('[incremento]', incremento)
      // console.log('[baseRepeticao]', baseRepeticao)
      // console.log('[frame]', incremento % baseRepeticao)

    },
    desenha() {
      flappybird.atualizaframeatual();
      const { spriteX, spriteY } = flappybird.movimentos[flappybird.frameAtual];

      contexto.drawImage(
        sprites,
        spriteX, spriteY,
        flappybird.largura, flappybird.altura,
        flappybird.x, flappybird.y,
        flappybird.largura, flappybird.altura
      );
    },
  };
  return flappybird;
}

// [mensagem de inicio]
const messageGetReady = {
  sX: 134,
  sY: 0,
  w: 174,
  h: 152,
  x: canvas.width / 2 - 174 / 2,
  y: 50,
  desenha() {
    contexto.drawImage(
      sprites,
      messageGetReady.sX,
      messageGetReady.sY,
      messageGetReady.w,
      messageGetReady.h,
      messageGetReady.x,
      messageGetReady.y,
      messageGetReady.w,
      messageGetReady.h
    );
  },
};
function criacanos() {
  const canos = {
    largura: 52,
    altura: 400,
    chao: {
      spriteX: 0,
      spriteY: 169,
    },
    ceu: {
      spriteX: 52,
      spriteY: 169,
    },
    espaco: 80,
    desenha() {
      canos.pares.forEach(function(par) {
      const yRandom = par.y;
      const espacamentodoscanos = 90;

      const canoCeuX = par.x;
      const canoCeuY = yRandom ;

        //[cano do céu]
        contexto.drawImage(
          sprites,
          canos.ceu.spriteX, canos.ceu.spriteY,
          canos.largura, canos.altura,
          canoCeuX, canoCeuY,
          canos.largura, canos.altura,
        )
        //[cano do chao]
        const canoChaoX = par.x;
        const canoChaoY = canos.altura + espacamentodoscanos + yRandom;
        contexto.drawImage(
          sprites,
          canos.chao.spriteX, canos.chao.spriteY,
          canos.largura, canos.altura,
          canoChaoX, canoChaoY,
          canos.largura, canos.altura,
        )
          
          par.canoCeu = {
            x: canoCeuX,
            y: canos.altura + canoCeuY,
          }
          par.canoChao = {
            x: canoChaoX,
            y: canoChaoY,
          }

      })
    }, 
    temColisaoComOcano(par) {
      const cabecadoFlappy = globais.flappybird.y;
      const pedoFleppy = globais.flappybird + globais.flappybird.altura;

      if(globais.flappybird.x >= par.x) {


        if(cabecadoFlappy <= par.canoCeu.y){
          return true;
        }

        if(pedoFleppy >= par.canoChaoY){
          return true;
        }


      }


      return false;
    },

    pares:[],
    atualiza() {
      const passou100frames = frames % 100 === 0;
      if(passou100frames) {
         canos.pares.push({
           x: canvas.width,
           y: -150 * (Math.random() + 1)
         });
      }

      canos.pares.forEach(function(par) {
        par.x = par.x - 2;

        if(canos.temColisaoComOcano(par)) {
           console.log('voce perdeu')
           mudaParaTela(telas.inicio);
        }

        if(par.x + canos.largura <= 0 ){
          canos.pares.shift(); 
        }
      });

    }
  }
  return canos;
}


//
// [telas]
//
const globais = {};
let telaAtiva = {};
function mudaParaTela(novaTela) {
  telaAtiva = novaTela;

  if (telaAtiva.inicializa) {
    telaAtiva.inicializa();
  }
}

const telas = {
  inicio: {
    inicializa() {
      globais.flappybird = criaFlappyBird();
      globais.chao = criachao();
      globais.canos = criacanos();
    },
    desenha() {
      planodefundo.desenha();
      globais.flappybird.desenha();
      globais.chao.desenha();
      messageGetReady.desenha();
    },
    click() {
      mudaParaTela(telas.jogo);
    },
    atualiza() {
      globais.chao.atualiza();
    },
  },
};

telas.jogo = {
  desenha() {
    planodefundo.desenha();
    globais.canos.desenha();
    globais.chao.desenha();
    globais.flappybird.desenha();
  },
  click() {
    globais.flappybird.pula();
  },
  atualiza() {
    globais.canos.atualiza();
    globais.chao.atualiza();
    globais.flappybird.atualiza();
  },
};

function loop() {
  telaAtiva.desenha();
  telaAtiva.atualiza();

  frames = frames + 1;
  requestAnimationFrame(loop);
}

window.addEventListener("click", function () {
  if (telaAtiva.click) {
    telaAtiva.click();
  }
});

mudaParaTela(telas.inicio);
loop();
