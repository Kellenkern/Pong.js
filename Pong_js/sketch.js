// Variaveis da bolinha
let xB = 300;
let yB = 200;
let dB = 18;
let rB = dB/2;
let vXB = 6;
let vYB = 6;

//Variaveis da raquete
let xR = 1;
let xR2 = 590;
let yR = 150;
let yR2 = 150;
let cR = 10;
let hR = 90;
let vR2;
let colidiu = false;
let chanceDeErrar = 0;

//Variaveis Placar
let p1=0;
let p2=0;

//sons do jogo
let raquetada;
let ponto;
let trilha;

function preload(){
  raquetada = loadSound("raquetada.mp3");
  ponto = loadSound("ponto.mp3");
  trilha = loadSound("trilha.mp3");
}

function setup() {
  createCanvas(600, 400);
  trilha.loop()
}
  
function draw() {
  background(0);
  mostraBolinha();
  moveBolinha();
  colisaoBolinha();
  mostraRaquete(xR,yR);
  mostraRaquete(xR2,yR2);
  moveRaquete1();
  moveRaquete2();
  colisaoRaqueteB(xR,yR);
  colisaoRaqueteB(xR2,yR2);
  placar();
  marcaPonto();
  bolinhaNaoFicaPresa();
}

function mostraBolinha(){
    circle (xB,yB,dB)
}
function moveBolinha(){
    xB+=vXB;
    yB+=vYB;
}
function colisaoBolinha(){
    if((xB+rB)>width||xB<(0+rB)){
    vXB*=-1;
  }
  if((yB+rB)>height||yB<(0+rB)){
    vYB*=-1;
  }
}
function mostraRaquete(x,y){
    rect(x,y,cR,hR);
}
function moveRaquete1(){
  if(keyIsDown(UP_ARROW)){
    yR-=10;
  }
  if(keyIsDown(DOWN_ARROW)){
    yR+=10;
  }
}
/***function moveRaquete2(){
  if(keyIsDown(87)){
    yR2-=10;
  }
  if(keyIsDown(83)){
    yR2+=10;
  }
}***/

function moveRaquete2(){
  vY2=yB-yR2-cR/2-30
  yR2+=vY2+chanceDeErrar
  calculaChanceDeErrar();
}

function calculaChanceDeErrar() {
  if (p2 >= p1) {
    chanceDeErrar += 1
    if (chanceDeErrar >= 39){
    chanceDeErrar = 40
    }
  } else {
    chanceDeErrar -= 1
    if (chanceDeErrar <= 35){
    chanceDeErrar = 35
    }
  }
}
function colisaoRaquete(){
  if(xB-rB<xR+cR && yB-rB<yR+hR && yB+rB>yR){
    vXB*=-1;
    raquetada.play();
  }
}
function colisaoRaqueteB(x,y){
  colidiu = collideRectCircle(x,y,cR,hR,xB,yB,rB);
  if (colidiu){
    vXB*=-1;
    raquetada.play();
  }
} 
function placar(){
  stroke(255);
  textAlign(CENTER);
  textSize(16);
  fill(color(255,140,0))
  rect(130,10,40,20)
  fill(255);
  text(p1,150,26);
  fill(color(255,140,0))
  rect(430,10,40,20)
  fill(255);
  text(p2,450,26);
}

function marcaPonto(){
  if(xB>590){
    p1+=1;
    ponto.play();
  }
  if(xB<10){
    p2+=1
    ponto.play();
  }
}
function bolinhaNaoFicaPresa(){
    if (xB + rB < 0){
    console.log('bolinha ficou presa');
    xB = 300;
    }
}
