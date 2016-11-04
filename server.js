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

// app.post("/api", function(req, res) {
// 	var person = req.body.person;
// 	storage.addPerson(person, (success) => {
// 			if (success) {
// 				res.send({status: "success", message: "Person added!"});
// 			} else {
// 				res.send({status: "error", message: "Could not add person"});
// 			}
// 		});
// });

// app.get("/api", function(req, res) {
// 	storage.getPeople((people) => {
// 		res.send(people);
// 	});
// });


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

