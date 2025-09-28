/**
 * Procesa una matriz de calificaciones para calcular estadísticas de los estudiantes.
 * Diseñado para ser utilizado en un entorno de servidor como Express.js.
 */
class GradesProcessor {
    constructor() {
        // Matriz de calificaciones fija según los datos proporcionados.
        this.gradesMatrix = [
            [5.5, 8.6, 10],
            [8.0, 5.5, 10],
            [9.0, 4.1, 7.8],
            [10, 2.2, 8.1],
            [7.0, 9.2, 7.1],
            [9.0, 4.0, 6.0],
            [6.5, 5.0, 5.0],
            [4.0, 7.0, 4.0],
            [8.0, 8.0, 9.0],
            [10, 9.0, 9.2],
            [5.0, 10, 8.4],
            [9.0, 4.6, 7.5]
        ];
    }

    /**
     * Calcula el promedio final para cada alumno.
     * @returns {number[]} Un arreglo con los promedios de los alumnos.
     */
    calculateStudentAverages() {
        return this.gradesMatrix.map(studentGrades => {
            const sum = studentGrades.reduce((acc, grade) => acc + grade, 0);
            const average = sum / studentGrades.length;
            return parseFloat(average.toFixed(2));
        });
    }

    /**
     * Encuentra el promedio final más alto y el alumno que lo obtuvo.
     * @param {number[]} studentAverages - El arreglo de promedios de los alumnos.
     * @returns {{average: number, studentIndex: number}}
     */
    findHighestAverage(studentAverages) {
        const highestAvg = Math.max(...studentAverages);
        const studentIndex = studentAverages.indexOf(highestAvg) + 1;
        return { average: highestAvg, studentIndex: studentIndex };
    }

    /**
     * Encuentra el promedio final más bajo y el alumno que lo obtuvo.
     * @param {number[]} studentAverages - El arreglo de promedios de los alumnos.
     * @returns {{average: number, studentIndex: number}}
     */
    findLowestAverage(studentAverages) {
        const lowestAvg = Math.min(...studentAverages);
        const studentIndex = studentAverages.indexOf(lowestAvg) + 1;
        return { average: lowestAvg, studentIndex: studentIndex };
    }

    /**
     * Cuenta el número total de parciales reprobados (calificación < 7.0).
     * @returns {number}
     */
    countFailedParcials() {
        return this.gradesMatrix.flat().filter(grade => grade < 7.0).length;
    }

    /**
     * Genera una distribución de los promedios finales (aprobados vs. reprobados).
     * @param {number[]} studentAverages - El arreglo de promedios de los alumnos.
     * @returns {{approved: number, failed: number}}
     */
    getFinalGradesDistribution(studentAverages) {
        let approved = 0;
        let failed = 0;
        studentAverages.forEach(avg => {
            if (avg >= 7.0) {
                approved++;
            } else {
                failed++;
            }
        });
        return { approved, failed };
    }

    /**
     * Ejecuta todos los cálculos y devuelve un objeto con todos los resultados.
     * @returns {object} Un objeto listo para ser serializado a JSON.
     */
    getAllResults() {
        const studentAverages = this.calculateStudentAverages();
        const highestAverage = this.findHighestAverage(studentAverages);
        const lowestAverage = this.findLowestAverage(studentAverages);
        const failedParcialsCount = this.countFailedParcials();
        const finalGradesDistribution = this.getFinalGradesDistribution(studentAverages);

        return {
            studentAverages,
            highestAverage,
            lowestAverage,
            failedParcialsCount,
            finalGradesDistribution,
        };
    }
}

// Exporta la clase para que pueda ser importada en otros módulos.
module.exports = { GradesProcessor };
