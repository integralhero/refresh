var models = require('../models');


exports.addUser = function(req, res) {
  var form_data = req.body;
  console.log(form_data);
  var newProject = new models.Project({
    "name": form_data['name']
  });
  newProject.save(afterSave);
  function afterSave(err) {
    if(err) {console.log(err); res.send(500);}
    res.send(200);
    res.redirect('/');
  }
  // make a new Project and save it to the DB
  // YOU MUST send an OK response w/ res.send();
}