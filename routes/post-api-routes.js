// Dependent on Sequelize Model.
var db = require("../models");
var ebayApi = require("../helpers/ebay.js");
var walmartApi = require("../helpers/walmart.js");

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

    // Route to return all items as json.
    app.post("/api/useritems", function(req, res) {
        // Change as necessary
        var authId = req.body.authId;

        db.User.findAll({
            where: {
                authId: authId
            },
            include: [{
                model: Wishlist,
                include: [{
                    model: Item
                }]
            }]
        }).then(function(user) {
            res.json(user);
        });
    });

    // Initial Creation Route. Create rows from user input.S
    // Change pointer as neccessary.
    app.post("/api/cms", function(req, res) {
        console.log(req.body);
        // Repackage request body for readability
        var attribute = {
            userName: req.body.name,

            userAuthId: req.body.authId,
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
            ).then(function(list) {
                // send req.body.list to API
                console.log("API: " + attribute.wishListItem);
                var wList = attribute.wishListItem;

                app.get("/api/ebay", function(req, res) {
                    ebayApi(wList, function(ebaySortedArray) {
                        res.json(ebaySortedArray);
                    });
                });


            })
            .then(function() {
                res.end();
            });
    });

    // Item adding route
    app.post("/api/items", function(req, res) {
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