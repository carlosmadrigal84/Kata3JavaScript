/**
 * Clase encargada de decidir que jugada tiene la mano
 */

class Plays {
    /**
     * Metodo para decidir la jugada.
     * 
     * Va recorriendo las jugadas de mayor a menor rango
     * para asignarle el peso y el nombre.
     */
    static getPlayForHand(hand) {
        const availablePlays = ['Carta Más Alta', 'Parejas', 'Dobles Parejas', 'Trio', 'Escalera', 'Color', 'Full', 'Poker', 'Escalera de color'];
        let result = {};

        if (this.isStraightFlush(hand)) {
            result.rank = 8;
        } else if (this.isFourOfAKind(hand)) {
            result.rank = 7;
        } else if (this.isFullHouse(hand)) {
            result.rank = 6;
        } else if (this.isFlush(hand)) {
            result.rank = 5;
        } else if (this.isStraight(hand)) {
            result.rank = 4;
        } else if (this.isThreeOfAKind(hand)) {
            result.rank = 3;
        } else if (this.isTwoPairs(hand)) {
            result.rank = 2;
        } else if (this.isPair(hand)) {
            result.rank = 1;
        } else {
            result.rank = 0;
        }

        result.name = availablePlays[result.rank];
        return result;
    }

    /**
     * Escalera de color
     * 
     * Si es escalera y ademas del mismo color
     */
    static isStraightFlush(hand) {
        return this.isFlush(hand) && this.isStraight(hand);
    }

    /**
     * Poker
     */
    static isFourOfAKind(hand) {
        let cardValues = hand.cards.map(card => card.value);
        let uniques = this.countUniques(cardValues);
        let duplicates = this.countDuplicates(cardValues);
        return ((uniques === 2) && (duplicates === 1));
    }

    /**
     * Full 
     */
    static isFullHouse(hand) {
        let cardValues = hand.cards.map(card => card.value);
        let uniques = this.countUniques(cardValues);
        let duplicates = this.countDuplicates(cardValues);
        return ((uniques === 2) && (duplicates === 2));
    }

    /**
     * Color
     */
    static isFlush(hand) {
        let cardSuits = hand.cards.map(card => card.suit);
        let uniques = this.countUniques(cardSuits);
        return uniques === 1;
    }

    /**
     * Escalera
     */
    static isStraight(hand) {
        let cardRanks = hand.cards.map(card => card.rank);
        const upStraight = this.isArrayConsecutive(cardRanks);
        let downStraight = false;

        // comprobamos escalera con 'A' al inicio hasta '5'
        if (!upStraight && cardRanks[0] === 12) {
            let cardRanksCopy = [...cardRanks];
            // quitamos el primer rango ('A')
            cardRanksCopy.shift();
            // metemos el valor '-1' en la ultima posicion ('A')
            cardRanksCopy.push(-1);
            // decidimos si es escalero con el nuevo array de rangos
            downStraight = this.isArrayConsecutive(cardRanksCopy);

            // si es escalera empezando en As cambiamos el valor de la mano
            if (downStraight) {
                hand.modifyAceValue();
            }
        }

        // escalera normal o empezando en AS
        return upStraight || downStraight;
    }

    /**
     * Trio
     */
    static isThreeOfAKind(hand) {
        let cardValues = hand.cards.map(card => card.value);
        let uniques = this.countUniques(cardValues);
        let duplicates = this.countDuplicates(cardValues);
        return ((uniques === 3) && (duplicates === 1));
    }

    /**
     * Doble pareja
     */
    static isTwoPairs(hand) {
        let cardValues = hand.cards.map(card => card.value);
        let uniques = this.countUniques(cardValues);
        let duplicates = this.countDuplicates(cardValues);
        return ((uniques === 3) && (duplicates === 2));
    }

    /**
     * Pareja
     */
    static isPair(hand) {
        let cardValues = hand.cards.map(card => card.value);
        let uniques = this.countUniques(cardValues);
        return uniques === 4;
    }

    /**
     * Funcion que te cuenta valores unicos
     */
    static countUniques(original) {
        const uniqueItems = new Set(original);
        return uniqueItems.size;
    }

    /**
     * Funcion que cuenta los duplicados
     */
    static countDuplicates(original) {
        const uniqueItems = new Set();
        const duplicates = new Set();
        for (const value of original) {
            if (uniqueItems.has(value)) {
                duplicates.add(value);
                uniqueItems.delete(value);
            } else {
                uniqueItems.add(value);
            }
        }
        return duplicates.size;
    }

    /**
     * Mira si un array tiene valores consecutivos
     * Lo hace con valor absoluto para evitar posibles
     * problemas con el orden de los valores
     */
    static isArrayConsecutive(original) {
        var i = 2, d;
        while (i < original.length) {
            d = original[i - 1] - original[i - 2];
            if (Math.abs(d) !== 1 || d !== (original[i] - original[i - 1])) {
                return false;
            }
            i++;
        }
        return true;
    }

}
module.exports = Plays;