var models = require('../models');


exports.addUser = function(req, res) {
  var form_data = req.body;
  console.log(form_data);
  var newUser = new models.User({
    "name": form_data['name']
  });
  newUser.save(afterSave);
  function afterSave(err) {
    if(err) {console.log(err); res.send(500);}
    res.send(200);
  }
  // make a new Project and save it to the DB
  // YOU MUST send an OK response w/ res.send();
}