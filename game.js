/**
 * Clase encargada de validar las manos y de resolver la partida
 */
var Hand = require('./hand');

class Game {

    /**
     * Constructor que almacena dos manos
     * Convierte de la entrada a nuestras clases
     */
    constructor(handA, handB) {
        this.player1Hand = new Hand(handA);
        this.player2Hand = new Hand(handB);
    }

    /**
     * Comprueba que las dos manos introducidas son validas
     *   - Valores de la baraja (incluidas en array)
     *   - No repetidas entre manos 
     *   - No repetidas en la misma mano (5 cartas unicas)
     */
    static validHands(handA, handB) {
        const handSize = 5;
        const validCards = ["2S", "3S", "4S", "5S", "6S", "7S", "8S", "9S", "TS", "JS", "QS", "KS", "AS",
            "2H", "3H", "4H", "5H", "6H", "7H", "8H", "9H", "TH", "JH", "QH", "KH", "AH",
            "2C", "3C", "4C", "5C", "6C", "7C", "8C", "9C", "TC", "JC", "QC", "KC", "AC",
            "2D", "3D", "4D", "5D", "6D", "7D", "8D", "9D", "TD", "JD", "QD", "KD", "AD"];

        // cartas de la primera mano que aparecen en el array de cartas validas
        let correctValuesA = handA.filter(card => validCards.includes(card));
        // cartas de la segunda mano que aparecen en el array de cartas validas
        let correctValuesB = handB.filter(card => validCards.includes(card));
        // cartas de la primera mano que estan en la segunda mano
        let repeatedValues = handA.filter(card => handB.includes(card));
        // cartas unicas de la primera mano
        let distinctCardsA = [...new Set(handA)];
        // cartas unicas de la segunda mano
        let distinctCardsB = [...new Set(handB)];

        // reglas de validacion con mensajes
        if (correctValuesA.length !== handSize) {
            console.log("Cartas del Jugador 1 no válidas.")
            return false;
        }

        if (correctValuesB.length !== handSize) {
            console.log("Cartas del Jugador 2 no válidas.")
            return false;
        }

        if ((repeatedValues.length !== 0) || (distinctCardsA.length !== handSize) || (distinctCardsB.length !== handSize)) {
            console.log("Cartas repetidas entre jugadores.");
            return false;
        }

        // todo valido
        return true;
    }

    /**
     * Resuelve la comparacion entre las dos manos del juego
     */
    solve() {
        let result = {};

        // comparamos las manos
        let compareResult = this.player1Hand.compare(this.player2Hand);

        // asignamos ganador con -1/0/1
        result.winner = compareResult.winner;
        // asignamos si hay empate y carta de desempate
        result.withDraw = compareResult.withDraw;
        result.drawWinnerHand = compareResult.drawWinnerHand;
        // obtenemos nombre de la mano ganadora
        result.handName = result.winner === -1 ? this.player1Hand.name : this.player2Hand.name;

        return result;
    }
}

module.exports = Game;