var models = require('../models');


exports.addUser = function(req, res) {
  var form_data = req.body;
  console.log(form_data);
  var newUser = new models.User({
    "name": form_data['name'],
    "password": form_data['password']
  });
  newUser.save(afterSave);
  function afterSave(err) {
    if(err) {console.log(err); res.send(500);}
    res.send(200);
  }
  // make a new Project and save it to the DB
  // YOU MUST send an OK response w/ res.send();
}

exports.login = function(req, res) {
  var form_data = req.body; //get json info
  var name = form_data['name'];
  var password = form_data['password'];
  models.User
    .find()
    .where('name').equals(name)
    .exec(validate)
  function validate(query) {
    if(query.length > 0) {//found matching name
      var correctPassword = query[0].validate(password);
      if(correctPassword) { //right password
        res.redirect('/home');
      }
      else {
        res.redirect('/');
      }
    }
  }
}