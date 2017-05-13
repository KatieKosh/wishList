// *********************************************************************************
// html-routes.js - this file offers a set of routes for sending users to the various html pages
// *********************************************************************************

// Dependencies
var path = require("path");
var passport = require('passport');
var env = {
    AUTH0_CLIENT_ID: process.env.AUTH0_CLIENT_ID,
    AUTH0_DOMAIN: process.env.AUTH0_DOMAIN,
    // AUTH0_CALLBACK_URL: 'https://ancient-citadel-52749.herokuapp.com/callback'
    AUTH0_CALLBACK_URL: 'http://localhost:8080/callback'
};


// Routes
module.exports = function(app) {

    // We are also going to implement the callback route which will redirect the logged in user to the polls page if authentication succeeds.
    app.get('/callback',
        passport.authenticate('auth0', { failureRedirect: '/' }),
        function(req, res) {
            var authID = req.user.id;
            res.redirect(req.session.returnTo || '/cms');
        });

    app.get('/login', function(req, res) {
        // Same thing for the login page.
        res.render('login', { env: env });
    });

    app.get('/logout', function(req, res) {
        // For the logout page, we don't need to render a page, we just want the user to be logged out when they hit this page. We'll use the ExpressJS built in logout method, and then we'll redirect the user back to the homepage.
        req.logout();
        res.redirect('/');
    });

    app.post('/email', function(req, res) {
        var apiKey = process.env.MJ_APIKEY_PUBLIC,
        apiSecret = process.env.MJ_APIKEY_PRIVATE;

        var Mailjet = require('node-mailjet').connect(apiKey, apiSecret);

        var recipients = req.body.recipients;
        var textPart = req.body.textPart;


        var sendEmail = Mailjet.post('send');

        var emailData = {
            'FromEmail': 'zazador@gmail.com',
            'FromName': 'Wishlist App!',
            'Subject': 'Someone sent you a wishlist! :)',
            'Html-part': textPart,
            'Recipients': recipients,
        }

        sendEmail
        .request(emailData)
        .then()
        .catch();
        res.redirect('/final');
    })

    // index route loads index.html

    app.get("/", function(req, res) {
        res.sendFile(path.join(__dirname, "../public/index.html"));
    });

    app.get("/cms", function(req, res) {
        res.sendFile(path.join(__dirname, "../public/cms.html"));
    });

    app.get("/posts", function(req, res) {
        res.sendFile(path.join(__dirname, "../public/posts.html"));
    });

    app.get("/final", function(req, res) {
        res.sendFile(path.join(__dirname, "../public/final.html"));
    });

    // For testing database functions to front end
    app.get("/db-test", function(req, res) {
        res.sendFile(path.join(__dirname, "../public/db-test.html"))
    });

};