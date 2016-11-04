/* jshint esversion:6 */

var fs = require('fs');
var data = fs.readFileSync('./data.json').toString();
var cards = JSON.parse(data);

function Storage() {
	this.addCard = (card, cb) => {
		var newCard = card;
		newCard.id = card.title + Math.floor(Math.random() * 1000000);
		console.log(newCard);
		cards.push(newCard);
		this.saveCard(cb);
	};

	this.saveCard = (cb) => {
		fs.writeFile(
			"./data.json",
			JSON.stringify(cards),
			(err) => {
				if (err) {
					console.log("Error writing cards to file");
					cb(false);
					return;
				}
				cb(true);
			}
		);
	};

	this.getCards = (cb) => {
		fs.readFile(
			"./data.json",
			(err, cards) => {
				if (err) {
					console.log("Error reading cards from file");
					cb(false);
					return;
				}
				cb(cards);
			}
		);
	};

	this.deleteCard = (card, cb) => {
		for (var i =0; i < cards.length; i++) {
			console.log(i);
			console.log(card.id);
			 if (cards[i].id === card.id) {
		      cards.splice(i, 1);
		   }
		}
		fs.writeFile(
			"./data.json",
			JSON.stringify(cards),
			(err) => {
				if (err) {
					console.log("Error writing cards to file");
					cb(false);
					return;
				}
				cb(true);
			}
		);
	};

	// this.addPerson = (person, cb) => {
	// 	people.push(person);
	// 	this.savePeople(cb);
	// };

	// this.savePeople = (cb) => {
	// 	fs.writeFile(
	// 		"./data.json",
	// 		JSON.stringify(people),
	// 		(err) => {
	// 			if (err) {
	// 				console.log("Error writing new person to file");
	// 				cb(false);
	// 				return;
	// 			}
	// 			cb(true);
	// 		}
	// 	);
	// };

	// this.getPeople = (cb) => {
	// 	fs.readFile(
	// 		"./data.json",
	// 		(err, people) => {
	// 			if (err) {
	// 				console.log("Error reading people from file");
	// 				cb(false);
	// 				return;
	// 			}
	// 			cb(people);
	// 		}
	// 	);
	// };

	this.getCardById = (card) => {
		for(var c of cards) {
			if(card.id === c.id) {
				return c;
			}
		}
	};
}

module.exports = Storage;