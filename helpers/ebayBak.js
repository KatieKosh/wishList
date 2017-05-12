var request = require("request");
var _ = require("underscore");
var orderBy = require("lodash.orderby");
var Promise = require('promise');

var ebayApi = function(wList, cb) {
    xList = wList.split('\n');

    var walmartPromiseArray = [];
    var ebayPromiseArray = [];
    for (var i = 0; i < xList.length; i++) {
        userInput = xList[i];

        var ebayPromise = new Promise(function(resolve, reject) {

            var ebaySearch = 'https://svcs.ebay.com/services/search/FindingService/v1?SECURITY-APPNAME=JeffMcMa-WishList-PRD-2090fc79c-bc5ccb42&OPERATION-NAME=findItemsByKeywords&SERVICE-VERSION=1.0.0&RESPONSE-DATA-FORMAT=JSON&REST-PAYLOAD&keywords=' + userInput + '&paginationInput.entriesPerPage=10&GLOBAL-ID=EBAY-US&siteid=0';

            request(ebaySearch, function(error, response, body) {
                var ebayArray = [];
                if (!error && response.statusCode == 200) {
                    for (var i = 0; i < JSON.parse(body).findItemsByKeywordsResponse[0].searchResult[0].item.length; i++) {
                        ebayArray.push({
                            "name": JSON.parse(body).findItemsByKeywordsResponse[0].searchResult[0].item[i].title[0],
                            "salePrice": parseInt(JSON.parse(body).findItemsByKeywordsResponse[0].searchResult[0].item[i].sellingStatus[0].currentPrice[0].__value__),
                            "productUrl": JSON.parse(body).findItemsByKeywordsResponse[0].searchResult[0].item[i].viewItemURL[0],
                            "productImg": JSON.parse(body).findItemsByKeywordsResponse[0].searchResult[0].item[i].galleryURL[0]
                        });
                    }
                }
                // console.log("==============================eBay lowest price===========================================");
                ebaySorted = (orderBy(ebayArray, ['salePrice'], ['asc']));
                // console.log(ebaySorted[0].name);
                // console.log(ebaySorted[0].salePrice);
                // console.log(ebaySorted[0].productUrl);
                // console.log(ebaySorted[0].productImg);
                resolve(ebaySorted[0]);
            });
        });
        ebayPromiseArray.push(ebayPromise);

        var walmartPromise = new Promise(function(resolve, reject) {

            var search = 'http://api.walmartlabs.com/v1/search?query=' + userInput + '&format=json&apiKey=gv4fj48wed5epggnuwnrjt8c&numItems=8';

            request(search, function(error, response, body) {
                var walmartArray = [];
                if (!error && response.statusCode == 200) {
                    for (var i = 0; i < JSON.parse(body).items.length; i++) {
                        walmartArray.push({
                            "name": JSON.parse(body).items[i].name,
                            "salePrice": parseInt(JSON.parse(body).items[i].salePrice),
                            "productUrl": JSON.parse(body).items[i].productUrl,
                            "productImg": JSON.parse(body).items[i].thumbnailImage
                        });
                    }
                }
                // console.log("======================Lowest Walmart price==================================");
                walmartSorted = (orderBy(walmartArray, ['salePrice'], ['asc']));
                // console.log(walmartSorted[0].name);
                // console.log(walmartSorted[0].salePrice);
                // console.log(walmartSorted[0].productUrl);
                // console.log(walmartSorted[0].productImg);
                resolve(walmartSorted[0]);
            });
        });
        walmartPromiseArray.push(walmartPromise);
    }




    Promise.all(ebayPromiseArray).then(function(allResponses) {
        console.log(ebayPromiseArray);
        console.log(walmartPromiseArray);
        cb(allResponses);
    });
};

module.exports = ebayApi;