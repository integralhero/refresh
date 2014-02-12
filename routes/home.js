var data = require("../public/friends.json");

exports.index = function(req, res){
  res.render('main', {
		'data': data
	});
};

/*
$(document).on("click", ".addFriend", function(e) {

	console.log(data);
    bootbox.prompt("Who do you want to add?", function(result) {                
	  if (result === null) {                                             
	    console.log("Prompt dismissed");                              
	  } else {
	  	var name = result;
	  	var picURL = 'http://upload.wikimedia.org/wikipedia/commons/6/66/J._C._R._Licklider.jpg';
	    var friend = {
	    	"name" : name,
	    	"description" : "",
	    	"imageURL" : picURL
	    };
	    console.log(friend);
	    data["friends"].push(friend);
	    console.log("after push");  
	    console.log(json["friends"]);                       
	  }
	});
	});*/