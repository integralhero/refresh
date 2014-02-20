var data = require("../public/friends.json");
var models = require('../models');
exports.index = function(req, res){
  res.render('main', {
		'data': data,
		'user': req.user
	});
};



exports.view = function(req, res){

	models.User
		.find()
		.exec(renderUsers);

	function renderUsers(err, users) {
		res.render('main', { 'friends': users });
	}

};