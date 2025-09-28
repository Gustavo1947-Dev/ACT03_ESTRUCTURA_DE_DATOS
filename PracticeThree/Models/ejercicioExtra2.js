/**
 * Simula un juego de ruleta europea.
 * Diseñado para ser la lógica de negocio en un backend de Express.js.
 */
class RouletteSimulator {
    constructor() {
        // Genera los números de la ruleta europea (0-36)
        this.wheelNumbers = Array.from({ length: 37 }, (_, i) => i);
    }

    /**
     * Realiza una tirada de ruleta con la apuesta del usuario.
     * @param {number} betNumber - El número apostado por el usuario (0-36).
     * @returns {object} Un objeto con el resultado de la tirada.
     */
    spin(betNumber) {
        // 1. Validación de la apuesta
        if (typeof betNumber !== 'number' || !Number.isInteger(betNumber) || betNumber < 0 || betNumber > 36) {
            // Devuelve un objeto de error claro para la API
            return {
                error: true,
                message: "Apuesta inválida. Por favor, envía un número entero entre 0 y 36.",
                userBet: betNumber
            };
        }

        // 2. Simula la tirada
        const randomIndex = Math.floor(Math.random() * this.wheelNumbers.length);
        const winningNumber = this.wheelNumbers[randomIndex];

        // 3. Determina el resultado
        const isWinner = (winningNumber === betNumber);
        const message = isWinner ? "¡Ganaste! Felicitaciones." : "¡Perdiste! Inténtalo de nuevo.";

        // 4. Devuelve el objeto JSON estructurado
        return {
            winningNumber: winningNumber,
            userBet: betNumber,
            isWinner: isWinner,
            message: message
        };
    }
}

// Exporta la clase para que pueda ser importada en otros módulos.
module.exports = { RouletteSimulator };
