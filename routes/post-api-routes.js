// Dependent on Sequelize Model.
var db = require("../models");

// Helper functions: Turn Email comma lists into array of json-like objects to pass into Sequelize
// Expects string of emails, separated by commas
// Returns trimmed array of emails.
function formatEmailList(emailList) {
    var rawList = emailList;
    var rawArray = rawList.split(",");
    var returnArray = rawArray.map(function (item) {
        return item.trim();
    });

    return returnArray;
}


// Routes as export
module.exports = function (app) {
    // GET, POST, PUT & DELETE routes go here
    /* 
    Assumptions for req.body:
    JSON: req.body...
    {
        authId: string,
        title: string,
        emails: string,
        category: string,
        ...etc
    }
    */

    // Initial Creation Route
    // Change pointer as neccessary.
    app.post("/api/test", function (req, res) {
        // Repackage request body for readability
        var attribute = {
            userName: req.body.name,
            userAuthId: req.body.authId,
            wishlistTitle: req.body.title,
            wishlistCategory: req.body.category,
            rawEmails: req.body.emails
        };

        var emailArray = formatEmailList(attribute.rawEmails);

        // Create user row, assign unique authO ID
        db.User.create(
            {
                authId: attribute.userAuthId,
                name: attribute.userName
            }
        // After user row created...
        ).then(function(user) {
        // Create and associate contact list.
        // Create and associate contacts to contacts list.
            user.createContactlist({}).then(function(contactlist) {
                emailArray.forEach( function(email){
                    contactlist.createContact(
                        {
                            email: email
                        });
                });
            });
        // Create and associate wishlist.
            user.createWishlist(
                {
                    title: attribute.wishlistTitle,
                    category: attribute.wishlistCategory
                }
            );   
        }).then( function(){
            res.end();
        });
    });
};

