
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { 
	  title: 'Express',
	  author: {name: 'Lenny', age:67},
	  message: 'nice'
  });
};