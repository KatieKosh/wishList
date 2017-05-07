// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
var db = require("../models");



// routes
module.exports = function(app) {
    // GET, POST, PUT & DELETE routes go here

    // Getting First Submit info from cms.html (Title of wishlist, Category of Wishlist, String of emails, userID/AuthId (from current session)
    // Using the current ID, we can then link to the proper wishlist and contact list.
    // MNN
    // Expecting JSON:
    // userID: string
    // title: string
    // emails: string, comma separated Values
    // category: string
};