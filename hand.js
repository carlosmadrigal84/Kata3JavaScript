/**
 * Clase que va a almacenar las cartas de la mano
 * Calcula el rank de la jugada y su nombre
 */
var Card = require('./card');
var Plays = require('./plays');
var Draws = require('./empates');

class Hand {

    /**
     * Constructor que asigna las cartas y obtiene
     * la jugada con su rank y nombre
     */
    constructor(cards) {
        // creamos las cartas de la mano con la entrada
        let myCards = cards.map(c => new Card(c));
        // ordenamos las cartas y las asignamos
        this.cards = myCards.sort(Card.sort);

        // obtenemos la jugada de esta mano
        let play = Plays.getPlayForHand(this);

        // asignamos rango y nombre
        this.rank = play.rank;
        this.name = play.name;
    }

    /**
     * Compara esta mano con otra que se pasa como parametro
     * Devuelve -1/0/1 e indica si ha habido empate inicial
     */
    compare(otherHand) {
        let result = {};

        if (this.rank < otherHand.rank) {
            result.winner = 1;
            result.withDraw = false;
        } else if (this.rank > otherHand.rank) {
            result.winner = -1;
            result.withDraw = false;
        } else {
            const decideDraw = Draws.decideInRankWithThoHands(this, otherHand);
            result.withDraw = true;
            result.winner = decideDraw.winner;
            result.drawWinnerHand = decideDraw.drawWinnerHand;
        }

        return result;
    }

    /**
     * Metodo que cambia el valor de los Ases de la mano
     * para indicar un valor mas bajo.
     * 
     * Se utiliza para las escaleras que inician con As
     * y acaban en 5, para darles el valor mas bajo con
     * respecto a las otras escaleras
     */
    modifyAceValue() {
        this.cards = this.cards.map((card) => {
            if (card.rank == 12) {
                card.rank = -1;
            }
            return card;
        });
    }
}
module.exports = Hand;