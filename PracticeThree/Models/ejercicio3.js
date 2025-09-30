/**
 * Realiza operaciones de suma, resta, producto y división elemento a elemento entre dos matrices 2x2.
 */
function operarMatrices(matrizA, matrizB) {
    const resultados = {
        suma: [[0, 0], [0, 0]],
        resta: [[0, 0], [0, 0]],
        producto: [[0, 0], [0, 0]],
        division: [[0, 0], [0, 0]]
    };

    for (let i = 0; i < 2; i++) {
        for (let j = 0; j < 2; j++) {
            resultados.suma[i][j] = matrizA[i][j] + matrizB[i][j];
            resultados.resta[i][j] = matrizA[i][j] - matrizB[i][j];
            resultados.producto[i][j] = matrizA[i][j] * matrizB[i][j];
            if (matrizB[i][j] === 0) {
                resultados.division[i][j] = 'No se puede dividir entre cero';
            } else {
                resultados.division[i][j] = Math.round((matrizA[i][j] / matrizB[i][j]) * 100) / 100;
            }
        }
    }

    return resultados;
}

const calcular = (req, res) => {
    const { matriz1, matriz2 } = req.body;

    if (!matriz1 || !matriz2) {
        return res.status(400).json({ error: 'Se requieren las dos matrices (matriz1 y matriz2) en el cuerpo de la solicitud.' });
    }
    
    const resultados = operarMatrices(matriz1, matriz2);
    res.json(resultados);
};

module.exports = {
    calcular
};