/* jshint esversion:6 */


var express = require("express");
var cors = require('cors');

var app = express();

var PORT = process.env.port || 8000;

var Storage = require('./storage.js');
var storage = new Storage();

var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors());

app.use(function(req, res, next) {
	console.log(req.url);
	next();
});


app.get("/", function(req, res) {
	res.sendFile(__dirname + "/index.html");
});

app.post("/api/new-card", function(req, res) {
	var card = req.body.card;
	storage.addCard(card, (success) => {
			if (success) {
				res.send({status: "success", message: "New card added!"});
			} else {
				res.send({status: "error", message: "Could not add new card"});
			}
		});
});

app.get("/api/get-cards", function(req, res) {
	storage.getCards((cards) => {
		res.send(cards);
	});
});

app.get("/api/get-card/:id", function(req, res) {
	var cardId = req.params.id;
	storage.getCardById(cardId, (card) => {
		res.send(card);
	});
});

app.post("/api/delete-card", function(req, res) {
	var card = req.body.card;
	console.log(card);
	storage.deleteCard(card, (success) => {
		if (success) {
			res.send({status: "success", message: "Card deleted"});
		} else {
			res.send({status: "error", message: "Could not delete card"});
		}
	});
});

app.post("/api/add-contributor/:id", function(req, res) {
	var cardId = req.params.id;
	var newContributor = req.body.newContributor;
	storage.addContributor(newContributor, cardId, (card) => {
		console.log("server: add contrib", card);
		res.send(card);
	});
});

app.post("/api/remove-contributor/:id", function(req, res) {
	var cardId = req.params.id;
	var contributor = req.body;
	console.log(cardId);
	console.log(contributor);
	storage.removeContributor(contributor, cardId, (card) => {
		if (card) {
			res.send(card);
		} else {
			res.send({status: "error", message: "Could not delete card"});
		}
	});
});


app.use(function(req, res, next) {
	res.status(404);
	res.send("404 Error - File Not Found");
});


app.use(function(err, req, res, next) {
	console.log(err);
	res.status(500);
	res.send("500 Error - Server Error");
});


app.listen(PORT, function() {
	console.log("Listening on port " + PORT);
});

