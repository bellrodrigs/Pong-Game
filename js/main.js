var canvas = document.getElementById("Mcanvas");
var ctx = canvas.getContext("2d"); //Informando que tudo será em 2d

$(document).ready(function(){
 setInterval(desenha,15);
});

var teclas = {};
var bola = {
    x: canvas.width / 2 - 10,
    y: canvas.height / 2 - 10,
    altura: 20,
    largura: 20,
    dirx: -1,
    diry: 1,
    mod: 0,
    velocidade: 1
};

var esquerda = {
    x: 10,
    y: canvas.height / 2 - 60,
    altura: 120,
    largura: 20,
    score: 0,
    velocidade: 10
};

var direita = {
    x: 570,
    y: canvas.height / 2 - 60,
    altura: 120,
    largura: 20,
    score: 0,
    velocidade: 10
};

document.addEventListener("keydown", function(e){
    teclas[e.keyCode] = true;
    //alert(e.keyCode);
},false);

document.addEventListener("keyup", function(e){
    delete teclas[e.keyCode];
},false);

function moveBlocos(){
    if(87 in teclas && esquerda.y > 0){
        esquerda.y -= esquerda.velocidade;
    }
    else if(83 in teclas && esquerda.y + esquerda.altura < canvas.height){
        esquerda.y += esquerda.velocidade;
    }
    else if(38 in teclas && direita.y >0){
        direita.y -= direita.velocidade;
    }
    else if(40 in teclas && direita.y + direita.altura < canvas.height){
        direita.y += direita.velocidade;
    }
}

function moveBola(){
    if(bola.y + bola.altura >= esquerda.y && bola.y <= esquerda.y + esquerda.altura
       && bola.x <= esquerda.x + esquerda.largura){
                bola.dirx = 1;
                bola.mod += 0.2;
    }
    else if(bola.y + bola.altura >= direita.y && bola.y <= direita.y + direita.altura
            && bola.x + bola.largura >= direita.x){
                bola.dirx = -1;
                bola.mod += 0.2;

    }
    if(bola.y <= 0){
        bola.diry = 1;
    }
    else if(bola.y + bola.altura >= canvas.height){
        bola.diry = -1;
    }
    bola.x += (bola.velocidade + bola.mod) * bola.dirx;
    bola.y += (bola.velocidade + bola.mod) * bola.diry;

    if(bola.x < esquerda.x + esquerda.largura - 15){
        novoJogo("Player 2");
    }
    else if(bola.x + bola.largura > direita.x + 15){
        novoJogo("Player 1");
    }
}
    

function novoJogo(vencedor){
    if(vencedor == "Player 1"){
        esquerda.score++;
    }else{
        direita.score++;
    }
    esquerda.y = canvas.height / 2 - esquerda.altura / 2;
    direita.y = esquerda.y;
    bola.y = canvas.height / 2 - bola.altura / 2;
    bola.x = canvas.width / 2 - bola.largura / 2;s
    bola.mod = 0;
}

function desenha(){

    ctx.clearRect(0,0, canvas.width, canvas.height);
    moveBlocos();
    moveBola();

    ctx.fillStyle = "white";
    ctx.fillRect(esquerda.x, esquerda.y, esquerda.largura, esquerda.altura);
    ctx.fillRect(direita.x, direita.y, direita.largura, direita.altura);
    ctx.fillRect(bola.x, bola.y, bola.largura, bola.altura);

    ctx.font = "20px Arial";
    ctx.fillText("Player 1: " + esquerda.score, 50, 30);
    ctx.fillText("Player 2: " + direita.score, canvas.width - 160, 30);
}

//ctx.fillStyle = "white";
//ctx.fillRect(100,190,10,150);

