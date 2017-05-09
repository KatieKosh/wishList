var request = require("request");
var _ = require("underscore");
var orderBy = require("lodash.orderby");


module.exports = function(app) {
    var wishListItem = "iphone6s";

    var search = 'http://api.walmartlabs.com/v1/search?query=' + wishListItem + '&format=json&apiKey=gv4fj48wed5epggnuwnrjt8c&numItems=8';

    request(search,

        function(error, response, body) {
            var walmartArray = [];
            if (!error && response.statusCode == 200) {
                for (var i = 0; i < JSON.parse(body).items.length; i++) {
                    walmartArray.push({
                        "name": JSON.parse(body).items[i].name,
                        "salePrice": parseInt(JSON.parse(body).items[i].salePrice),
                        "productUrl": JSON.parse(body).items[i].productUrl
                    });
                    console.log("=======================Walmart" + i + "===================================");
                    console.log("\n" + "Product Name: " + JSON.parse(body).items[i].name);
                    console.log("Price: $" + JSON.parse(body).items[i].salePrice);
                    console.log("Product URL: " + JSON.parse(body).items[i].productUrl + "\n");
                }
            }
            // console.log(walmartArray);
            console.log("======================Lowest Walmart price==================================");
            var walmartSorted = [];
            walmartSorted = (orderBy(walmartArray, ['salePrice'], ['asc']));
            console.log(walmartSorted[0].name);
            console.log(walmartSorted[0].salePrice);
            console.log(walmartSorted[0].productUrl);
            return walmartSorted;


            // var arr = Object.keys(walmartArray).map(function(key) { return walmartArray[key]; });
            // var min = Math.min.apply(null, arr);

            // console.log(arr);
            // console.log(min);

            // var walmartLowest = [];
            // var temp;
            // var min = Number.POSITIVE_INFINITY;
            // for (var j = JSON.parse(body).items.length - 1; j >= 0; j--) {
            //     temp = JSON.parse(body).items[j].salePrice;
            //     console.log("line44 " + temp);
            //     if (temp < min) {
            //         min = temp;

            //     }
            //     console.log("line49 " + min);
            //     walmartLowest.push(min);
            // }
            // console.log("line57 " + walmartLowest);

            // Array.min = function(array) {
            //     return Math.min.apply(Math, array);
            // };

            // var Xmin = walmartLowest.indexOf(Array.min(walmartLowest));
            // console.log(Xmin);
            // console.log(walmartArray[Xmin]);

            // function compare(a, b) {
            //     if (a.walmartArray.salePrice < b.walmartArray.salePrice) {
            //         return -1;
            //     }
            //     if (a.walmartArray.salePrice > b.walmartArray.salePrice) {
            //         return 1;
            //     }
            //     return 0;
            // }
            // walmartArray.sort(compare);
            // console.log(walmartArray);


        }
    );
};
// use: require("./helpers/walmart.js")(app); in file that will use walmart api object