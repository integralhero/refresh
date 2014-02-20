var models = require('../models');


exports.view = function(req, res){

	models.User
		.find()
		.exec(renderUsers);

	function renderUsers(err, users) {
		res.render('main', { 'friends': users });
	}

};