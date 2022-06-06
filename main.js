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

function loop() {
  planodefundo.desenha();
  chao.desenha();
  flappybird.desenha();

  requestAnimationFrame(loop);
}

loop();
