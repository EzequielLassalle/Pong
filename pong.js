let panel;
let panelAncho = 500;
let panelAltura= 500;
let contexto;
let anchoJugador = 10;
let alturaJugador = 40;
let puntaje1 = 0;
let puntaje2 = 0;

let jugador1 = {
    x: 10,
    y: panelAltura/2,
    ancho: anchoJugador,
    altura: alturaJugador,
    velocidad: 0

}

let pelota = {
    x: panelAncho/2,
    y: panelAltura/2,
    altura: 10,
    ancho: 10,
    velocidadX:1,
    velocidadY:2
}

window.onload = function (){
    panel = document.getElementById("board")
    panel.height = panelAltura
    panel.width = panelAncho
    contexto = panel.getContext("2d")

    contexto.fillStyle = "red";
    contexto.fillRect(jugador1.x,jugador1.y,jugador1.ancho,jugador1.altura);

    requestAnimationFrame(actualizar);
    document.addEventListener("keyup",moverJugador)


}


let jugador2= {
    x: panelAncho - 10 - anchoJugador,
    y: panelAltura/2,
    ancho: anchoJugador,
    altura: alturaJugador,
    velocidad:0

}

function moverJugador(evento){

    if(evento.code == "KeyW"){
        jugador1.velocidad = -2
    }
    else if(evento.code == "KeyS"){
        jugador1.velocidad = 2
    }

    if(evento.code == "ArrowUp"){
        jugador2.velocidad = -2
    }else if(evento.code == "ArrowDown"){
        jugador2.velocidad = 2
    }

}


function actualizar(){

    requestAnimationFrame(actualizar);
    contexto.clearRect(0,0,panelAncho,panelAltura)

    contexto.fillStyle = "red";
    jugador1.y += jugador1.velocidad

    if(borde(jugador1.y)){
        jugador1.y -= jugador1.velocidad
    }
    
    contexto.fillRect(jugador1.x,jugador1.y,jugador1.ancho,jugador1.altura);

    contexto.fillStyle = "purple";
    jugador2.y += jugador2.velocidad

    if(borde(jugador2.y)){
        jugador2.y -= jugador2.velocidad
    }

    contexto.fillRect(jugador2.x,jugador2.y,jugador2.ancho,jugador2.altura);

    contexto.fillStyle = "blue";
    pelota.x += pelota.velocidadX;
    pelota.y += pelota.velocidadY;
    contexto.fillRect(pelota.x,pelota.y,pelota.ancho,pelota.altura);
    bordePelota();

    if(choque(pelota,jugador1)){
        if(pelota.x <= jugador1.ancho + jugador1.x){
            pelota.velocidadX *= -1;
        }
    }

    if(choque(pelota,jugador2)){
        if(pelota.x + pelota.ancho >= jugador2.x){
            pelota.velocidadX *= -1;
        }
    }

    if(pelota.x < 0){
        puntaje2++;
        resetear(1)
    }else if(pelota.x + pelota.ancho > panelAncho){
        puntaje1++;
        resetear(-1)
    }

    for(let i = 10; i < panelAltura;i+= 25){
        contexto.fillRect(panelAncho/2,i,5,5)
    }

    contexto.font = "45px sans-serif";
    contexto.fillStyle = "yellow";
    contexto.fillText(puntaje1,panelAncho/5,45);
    contexto.fillText(puntaje2,panelAncho*4/5 - 45,45);




}

function bordePelota(){

    if(pelota.y <= 0 || (pelota.y + pelota.altura >= panelAltura)){
        pelota.velocidadY *= -1;
    }

}

///Formula general para colisiones
function choque(a,b){
    
    posicionesColisionadas = 0;

    if(a.x < b.x + b.ancho){ //// B paso a A horizontalmente
        posicionesColisionadas += 1;
    }
    
    if(a.x + a.ancho > b.x){ //// A paso a B horizontalmente
        posicionesColisionadas += 1;
    }
    
    if(a.y < b.y + b.altura){ ///B paso a A verticalmente
        posicionesColisionadas += 1;
    }
    
    if(a.y + a.altura > b.y){ /// A paso a B horizontalmente
        posicionesColisionadas += 1;
    }

    if(posicionesColisionadas == 4){
       return true
    }

    return false


}

function resetear(nuevaVelocidad){

    pelota = {
        x: panelAncho/2,
        y: panelAltura/2,
        altura: 10,
        ancho: 10,
        velocidadX:nuevaVelocidad,
        velocidadY:2
    }

}


function borde(posicionY){

    if (posicionY<0){
        return true
    }

    if (posicionY + jugador1.altura > panelAltura){
        return true
    }

    return false

}
