var data = require("../public/friends.json");

exports.getUser = function(req, res){
  res.render('profile', {
		'data': data
	});
};