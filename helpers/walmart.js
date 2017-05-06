var request = require("request");


module.exports = function(app) {
    var wishListItem = "iphone6s";

    var search = 'http://api.walmartlabs.com/v1/search?query=' + wishListItem + '&format=json&apiKey=gv4fj48wed5epggnuwnrjt8c&numItems=3';

    request(search,

        function(error, response, body) {
            if (!error && response.statusCode == 200) {
                var walmartArray = [];
                for (var i = 0; i < JSON.parse(body).items.length; i++) {
                    walmartArray.push({ "name": JSON.parse(body).items[i].name }, { "salePrice": parseInt(JSON.parse(body).items[i].salePrice) }, { "productUrl": JSON.parse(body).items[i].productUrl });


                    // console.log("=======================Walmart" + i + "===================================");
                    // console.log("\n" + "Product Name: " + JSON.parse(body).items[i].name);
                    // console.log("Price: $" + JSON.parse(body).items[i].salePrice);
                    // // console.log("Product URL: " + JSON.parse(body).items[i].productUrl + "\n");
                    // console.log("=================================================================");
                }
                console.log(walmartArray);
                var lowestPrice = Math.min.apply(Math, walmartArray.map(function(o) { return o.salePrice; }));
                console.log("Low: " + lowestPrice);
                var walmartObj = walmartArray.find(function(o) { return o.salePrice == lowestPrice; });
                console.log("Lowest price Item: " + walmartObj);

            }

        });
};

// use: require("./helpers/walmart.js")(app); in file that will use walmart api object