/**
 * Cuenta la cantidad de ceros en cada fila de una matriz.
 * @param {number[][]} matriz - La matriz de números a procesar.
 * @returns {string[]} Un arreglo de cadenas que describe el conteo de ceros por fila.
 */
function contarCerosPorFila(matriz) {
    const resultado = [];

    // Recorremos cada fila de la matriz
    matriz.forEach((fila, index) => {
        // Usamos filter() para contar cuántos elementos son igual a 0
        const cantidadDeCeros = fila.filter(numero => numero === 0).length;

        // Agregamos el resultado al arreglo de textos
        resultado.push(`La fila ${index + 1} tiene ${cantidadDeCeros} cero(s).`);
    });

    return resultado;
}

const analizar = (req, res) => {
    const { matriz } = req.body;

    if (!matriz) {
        return res.status(400).json({ error: 'Se requiere una matriz en el cuerpo de la solicitud.' });
    }

    const resultado = contarCerosPorFila(matriz);
    res.json({ resultado });
};

module.exports = {
    analizar
};