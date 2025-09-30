/**
 * Verifica si una matriz es un cuadrado mágico.
 * @param {number[][]} matriz - La matriz a verificar.
 * @returns {string} Un mensaje indicando si es un cuadrado mágico y la constante.
 */
function verificarCuadradoMagico(matriz) {
    const n = matriz.length;

    // Check if the matrix is square
    for (let i = 0; i < n; i++) {
        if (matriz[i].length !== n) {
            return "No es una matriz cuadrada.";
        }
    }

    const constanteMagica = matriz[0].reduce((suma, valor) => suma + valor, 0);

    for (let i = 1; i < n; i++) {
        const sumaFila = matriz[i].reduce((suma, valor) => suma + valor, 0);
        if (sumaFila !== constanteMagica) {
            return "No es un cuadrado mágico. La suma de las filas no es constante.";
        }
    }

    for (let j = 0; j < n; j++) {
        let sumaColumna = 0;
        for (let i = 0; i < n; i++) {
            sumaColumna += matriz[i][j];
        }
        if (sumaColumna !== constanteMagica) {
            return "No es un cuadrado mágico. La suma de las columnas no es constante.";
        }
    }

    let sumaDiagonalPrincipal = 0;
    for (let i = 0; i < n; i++) {
        sumaDiagonalPrincipal += matriz[i][i];
    }
    if (sumaDiagonalPrincipal !== constanteMagica) {
        return "No es un cuadrado mágico. La suma de la diagonal principal no coincide.";
    }

    let sumaDiagonalSecundaria = 0;
    for (let i = 0; i < n; i++) {
        sumaDiagonalSecundaria += matriz[i][n - 1 - i];
    }
    if (sumaDiagonalSecundaria !== constanteMagica) {
        return "No es un cuadrado mágico. La suma de la diagonal secundaria no coincide.";
    }

    return `Es un cuadrado mágico, el número mágico es ${constanteMagica}.`;
}

const verificar = (req, res) => {
    const { matriz } = req.body;

    if (!matriz) {
        return res.status(400).json({ error: 'Se requiere una matriz en el cuerpo de la solicitud.' });
    }

    const resultado = verificarCuadradoMagico(matriz);
    res.json({ resultado });
};

module.exports = {
    verificar
};