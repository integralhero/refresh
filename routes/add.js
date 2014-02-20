var data = require("../friends.json");

exports.addFriend = function(req, res) {    
	var name = req.query.name;
	var description = req.query.description;
	var newFriend = new Object();
	newFriend.name = name;
	newFriend.description = description;
	newFriend.imageURL = "http://lorempixel.com/400/400/people";
	console.log("Name:" + name + ", Description: " + description);
	res.render('add');
	data["friends"].push(newFriend);
};