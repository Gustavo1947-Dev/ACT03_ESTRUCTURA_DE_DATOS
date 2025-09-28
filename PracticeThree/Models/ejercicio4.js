class MatrizIdentidad {
    /**
     * Constructor de la clase.
     * @param {number} tamano - El tamaño de la matriz cuadrada (n x n).
     */
    constructor(tamano) {
        if (!Number.isInteger(tamano) || tamano <= 0) {
            throw new Error("El tamaño debe ser un número entero positivo.");
        }
        this.tamano = tamano;
    }

    /**
     * Genera y devuelve la matriz identidad.
     * @returns {Array<Array<number>>} La matriz identidad generada.
     */
    generarMatriz() {
        const matriz = [];
        for (let i = 0; i < this.tamano; i++) {
            matriz[i] = [];
            for (let j = 0; j < this.tamano; j++) {
                if (i === j) {
                    matriz[i][j] = 1;
                } else {
                    matriz[i][j] = 0;
                }
            }
        }
        return matriz;
    }
}

module.exports = MatrizIdentidad;
