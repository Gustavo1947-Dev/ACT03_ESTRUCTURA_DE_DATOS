/**
 * Procesa una matriz para calcular sumas y promedios de filas y columnas.
 * Diseñado para ser utilizado en un entorno de servidor como Express.js.
 */
class MatrixProcessor {
    /**
     * @param {number} [rows=5] - Número de filas de la matriz.
     * @param {number} [cols=10] - Número de columnas de la matriz.
     */
    constructor(rows = 5, cols = 10) {
        this.rows = rows;
        this.cols = cols;
        this.matrix = [];
        this.arregloA_SumasFilas = [];
        this.arregloB_PromediosFilas = [];
        this.arregloC_SumasColumnas = [];
        this.arregloD_PromediosColumnas = [];
    }

    /**
     * Genera y llena la matriz con números enteros aleatorios entre 1 y 100.
     */
    generateMatrix() {
        this.matrix = [];
        for (let i = 0; i < this.rows; i++) {
            const row = [];
            for (let j = 0; j < this.cols; j++) {
                row.push(Math.floor(Math.random() * 100) + 1);
            }
            this.matrix.push(row);
        }
    }

    /**
     * Calcula la suma y el promedio para cada fila de la matriz.
     */
    calculateRowStats() {
        this.arregloA_SumasFilas = [];
        this.arregloB_PromediosFilas = [];
        for (let i = 0; i < this.rows; i++) {
            const row = this.matrix[i];
            const sum = row.reduce((acc, val) => acc + val, 0);
            const average = sum / this.cols;
            this.arregloA_SumasFilas.push(sum);
            this.arregloB_PromediosFilas.push(parseFloat(average.toFixed(2)));
        }
    }

    /**
     * Calcula la suma y el promedio para cada columna de la matriz.
     */
    calculateColumnStats() {
        this.arregloC_SumasColumnas = [];
        this.arregloD_PromediosColumnas = [];
        for (let j = 0; j < this.cols; j++) {
            let sum = 0;
            for (let i = 0; i < this.rows; i++) {
                sum += this.matrix[i][j];
            }
            const average = sum / this.rows;
            this.arregloC_SumasColumnas.push(sum);
            this.arregloD_PromediosColumnas.push(parseFloat(average.toFixed(2)));
        }
    }

    /**
     * Ejecuta todos los cálculos y devuelve un objeto con todos los resultados.
     * @returns {object} Un objeto listo para ser serializado a JSON.
     */
    getAllResults() {
        this.generateMatrix();
        this.calculateRowStats();
        this.calculateColumnStats();

        return {
            matrix: this.matrix,
            results: {
                rowStats: {
                    sums: this.arregloA_SumasFilas,
                    averages: this.arregloB_PromediosFilas,
                },
                columnStats: {
                    sums: this.arregloC_SumasColumnas,
                    averages: this.arregloD_PromediosColumnas,
                },
            },
        };
    }
}

const procesar = (req, res) => {
    const { rows, cols } = req.body; // Get dimensions from request body

    // Use provided dimensions or the defaults from the constructor
    const processor = new MatrixProcessor(rows, cols);
    
    const results = processor.getAllResults();
    res.json(results);
};

// Exporta la clase y el manejador para que puedan ser importados en otros módulos.
module.exports = { 
    MatrixProcessor,
    procesar 
};