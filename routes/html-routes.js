// *********************************************************************************
// html-routes.js - this file offers a set of routes for sending users to the various html pages
// *********************************************************************************

// Dependencies
var path = require("path");
var passport = require('passport');
var env = {
  AUTH0_CLIENT_ID: process.env.AUTH0_CLIENT_ID,
  AUTH0_DOMAIN: process.env.AUTH0_DOMAIN,
  AUTH0_CALLBACK_URL: 'http://localhost:8080/callback'
};

// Routes
module.exports = function(app) {

	// We are also going to implement the callback route which will redirect the logged in user to the polls page if authentication succeeds.
	app.get('/callback',
      passport.authenticate('auth0', { failureRedirect: '/' }),
      function(req, res) {
        res.redirect(req.session.returnTo || '/');
    });

    app.get('/login',function(req, res){
        // Same thing for the login page.
        res.render('login', { env: env });
    });

    // index route loades index.html
    app.get("/", function(req, res) {
    	res.sendFile(path.join(__dirname, "../public/index.html"));
    });

    app.get("/cms", function(req, res) {
    	res.sendFile(path.join(__dirname, "../public/cms.html"));
    });

};