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
    app.post("/api/initialize", function (req, res) {
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
        ).then(function (user) {
            // Create and associate contact list.
            // Create and associate contacts to contacts list.
            user.createContactlist({}).then(function (contactlist) {
                emailArray.forEach(function (email) {
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
        }).then(function () {
            res.end();
        });
    });

    // Creating of items. One at a time, based on return from APIs
    app.post("/api/items", function (req, res) {
        // Repackage names for readability.
        var attribute = {
            userAuthId: req.body.userId,
            itemName: req.body.name,
            itemPrice: req.body.salePrice,
            itemUrl: req.body.productUrl,
            itemImgUrl: req.body.productImg
        };

        // Find userID via AuthID
        db.User.findOne({
            where: {
                authId: attribute.userAuthId
            }
        }).then(function (user) {
            db.Wishlist.findOne({
                where: {
                    UserId: user.id
                }
            }).then(function (wishlist) {
                wishlist.createItem({
                    name: attribute.itemName,
                    best_price: attribute.itemPrice,
                    source_url: attribute.itemUrl,
                    img_url: attribute.itemImgUrl
                });
            });
        }).then(function(){
            console.log("item added");
            res.end();
        });
    });
};

