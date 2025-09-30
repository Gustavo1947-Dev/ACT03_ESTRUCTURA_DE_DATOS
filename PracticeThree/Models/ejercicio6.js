/**
 * Procesa una matriz de ventas para calcular diversas estadísticas.
 * Diseñado para ser utilizado en un entorno de servidor como Express.js.
 */
class SalesProcessor {
    constructor() {
        // Matriz de ventas fija según los datos proporcionados.
        this.salesMatrix = [
            // L, M, Mi, J, V
            [5,  16, 10, 12, 24],  // Enero
            [40, 55, 10, 11, 18],  // Febrero
            [15, 41, 78, 14, 51],  // Marzo
            [35, 22, 81, 15, 12],  // Abril
            [50, 12, 71, 10, 20],  // Mayo
            [70, 40, 60, 28, 22],  // Junio
            [50, 50, 50, 36, 25],  // Julio
            [40, 70, 40, 11, 20],  // Agosto
            [20, 20, 30, 12, 18],  // Septiembre
            [10, 40, 32, 13, 16],  // Octubre
            [50, 3,  24, 15, 82],  // Noviembre
            [40, 46, 15, 46, 22]   // Diciembre
        ];

        // Nombres para indexar los resultados.
        this.months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
        this.days = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'];
    }

    /**
     * Encuentra la venta más baja, su mes y día.
     * @returns {{value: number, location: string}}
     */
    findMinSale() {
        let minSale = Infinity;
        let minMonthIndex = -1;
        let minDayIndex = -1;

        for (let i = 0; i < this.salesMatrix.length; i++) {
            for (let j = 0; j < this.salesMatrix[i].length; j++) {
                if (this.salesMatrix[i][j] < minSale) {
                    minSale = this.salesMatrix[i][j];
                    minMonthIndex = i;
                    minDayIndex = j;
                }
            }
        }

        return {
            value: minSale,
            location: `${this.months[minMonthIndex]}, ${this.days[minDayIndex]}`
        };
    }

    /**
     * Encuentra la venta más alta, su mes y día.
     * @returns {{value: number, location: string}}
     */
    findMaxSale() {
        let maxSale = -Infinity;
        let maxMonthIndex = -1;
        let maxDayIndex = -1;

        for (let i = 0; i < this.salesMatrix.length; i++) {
            for (let j = 0; j < this.salesMatrix[i].length; j++) {
                if (this.salesMatrix[i][j] > maxSale) {
                    maxSale = this.salesMatrix[i][j];
                    maxMonthIndex = i;
                    maxDayIndex = j;
                }
            }
        }

        return {
            value: maxSale,
            location: `${this.months[maxMonthIndex]}, ${this.days[maxDayIndex]}`
        };
    }

    /**
     * Calcula la suma total de todas las ventas.
     * @returns {number}
     */
    calculateTotalSales() {
        return this.salesMatrix.flat().reduce((acc, val) => acc + val, 0);
    }

    /**
     * Calcula la venta total por cada día de la semana.
     * @returns {Array<{day: string, total: number}>}
     */
    calculateDailyTotals() {
        const dailyTotals = Array(this.days.length).fill(0);

        for (let j = 0; j < this.days.length; j++) {
            for (let i = 0; i < this.months.length; i++) {
                dailyTotals[j] += this.salesMatrix[i][j];
            }
        }

        return this.days.map((day, index) => ({
            day: day,
            total: dailyTotals[index]
        }));
    }

    /**
     * Ejecuta todos los cálculos y devuelve un objeto con los resultados.
     * @returns {object} Un objeto listo para ser serializado a JSON.
     */
    getAllResults() {
        const minSale = this.findMinSale();
        const maxSale = this.findMaxSale();
        const totalSales = this.calculateTotalSales();
        const dailyTotals = this.calculateDailyTotals();

        return {
            salesMatrix: this.salesMatrix, // Incluye la tabla original como se solicitó
            totalSales: totalSales,
            minSale: minSale,
            maxSale: maxSale,
            dailyTotals: dailyTotals
        };
    }
}

const analizar = (req, res) => {
    const processor = new SalesProcessor();
    const results = processor.getAllResults();
    res.json(results);
};

// Exporta la clase y el manejador para que puedan ser importados en otros módulos.
module.exports = { 
    SalesProcessor,
    analizar
};