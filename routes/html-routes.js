// *********************************************************************************
// html-routes.js - this file offers a set of routes for sending users to the various html pages
// *********************************************************************************

// Dependencies
var path = require("path");

var ebayApi = require("../helpers/ebay.js");
var walmartApi = require("../helpers/walmart.js");

// Routes
module.exports = function(app) {

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

};