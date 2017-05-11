// *********************************************************************************
// data-routes.js - this file offers a set of routes for sending user wishlist items  to the various api's
// *********************************************************************************

var ebayApi = require("../helpers/ebay.js");
var walmartApi = require("../helpers/walmart.js");

// Routes
module.exports = function(app) {

    // data routes - loads walmart, ebay & amazon JSON data

    app.get("/api/ebay", function(req, res) {
        ebayApi(function(ebaySorted) {
            res.json(ebaySorted[0]);
        });
    });

    app.get("/api/walmart", function(req, res) {
        walmartApi(function(walmartSorted) {
            res.json(walmartSorted[0]);
        });
    });

    app.post("/api/cms", function(req, res) {
        console.log("Data-api-route req.body: " + req.body);
        userSearch = req.body.list;
    });



};