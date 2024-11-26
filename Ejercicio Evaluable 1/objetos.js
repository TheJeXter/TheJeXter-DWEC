class carta {
    
    valor;
    imagen;
    constructor(representacion) {

        this.imagen = `./images/${representacion}.png`;
        this.valor = representacion.substring(0,representacion.length-1);

        if (this.valor == "J" || this.valor == "K" || this.valor == "Q") {
            this.valor = 11;
        } else {
            this.valor = Number(this.valor);
        }
    }
}