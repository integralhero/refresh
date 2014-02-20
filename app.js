
/**
 * Module dependencies.
 */
var express = require('express');
var jsdom = require('jsdom');
var routes = require('./routes');
var user = require('./routes/user');
var home = require('./routes/home');
var profile = require('./routes/profile');
var how = require('./routes/how');
var http = require('http');
var path = require('path');
var exphbs = require('express3-handlebars');
var app = express();
var cons = require('consolidate');
var cloudinary = require('cloudinary');
var config = require('./oauth.js');
var mongoose = require('mongoose');
var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;


// serialize and deserialize
passport.serializeUser(function(user, done) {
done(null, user);
});
passport.deserializeUser(function(obj, done) {
done(null, obj);
});

var local_database_name = 'rally';
var local_database_uri  = 'mongodb://localhost/' + local_database_name
var database_uri = process.env.MONGOLAB_URI || local_database_uri
mongoose.connect(database_uri);

// config
passport.use(new FacebookStrategy({
 clientID: config.facebook.clientID,
 clientSecret: config.facebook.clientSecret,
 callbackURL: config.facebook.callbackURL,
 profileFields: ['id', 'displayName', 'photos']
},
function(accessToken, refreshToken, profile, done) {
 process.nextTick(function () {
   return done(null, profile);
 });
}
));

var app = express();
// all environments
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'handlebars');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

app.configure(function() {
	//app.set('views', __dirname + '/views');
	app.use(express.logger());
	app.use(express.cookieParser());
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(express.session({ secret: 'my_precious' }));
	app.use(passport.initialize());
	app.use(passport.session());
	app.use(app.router);
	app.use(express.static(__dirname + '/public'));
});

// routes
/*
app.get('/node', ensureAuthenticated, function(req, res){
	console.log("HELLO");
	res.render('home', { user: req.user });
});
*/

app.get('/',  function(req, res){
	console.log(req.user + "------------------------------------------------------");
	if(req.user) res.redirect("/home");
	res.render('home', { user: req.user, layout: false });
	
});

app.get('/profile', function(req, res){
	res.render('main', { user: req.user});

});

app.get('/auth/facebook', passport.authenticate('facebook', { display: 'popup' }));
app.get('/auth/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/hom', successRedirect: "/home"}));

app.get('/logout', function(req, res){
	req.logout();
	res.redirect('/');
});

// test authentication
function loggedIn(req, res, next) {
	if (req.isAuthenticated()) { 
		return next(); 
	} 
	console.log("NOT AUTHORIZED----------------------------------------------------------");
	res.redirect("/");
	
}

cloudinary.config({ 
  cloud_name: 'dqoghmerz', 
  api_key: '584839643982217', 
  api_secret: 'vLp3SltT9L9TkQGbhiZwNUOytAw' 
});

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}


app.get('/', routes.index);
app.get('/home', home.view);
app.get('/profile', profile.getUser);
app.get('/how', how.getPage);
app.post('/user/new', user.addUser);
app.post('/user/login', user.login);
http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
