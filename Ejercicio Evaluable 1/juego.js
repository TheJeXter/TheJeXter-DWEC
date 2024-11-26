//Creo mis variables a usar durante el juego
let baraja = [];
let cartasJugador = [];
let cuentaJugador = 0;
let cuentaBanca = 0;
let cartasBanca = [];
let palos = ["C","T","D","P"];
let info = document.getElementById("info");

//Hacemos que al salir el objeto carta "J", "Q" o "K" vaya acompañado del valor que corresponde a la misma (11, 12 o 13)
for (let index = 0; index < palos.length; index++) {
    for (let i = 1; i <=13; i++) {
        switch (i) {
            case 11:

                baraja.push(new carta("J" + palos[index]));
                break;

            case 12:

                baraja.push(new carta("Q" + palos[index]));
                break;

            case 13:

                baraja.push(new carta("K" + palos[index]));
                break;
        
            default:

                baraja.push(new carta(i + palos[index]));
                break;
        }
        
    }
    
}

//Bajaramos las cartas con la función _.shuffle que nos ofrece Bootstrap
baraja = _.shuffle(baraja);


//Configuramos el botón de pedir carta para que saque una carta y genera la imagen
function pedirCarta() {

    info.innerHTML = "";

    if (cuentaJugador < 21) {

        let carta = baraja.pop();
        cuentaJugador += carta.valor;

        let contenedorCartasJugador = document.getElementById("cartas-jugador");
        let imgCarta = document.createElement("img");
        imgCarta.src = carta.imagen;
        imgCarta.alt = `Carta: ${carta.valor}`;
        imgCarta.style.width = "100px";
        imgCarta.style.margin = "5px";
        contenedorCartasJugador.appendChild(imgCarta);

        console.log(carta.imagen);
        console.log(cuentaJugador);
    
    } else {
        let mensaje =`El jugador no puede pedir más cartas porque tiene ${cuentaJugador} puntos.`;
        console.log(`El jugador no puede pedir más cartas porque tiene ${cuentaJugador} puntos.`);
        info.innerHTML = mensaje;

        setTimeout(() => {
            juegaBanca();
        }, 1500);
    }
}


//Con la función plantarse el jugador para de jugar, cuenta sus puntos y deja paso a la banca
function plantarse() {

    info.innerHTML = "";

    let mensaje = `El jugador se planta con ${cuentaJugador} puntos. Le toca jugar a la banca.`;
    console.log(`El jugador se planta con ${cuentaJugador} puntos. Le toca jugar a la banca.`);
    info.innerHTML = mensaje;

    setTimeout(() => {
        juegaBanca();
    }, 1500);
}

//Creamos un botón para reiniciar el juego avisando previamente con un alert
function resetear() {
    alert("Se reiniciará el juego");
	location.reload(true);
}


//Empieza a jugar la banca. Saca cartas con un intervalo y se detiene si sus puntos suman más de 17
function juegaBanca() {

    info.innerHTML = "";

    let mensaje = "La banca comienza a jugar...";
    console.log("La banca comienza a jugar...");
    info.innerHTML = mensaje;

    let intervalo = setInterval(() => {
        console.log(`Sacando carta...`);

        if (cuentaBanca < 17) {
            let carta = baraja.pop();
            cuentaBanca += carta.valor;

            let contenedorCartasBanca = document.getElementById("cartas-banca");
        let imgCarta = document.createElement("img");
        imgCarta.src = carta.imagen;
        imgCarta.alt = `Carta: ${carta.valor}`;
        imgCarta.style.width = "100px";
        imgCarta.style.margin = "5px";
        contenedorCartasBanca.appendChild(imgCarta);

            console.log(carta.imagen);
            console.log(cuentaBanca);
        } else {
            info.innerHTML = "";
            let mensaje2 = `La banca para de jugar porque tiene ${cuentaBanca} puntos.`;
            console.log(`La banca para de jugar porque tiene ${cuentaBanca} puntos.`);
            info.innerHTML = mensaje2;
            clearInterval(intervalo);

            setTimeout(() => {
                compararResultados();
            }, 2500);

            
        }
    
    }, 2000);

}

//Comparamos los resultados
function compararResultados() {

    info.innerHTML = "";

    let mensaje = "Comprobemos quién es el ganador...";
    console.log ("Comprobemos quién es el ganador...");
    info.innerHTML = mensaje;

    setTimeout(() => {

        if (cuentaJugador > 21) {
            let mensaje2 = "¡El jugador ha perdido porque se ha pasado de 21! La banca ha ganado.";
            console.log ("¡El jugador ha perdido porque se ha pasado de 21! La banca ha ganado.");
            info.innerHTML = mensaje2;
        } else if (cuentaBanca > 21 || cuentaJugador > cuentaBanca) {
            let mensaje3 = "¡¡¡Has GANADO enhorabuena!!!";
            console.log ("¡¡¡Has GANADO enhorabuena!!!");
            info.innerHTML = mensaje3;
        } else if (cuentaJugador === cuentaBanca) {
            let mensaje4 = "¡Habéis empatado!";
            console.log ("¡Habéis empatado!");
            info.innerHTML = mensaje4;
        } else {
            let mensaje5 = "¡Mala suerte! La banca ha ganado.";
            console.log ("¡Mala suerte! La banca ha ganado.");
            info.innerHTML = mensaje5;
        }
        
    }, 2500);
    
}





