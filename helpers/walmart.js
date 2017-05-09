var request = require("request");
var _ = require("underscore");
var orderBy = require("lodash.orderby");


// module.exports = function(app) {

var walmartApi = function(cb) {
    var wishListItem = "iphone6s";
    var search = 'http://api.walmartlabs.com/v1/search?query=' + wishListItem + '&format=json&apiKey=gv4fj48wed5epggnuwnrjt8c&numItems=8';

    request(search, function(error, response, body) {
        var walmartArray = [];
        if (!error && response.statusCode == 200) {
            for (var i = 0; i < JSON.parse(body).items.length; i++) {
                walmartArray.push({
                    "name": JSON.parse(body).items[i].name,
                    "salePrice": parseInt(JSON.parse(body).items[i].salePrice),
                    "productUrl": JSON.parse(body).items[i].productUrl
                });
                // console.log("=======================Walmart" + i + "===================================");
                // console.log("\n" + "Product Name: " + JSON.parse(body).items[i].name);
                // console.log("Price: $" + JSON.parse(body).items[i].salePrice);
                // console.log("Product URL: " + JSON.parse(body).items[i].productUrl + "\n");
            }
        }
        // console.log(walmartArray);
        console.log("======================Lowest Walmart price==================================");
        var walmartSorted = [];
        walmartSorted = (orderBy(walmartArray, ['salePrice'], ['asc']));
        console.log(walmartSorted[0].name);
        console.log(walmartSorted[0].salePrice);
        console.log(walmartSorted[0].productUrl);
        // return walmartSorted;
        cb(walmartSorted);
    });
};
// use: require("./helpers/walmart.js")(app); in file that will use walmart api object
module.exports = walmartApi;