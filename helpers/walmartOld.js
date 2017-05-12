var request = require("request");
var _ = require("underscore");
var orderBy = require("lodash.orderby");
var Promise = require('promise');

var walmartApi = function(wlist, cb) {
    xList = wList.split('\n');

    var walmartPromiseArray = [];
    for (var i = 0; i < xList.length; i++) {
        userInput = xList[i];

        var walmartPromise = new Promise(function(resolve, reject) {

            var search = 'http://api.walmartlabs.com/v1/search?query=' + userInput + '&format=json&apiKey=gv4fj48wed5epggnuwnrjt8c&numItems=8';

            request(search, function(error, response, body) {
                var walmartArray = [];
                if (!error && response.statusCode == 200) {
                    for (var i = 0; i < JSON.parse(body).items.length; i++) {
                        walmartArray.push({
                            "name": JSON.parse(body).items[i].name,
                            "salePrice": parseInt(JSON.parse(body).items[i].salePrice),
                            "productUrl": JSON.parse(body).items[i].productUrl
                        });
                    }
                }
                console.log("======================Lowest Walmart price==================================");
                walmartSorted = (orderBy(walmartArray, ['salePrice'], ['asc']));
                console.log(walmartSorted[0].name);
                console.log(walmartSorted[0].salePrice);
                console.log(walmartSorted[0].productUrl);
                resolve(walmartSorted[0]);
            });
        });
        walmartPromiseArray.push(walmartPromise);
    }

    Promise.all(walmartPromiseArray).then(function(allResponses) {
        cb(allResponses);
    });
};

module.exports = walmartApi;