var data = require("../friends.json");

exports.index = function(req, res){
  res.render('main', {
		'data': data
	});
};