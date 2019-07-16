/**
 * Clase encargada de decidir los empates entre dos jugadas
 * con el mismo rank
 */
class Draws {
    /**
     * Metodo principal al que se llama para decidir.
     * Recibe dos manos con el mismo rango a las cuales
     * hay que aplicar un desempate
     */
    static decideInRankWithThoHands(hand1, hand2) {
        return this.decideDraw(hand1.cards, hand2.cards);
    }

    /**
     * Metodo recursivo que va a irse llamando hasta
     * encontrar una mano ganadora o decidir
     * que ambas manos tienen el mismo peso.
     * Va llamandose de nuevo quitando las cartas
     * ya comparadas en la iteracion actual.
     */
    static decideDraw(hand1, hand2) {
        // obtiene la carta mas repetida para cada mano
        const highCard1 = this.findMostRepeatedValue(hand1);
        const highCard2 = this.findMostRepeatedValue(hand2);
        // ordena esas dos cartas
        const result = Card.sort(highCard1, highCard2);

        // si son iguales, volvemos a llamar a la funcion 
        // sin las cartas ya comparadas
        // tiene en cuenta que no nos quedemos sin mano
        if (result === 0) {
            // quitamos las cartas de la iteracion actual
            let newHand1 = hand1.filter(card => card.value !== highCard1.value);
            let newHand2 = hand2.filter(card => card.value !== highCard2.value);

            // si seguimos teniendo cartas a comparar, llamamos
            if (newHand1.length !== 0 && newHand2.length !== 0) {
                return this.decideDraw(newHand1, newHand2);
            }
        }

        // obtenemos el valor de la carta en base al ganador
        const winnerHand = (result === -1 ? highCard1.value : highCard2.value);
        // devolvemos un objeto con { winner, drawWinnerHand }
        return { winner: result, drawWinnerHand: winnerHand };
    }

    /**
     * Devuelve la carta mas repetida en el array de cartas
     * de la entrada
     */
    static findMostRepeatedValue(cards) {
        // obtengo los rangos de las cartas
        const cardsValues = cards.map(card => card.rank);
        // valores unicos
        const uniqueValues = [...new Set(cardsValues)];
        // apariciones de cada carta
        const occurrences = this.countOccurrences(cardsValues);
        // obtengo el rango de la carta mas repetida y con mayor rank
        const mostRepeatedValue = this.getMostRepeatedValue(uniqueValues, occurrences);
        // devolvemos esa carta buscando en el array de entrada por rank
        return cards.find(card => card.rank === mostRepeatedValue);
    }

    /**
     * Devuelve un objeto con las apariciones de cada carta
     * Las coloca por rank de cada carta
     * Por ejemplo (Poker de K y un 4):
     * {
     *   11: 4,
     *   4: 1
     * }
     */
    static countOccurrences(arr) {
        return arr.reduce(function (acc, curr) {
            // si ya tengo esa carta sumo 1, si no, asigno valor 1
            acc[curr] ? acc[curr]++ : acc[curr] = 1;
            return acc;
        }, {});
    }

    /**
     * Devuelve la carta que mas se repite.
     * Si hay empate entre varias cartas,
     * devuelve la que tiene un rango mas alto
     */
    static getMostRepeatedValue(values, occurrences) {
        return values.reduce(function (acc, curr) {
            // flag para ver si aparece mas veces que el acumulador actual
            const moreOccurrences = occurrences[curr] > (occurrences[acc] || 0);
            // flag para ver si aparecen las mismas veces pero esta tiene mayor rank
            const equalOccurrencesButHigherValue = (occurrences[curr] === occurrences[acc]) && (curr > acc);

            // si alguno se cumple, cambiamos el valor de la carta
            if (moreOccurrences || equalOccurrencesButHigherValue) {
                return curr;
            }
            return acc;
        }, 0);
    }
}
module.exports = Draws;