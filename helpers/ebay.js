var request = require("request");
var _ = require("underscore");
var orderBy = require("lodash.orderby");
var Promise = require('promise');

var ebayApi = function(wList, cb) {
    xList = wList.split('\n');

    var ebayPromiseArray = [];
    for (var i = 0; i < xList.length; i++) {
        userInput = xList[i];

        var ebayPromise = new Promise(function(resolve, reject) {

            var search0 = 'https://svcs.ebay.com/services/search/FindingService/v1?SECURITY-APPNAME=JeffMcMa-WishList-PRD-2090fc79c-bc5ccb42&OPERATION-NAME=findItemsByKeywords&SERVICE-VERSION=1.0.0&RESPONSE-DATA-FORMAT=JSON&REST-PAYLOAD&keywords=iPhone5&paginationInput.entriesPerPage=10&GLOBAL-ID=EBAY-US&siteid=0';
            var search1 = 'https://svcs.ebay.com/services/search/FindingService/v1?SECURITY-APPNAME=JeffMcMa-WishList-PRD-2090fc79c-bc5ccb42&OPERATION-NAME=findItemsByKeywords&SERVICE-VERSION=1.0.0&RESPONSE-DATA-FORMAT=JSON&REST-PAYLOAD&keywords=' + userInput + '&paginationInput.entriesPerPage=10&GLOBAL-ID=EBAY-US&siteid=0';

            request(search1, function(error, response, body) {
                var ebayArray = [];
                if (!error && response.statusCode == 200) {
                    for (var i = 0; i < JSON.parse(body).findItemsByKeywordsResponse[0].searchResult[0].item.length; i++) {
                        ebayArray.push({
                            "name": JSON.parse(body).findItemsByKeywordsResponse[0].searchResult[0].item[i].title[0],
                            "salePrice": parseInt(JSON.parse(body).findItemsByKeywordsResponse[0].searchResult[0].item[i].sellingStatus[0].currentPrice[0].__value__),
                            "productUrl": JSON.parse(body).findItemsByKeywordsResponse[0].searchResult[0].item[i].viewItemURL[0]
                        });
                    }
                }
                console.log("==============================eBay lowest price===========================================");
                ebaySorted = (orderBy(ebayArray, ['salePrice'], ['asc']));
                console.log(ebaySorted[0].name);
                console.log(ebaySorted[0].salePrice);
                console.log(ebaySorted[0].productUrl);
                resolve(ebaySorted[0]);
            });
        });
        ebayPromiseArray.push(ebayPromise);
    }

    Promise.all(ebayPromiseArray).then(function(allResponses) {
        cb(allResponses);
    });
};

module.exports = ebayApi;