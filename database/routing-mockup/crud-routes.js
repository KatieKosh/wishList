// Dependent on Sequelize Model.
var db = require("../models");

// Routes as export
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

/*
Routes needed:
- Create User on First Authentication
    Inserting User into user table, assign name and authId.

- Create Wishlist, Contact List on Submit from Form
    
- 
*/