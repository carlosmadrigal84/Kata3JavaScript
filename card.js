/**
 * Clase carta
 */
class Card {

    /**
     * Constructor en el que vamos a separar una carta de la entrada como '3H'
     * en un objeto con valor(3), suit(H) y rank(1, con respecto a values de arriba)
     */
    constructor(str) {
        /**
         * Valores de las cartas y sus rangos correspondientes, asociados
         * a la posicion del array
        */
        const values = ['2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K', 'A'];

        this.value = str.substr(0, 1);
        this.suit = str.substr(1, 1);
        this.rank = values.indexOf(this.value);
    }

    /**
     * Ordenamos dos cartas en base a su rank
     * -1 si es mayor la de la izquierda o primer parametro
     * 1 si es mayor la de la derecha o segundo parametro
     * 0 en caso de empate
     */
    static sort(cardA, cardB) {
        if (cardA.rank > cardB.rank) {
            return -1;
        } else if (cardA.rank < cardB.rank) {
            return 1;
        } else {
            return 0;
        }
    }
}

module.exports = Card;