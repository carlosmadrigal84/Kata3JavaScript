var Game = require('./game');

const Jugador1 = ["2H", "3D", "5S", "9C", "KD"];
const Jugador2 = ["2S", "8S", "AS", "QS", "3S"];
let game = {};
let result = {};

if (Game.validHands(Jugador1, Jugador2)) {
	// inicializa el juego
	this.game = new Game(Jugador1, Jugador2);
	// resuelve el juego
	this.result = this.game.solve();
	// imprimimos resultado
	if (this.result.winner !== 0) {
		// -1 -> player 1 || 1 -> player 2
		let playerName = this.result.winner === -1 ? "Jugador 1" : "Jugador 2";

		if (this.result.withDraw) {
			console.log(playerName + " gana, " + this.result.handName + " (" + this.result.drawWinnerHand + ")");
		} else {
			console.log(playerName + " gana, " + this.result.handName);
		}
	} else {
		console.log("Empate");
	}
} else {
	console.log("Error en las manos");
}