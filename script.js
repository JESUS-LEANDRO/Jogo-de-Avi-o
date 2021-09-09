var diryJ;
var dirxJ;
var jog;
var velJ;
var pjx;
var pjy;
var tamtelaW;
var tamTelaH;
var jogo;
var frames;
var velT;
var contBombas;
var painelContBombas;
var bombasTotal;
var velB;
var vidaPlaneta;
var tmpCriaBomba;
var container;
var vidaPlaneta;

function teclaUp1(x) {
    if ((x == 38) || (x == 40)) {
        diryJ = 0;
        jog.src = 'images/aviao1.png';
    }
}

function teclaUp2(x) {
    if ((x == 37) || (x == 39)) {
        dirxJ = 0;
        jog.src = 'images/aviao1.png';
    }
}
function teclaDw1(x) {
    if (x == 38) {//Cima
        diryJ = -1;
        jog.src = 'images/aviao5.png';

    }
}
function teclaDw2(x) {
    if (x == 37) {//Esquerda
        dirxJ = -1
        jog.src = 'images/aviao3.png';
    }
}
function teclaDw3(x) {
    if (x == 39) {//Direita
        dirxJ = 1;
        jog.src = 'images/aviao2.png';
    }
}
function teclaDw4(x) {
    if (x == 40) {//Baixo
        diryJ = 1;
        jog.src = 'images/aviao4.png';
    }
}
function fire() {
    atira(pjx + 135, pjy + 7);
    atira(pjx + 9, pjy + 7);
}
function teclaDw() {
    var tecla = event.keyCode;
    if (tecla == 38) {//Cima
        diryJ = -1;
        jog.src = 'images/aviao5.png';

    } else if (tecla == 40) {//Baixo
        diryJ = 1;
        jog.src = 'images/aviao4.png';
    }
    if (tecla == 37) {//Esquerda
        dirxJ = -1
        jog.src = 'images/aviao3.png';
    } else if (tecla == 39) {//Direita
        dirxJ = 1;
        jog.src = 'images/aviao2.png';
    }
    if (tecla == 32) {//Espaço / Tiro
        atira(pjx + 135, pjy + 7);
        atira(pjx + 9, pjy + 7);

    }

}
function teclaUp() {
    var tecla = event.keyCode;
    if ((tecla == 38) || (tecla == 40)) {
        diryJ = 0;
        jog.src = 'images/aviao1.png';
    }
    if ((tecla == 37) || (tecla == 39)) {
        dirxJ = 0;
        jog.src = 'images/aviao1.png';
    }
    console.log(tecla);
}

function controlaBomba() {
    bombasTotal = document.getElementsByClassName('bomba');
    var tam = bombasTotal.length;
    for (var i = 0; i < tam; i++) {
        if (bombasTotal[i]) {
            var pi = bombasTotal[i].offsetTop;
            pi += velB;
            bombasTotal[i].style.top = pi + 'px';
            if (pi > tamTelaH) {
                vidaPlaneta -= 10;
                criaExplosao(2, bombasTotal[i].offsetLeft, null)
                bombasTotal[i].remove();
            }
        }
    }
}
function criaBomba() {
    if (jogo) {
        var y = 0;
        var x = Math.random() * (((container.offsetWidth + container.offsetLeft) - 40) - (container.offsetLeft)) + (container.offsetLeft + 10);
        var bomba = document.createElement('div');
        var att1 = document.createAttribute('class');
        var att2 = document.createAttribute('style');
        att1.value = 'bomba';
        att2.value = "top:" + y + 'px;left:' + x + 'px';
        bomba.setAttributeNode(att1);
        bomba.setAttributeNode(att2);
        document.getElementById('container').appendChild(bomba);
        contBombas--;
    }
}

function criaExplosao(tipo, x, y) {
    if (document.getElementById('explosao' + (ie - 3))) {
        document.getElementById('explosao' + (ie - 3)).remove();
    }
    var explosao = document.createElement('div');
    var img = document.createElement('img');
    var som = document.createElement('audio');
    //Atributos para div
    var att1 = document.createAttribute('class');
    var att2 = document.createAttribute('style');
    var att3 = document.createAttribute('id');
    //Atributos para criar imagem
    var att4 = document.createAttribute('src');
    //Atributos para audio
    var att5 = document.createAttribute('src');
    var att6 = document.createAttribute('id');

    att3.value = 'explosao' + ie;
    if (tipo == 1) {
        att1.value = 'explosaoAr';
        att2.value = 'top:' + y + 'px;left:' + x + 'px;';
        att4.value = 'images/ar.gif?' + new Date();
    } else {
        att1.value = 'explosaoChao';
        att2.value = 'top:' + (tamTelaH - 57) + 'px;left:' + (x - 17) + 'px;';
        att4.value = 'images/ac.gif?' + new Date();
    }
    att5.value = 'images/tiro.wav?' + new Date();
    att6.value = 'som' + isom;
    explosao.setAttributeNode(att1);
    explosao.setAttributeNode(att2);
    explosao.setAttributeNode(att3);
    img.setAttributeNode(att4);
    som.setAttributeNode(att5);
    som.setAttributeNode(att6);
    explosao.appendChild(img);
    explosao.appendChild(som);
    document.body.appendChild(explosao);
    if (somLiga) {
        document.getElementById('som' + isom).play();
    }
    document.getElementById('explosao' + ie);
    ie++;
    isom++;
}

function atira(x, y) {
    var t = document.createElement('div');
    var att1 = document.createAttribute('class');
    var att2 = document.createAttribute('style');
    att1.value = "tiroJog";
    att2.value = "top:" + y + 'px;left:' + x + 'px';
    t.setAttributeNode(att1);
    t.setAttributeNode(att2);
    document.body.appendChild(t);

}

function controleTiros() {
    var tiros = document.getElementsByClassName('tiroJog');
    var tam = tiros.length;
    for (var i = 0; i < tam; i++) {
        if (tiros[i]) {
            var pt = tiros[i].offsetTop;//top da tela 
            pt -= velT;
            tiros[i].style.top = pt + 'px';
            colisaoTiroBomba(tiros[i])
            if (pt < 0) {
                tiros[i].remove();
            }
        }
    }
}

function colisaoTiroBomba(tiro) {
    var tam = bombasTotal.length;
    for (var i = 0; i < tam; i++) {
        if (bombasTotal[i]) {
            if (
                (
                    (tiro.offsetTop <= (bombasTotal[i].offsetTop + 40)) &&//Cima tiro com baixo bomba
                    ((tiro.offsetTop + 6) >= (bombasTotal[i].offsetTop))//Baixo tiro com cima bomba
                )
                &&
                (
                    (tiro.offsetLeft <= (bombasTotal[i].offsetLeft + 24)) &&
                    ((tiro.offsetLeft + 6) >= (bombasTotal[i].offsetLeft))
                )
            ) {
                criaExplosao(1, bombasTotal[i].offsetLeft - 25, bombasTotal[i].offsetTop)
                bombasTotal[i].remove();
                tiro.remove();
            }
        }
    }
}

function controlaJogador() {
    pjy += diryJ * velJ;
    pjx += dirxJ * velJ;
    if (((pjy + 83) >= container.offsetHeight) || ((pjy <= 0))) {
        pjy += (velJ * diryJ) * (-1);

    }
    if ((pjx <= container.offsetLeft) || pjx + 150 >= container.offsetLeft + container.offsetWidth) {
        pjx += (velJ * dirxJ) * (-1);

    }
    jog.style.top = pjy + "px";
    jog.style.left = pjx + 'px';

}

function gameLoop() {
    if (jogo) {
        // Funções de Controle
        controlaJogador();
        controleTiros();
        controlaBomba();
    }
    gerenciaGame();
    frame = requestAnimationFrame(gameLoop);
}
function nuvem() {
    let est1 = document.getElementById('estrela1');
    let est2 = document.getElementById('estrela2');
    est1.style.position = "relative";
    est2.style.position = "relative";
    let n = 0;
    let altura;

    setInterval(() => {
        if (window.innerHeight <= 300) {
            altura = 280
        } else if (window.innerHeight <= 400) {
            altura = 380;
        } else if (window.innerHeight <= 500) {
            altura = 480;
        } else if (window.innerHeight <= 600) {
            altura = 580;
        } else {
            altura = 740;
        }
        if (n == -altura) {
            n = 0;
        } else {
            est1.style.top = n + "px";
            est2.style.top = n + "px";
            n -= 2;
        }
    }, 50);
}

function gerenciaGame() {
    if (somLiga) {
        document.getElementById('musicGame').play();
    }
    barraPlaneta.style.width = vidaPlaneta + 'px';

    if (contBombas <= 0) {
        jogo = false;
        clearInterval(tmpCriaBomba);
        //    telaMsg.style.backgroundImage = 'url(vitoria.jpg)';
        telaWin.style.display = 'flex';
        telaWin.style.top = document.getElementById('container').offsetTop + 'px';
        telaWin.style.left = container.offsetLeft + 'px';
        setTimeout(() => {
            document.getElementById('musicGame').pause();
            document.getElementById('win2').style.display = 'flex';
            /*  container.style.display='none';
              document.getElementById('estrelas').style.display='none';*/
            if (somLiga) {
                document.getElementById('somWin').play();
            }

        }, 700);

        document.getElementById('somWin').stop();

    }
    if (vidaPlaneta <= 0) {
        jogo = false;
        clearInterval(tmpCriaBomba);
        //    telaMsg.style.backgroundImage = 'url(derrota.jpg)';
        telaGameOver.style.display = 'flex';
        telaGameOver.style.top = document.getElementById('container').offsetTop + 'px';
        telaGameOver.style.left = container.offsetLeft + 'px';
        setTimeout(() => {
            document.getElementById('musicGame').pause();
            document.getElementById('gameOver2').style.display = 'flex';
            /*  container.style.display='none';
              document.getElementById('estrelas').style.display='none';*/
            if (somLiga) {
                document.getElementById('somOver').play();
            }
        }, 700);

        document.getElementById('somOver').stop();

    }
}

function inicia() {
    nuvem()
    container = document.getElementById('container');
    jogo = true;
    tamTelaH = window.innerHeight;
    tamtelaW = document.getElementById('container').offsetWidth;
    dirxJ = diryJ = 0;
    pjx = container.offsetLeft + ((container.offsetWidth / 2) - 75);
    // pjy = container.offsetTop + ((container.offsetHeight / 2) + 150);
    pjy = container.offsetTop + (((container.offsetHeight) / 1.5))
    velJ = 8;
    velT = 5;
    jog = document.getElementById('aviao');
    jog.style.top = pjy + "px";
    jog.style.left = pjx + "px";

    clearInterval(tmpCriaBomba);
    contBombas = 250;
    velB = dificuldade;
    tmpCriaBomba = setInterval(criaBomba, 1700);

    vidaPlaneta = 300;
    telaGameOver = document.getElementById('gameOver');
    telaWin = document.getElementById('win');
    gameLoop();

    ie = 0;
    isom = 0;

    vidaPlaneta = 180;
    barraPlaneta = document.getElementById('barraPlaneta');
    barraPlaneta.style.width = vidaPlaneta + 'px';
    if (document.getElementById('container').offsetHeight <= 768) {
        document.getElementById('controle').style.display = 'flex';
    }

}

function passarSom() {
    if (document.getElementById('nivel2').innerHTML == "ON") {
        document.getElementById('nivel2').innerHTML = "OFF"
        somLiga = false;
    } else if (document.getElementById('nivel2').innerHTML == "OFF") {
        document.getElementById('nivel2').innerHTML = "ON"
    }
}

function voltarSom() {
    if (document.getElementById('nivel2').innerHTML == "OFF") {
        document.getElementById('nivel2').innerHTML = "ON"
        somLiga = true;
    }
}

function passar() {
    if (nivel.innerHTML == 'Normal') {
        nivel.innerHTML = 'Easy';
        dificuldade = 3;
    } else if (nivel.innerHTML == 'Hard') {
        nivel.innerHTML = 'Normal';
        dificuldade = 4;
    }
}
function voltar() {
    if (nivel.innerHTML == 'Normal') {
        nivel.innerHTML = 'Hard';
        dificuldade = 7;
    } else if (nivel.innerHTML == 'Easy') {
        nivel.innerHTML = 'Normal';
        dificuldade = 4;
    }
}
function player() {
    document.getElementById('option').style.display = 'none';
    document.getElementById('inicio').style.display = "none";
    document.getElementById('container').style.display = "block";
    document.getElementById('estrelas').style.display = 'flex';
    dificuldade = 4;
    inicia();
}
function startGame() {

    document.getElementById('option').style.display = 'none';
    document.getElementById('container').style.display = "flex";
    document.getElementById('estrelas').style.display = 'flex';
    if (nivel.innerHTML == 'Normal') {
        dificuldade = 4;
    }

    inicia();
}
function option() {
    document.getElementById('inicio').style.display = 'none';
    document.getElementById('option').style.display = 'flex';
}

function iniciaGame() {
    document.getElementById('bt-inicia').style.display = 'none';
    document.getElementById('bt-option').style.display = 'flex';
    document.getElementById('bt-player').style.display = 'flex';
    document.getElementById('bt-option').addEventListener('click', option);

}
var somLiga;
function iniciaMenu() {
    document.getElementById('controle').style.top = (document.getElementById('inicio').offsetHeight) - 160 + 'px';
    var nivel = document.getElementById('nivel');
    var dificuldade = 4;
    somLiga = true;
    document.getElementById('inicio').addEventListener('click', iniciaGame);
}
window.addEventListener('load', iniciaMenu);
document.addEventListener('keydown', teclaDw);
document.addEventListener('keyup', teclaUp);