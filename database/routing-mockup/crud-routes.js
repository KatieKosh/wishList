// Dependent on Sequelize Model.
var db = require("../models");

// Routes as export
module.exports = function (app) {
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
- Create User, Wishlist, Contact List on Submit from Form
    Inserting User into user table, assign name and authId.
    Include and Link a wishlist
        Wishlist Title and category
    Include and Link a contact list
        Create contacts and list as well.
    
- Helper Function to pull emails.
*/

/* 
JSON: req.body...
{
    authID: string,
    title: string,
    emails: string,
    category: string
}

*/

// Helper functions: Turn Email comma lists into array of json-like objects to pass into Sequelize

// expects string of emails, separated by commas
// Returns trimmed array of emails.
function formatEmailList(emailList) {
    var rawList = emailList;
    var rawArray = rawList.split(",");
    var returnArray = rawArray.map(function (item) {
        return item.trim();
    });

    return returnArray;
}