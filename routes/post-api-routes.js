// Dependent on Sequelize Model.
var db = require("../models");
var ebayApi = require("../helpers/ebay.js");
var walmartApi = require("../helpers/walmart.js");
var passport = require('passport');
var ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn();

// Helper functions: Turn Email comma lists into array of json-like objects to pass into Sequelize
// Expects string of emails, separated by commas
// Returns trimmed array of emails.
function formatEmailList(emailList) {
    var rawList = emailList;
    var rawArray = rawList.split(",");
    var returnArray = rawArray.map(function(item) {
        return item.trim();
    });

    return returnArray;
}


// Routes as export
module.exports = function(app) {
    // GET, POST, PUT & DELETE routes go here
    // req.user.id is the unique id of a user. user as auth ID

    // Retrieve session user's contact list
    // Currently using a post to carry a body for authentication. We can use a get if we have a way to identify the current session user.
    app.post("/api/emails", ensureLoggedIn, function (req, res) {
        // Tentative authentication
        var authId = req.user.id;

        db.User.findAll({
            where: {authId: authId},
            include: [{
                model: db.Contactlist,
                include: [{
                    model: db.Contact
                }]
            }]
        }).then(function(contact){
            res.json(contact);
        });
    });

    // Route to return all items as json.
    app.post("/api/useritems", ensureLoggedIn, function(req, res) {
        // Change as necessary
        var authId = req.user.id;

        db.User.findAll({
            where: {
                authId: authId
            },
            include: [{
                model: db.Wishlist,
                include: [{
                    model: db.Item
                }]
            }]
        }).then(function(user) {
            res.json(user);
        });
    });

    // Initial Creation Route. Create rows from user input.S
    // Change pointer as neccessary.
    app.post("/api/cms", ensureLoggedIn, function(req, res) {
        console.log("post-api-routes req.body: " + req.body);
        // Repackage request body for readability
        var attribute = {
            userName: req.body.name,
            userAuthId: req.user.id,
            wishlistTitle: req.body.title,
            wishlistCategory: req.body.category,
            rawEmails: req.body.emails,
            wishListItem: req.body.list
        };

        var emailArray = formatEmailList(attribute.rawEmails);

        // Create user row, assign unique authO ID
        db.User.create({
            authId: attribute.userAuthId,
            name: attribute.userName
        }
            // After user row created...
            ).then(function(user) {
                // Create and associate co  ntact list.
                // Create and associate contacts to contacts list.
                user.createContactlist({}).then(function(contactlist) {
                    emailArray.forEach(function(email) {
                        contactlist.createContact({
                            email: email
                        });
                    });
                });
                // Create and associate wishlist.
                user.createWishlist({
                    title: attribute.wishlistTitle,
                    category: attribute.wishlistCategory
                });
            }
            // Send list to API's
            ).then(function() {
            // send req.body.list to API
            console.log("API: " + attribute.wishListItem);


        }).then(function() {
            res.end();
        });
    });

    // Item adding route
    app.post("/api/items", ensureLoggedIn, function(req, res) {
        // Repackage names for readability.
        var attribute = {
            userAuthId: req.user.id,
            itemName: req.body.name,
            itemPrice: req.body.salePrice,
            itemUrl: req.body.productUrl,
            itemImgUrl: req.body.productImg
        };

        // Find userID via AuthID
        // Using findAll, so index 0 is for grabbing first item.
        db.User.findAll({
            where: {
                authId: attribute.userAuthId
            }

        }).then(function(user) {
            // console.log("Return of first search: ", user);
            // console.log("user id index 0: ", user[0].id);


            db.Wishlist.findAll({
                where: {
                    UserId: user[0].id
                }
            }).then(function(wishlist) {
                wishlist[0].createItem({
                    name: attribute.itemName,
                    best_price: attribute.itemPrice,
                    source_url: attribute.itemUrl,
                    img_url: attribute.itemImgUrl
                }).then(function() {
                    console.log("item added");
                    res.end();
                });
            });
        });
    });
};