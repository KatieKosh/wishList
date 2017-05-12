// *****************************************************************************
// Server.js - This file is the initial starting point for the Node/Express server.
//
// ******************************************************************************
// *** Dependencies
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var dotenv = require('dotenv');
var passport = require("passport");
var Auth0Strategy = require("passport-auth0");

dotenv.load();

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 8080;
app.set('views', path.join(__dirname, 'public'));
app.set('view engine', 'jade');

// Requiring our models for syncing
var db = require("./models");

// This will configure Passport to use Auth0
var strategy = new Auth0Strategy({
	domain: process.env.AUTH0_DOMAIN,
	clientID: process.env.AUTH0_CLIENT_ID,
	clientSecret: process.env.AUTH0_CLIENT_SECRET,
	callbackURL: 'http://localhost:8080/callback'
}, function(accessToken, refreshToken, extraParams, profile, done) {
    // profile has all the information from the user
    return done(null, profile);
});

// Here we are adding the Auth0 Strategy to our passport framework
passport.use(strategy);

// The searlize and deserialize user methods will allow us to get the user data once they are logged in.
passport.serializeUser(function(user, done) {
	done(null, user);
});

passport.deserializeUser(function(user, done) {
	done(null, user);
});

app.use(cookieParser());

// Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

app.use(session({
	secret:"shhhh",
	resave:true,
	saveUninitialized: true
}));

// Static directory
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static("./public"));

// Routes =============================================================

require("./routes/html-routes.js")(app);
require("./routes/post-api-routes.js")(app);
require("./routes/list-api-routes.js")(app);
// require("./routes/data-api-routes.js")(app);

// Syncing our sequelize models and then starting our express app

db.sequelize.sync({force: false}).then(function() {
	app.listen(PORT, function() {
		console.log("App listening on PORT " + PORT);
	});
});

//Here is working code to send emails... oh boy!

// const sendmail = require('sendmail')();

// sendmail({
// 	from: 'nodewishlist@mail.com',
// 	to: 'nodewishlist@mail.com',
// 	subject: 'test sendmail',
// 	html: 'Mail of test sendmail ',
// }, function(err, reply) {
// 	console.log(err && err.stack);
// 	console.dir(reply);
// });

var apiKey = process.env.MJ_APIKEY_PUBLIC,
apiSecret = process.env.MJ_APIKEY_PRIVATE;

var Mailjet = require('node-mailjet').connect(apiKey, apiSecret);


var sendEmail = Mailjet.post('send');

var emailData = {
	'FromEmail': 'zazador@gmail.com',
	'FromName': 'My Name',
	'Subject': 'Test with the NodeJS Mailjet wrapper',
	'Text-part': 'Hello NodeJs !',
	'Recipients': [{'Email': 'zazador@gmail.com'}],
}

sendEmail
.request(emailData)
.then()
.catch();






