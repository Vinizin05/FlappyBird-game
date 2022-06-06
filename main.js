const sprites = new Image();
sprites.src = "./sprites.png";

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
const chao = {
  spriteX: 0,
  spriteY: 610,
  largura: 224,
  altura: 112,
  x: 0,
  y: canvas.height - 112,
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

const flappybird = {
  spriteX: 0,
  spriteY: 0,
  largura: 33,
  altura: 24,
  x: 10,
  y: 50,
  gravidade: 0.26,
  velocidade: 0,
  atualiza() {
    flappybird.velocidade = flappybird.velocidade + flappybird.gravidade;
    flappybird.y = flappybird.y + flappybird.velocidade;
  },
  desenha() {
    contexto.drawImage(
      sprites,
      flappybird.spriteX,
      flappybird.spriteY,
      flappybird.largura,
      flappybird.altura,
      flappybird.x,
      flappybird.y,
      flappybird.largura,
      flappybird.altura
    );
  },
};

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

//
// [telas]
//

let telaAtiva = {};
function mudaParaTela(novaTela) {
  telaAtiva = novaTela;
}

const telas = {
  inicio: {
    desenha() {
      planodefundo.desenha();
      chao.desenha();
      flappybird.desenha();
      messageGetReady.desenha();
    },
    click() {
      mudaParaTela(telas.jogo);
    },
    atualiza() {},
  },
};

telas.jogo = {
  desenha() {
    planodefundo.desenha();
    chao.desenha();
    flappybird.desenha();
  },
  atualiza() {
    flappybird.atualiza();
  },
};

function loop() {
  telaAtiva.desenha();
  telaAtiva.atualiza();

  requestAnimationFrame(loop);
}

window.addEventListener("click", function () {
  if (telaAtiva.click) {
    telaAtiva.click();
  }
});

mudaParaTela(telas.inicio);
loop();
