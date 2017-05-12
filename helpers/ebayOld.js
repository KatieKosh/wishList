var request = require("request");
var _ = require("underscore");
var orderBy = require("lodash.orderby");
var Promise = require('promise');



// function ebayApi(wList,cb) {
// var ebayApi = function(cb) {
var ebayApi = function(wList, cb) {
    // var ebaySorted = [];
    var ebaySortedArray = [];
    // var userInput = "iphone5";
    console.log(wList);
    xList = wList.split('\n');
    console.log(xList);


    for (var i = 0; i < xList.length; i++) {
        var ebaySorted = [];
        // vasr ebaySortedArray = [];
        userInput = xList[i];
        console.log("============ebay.js==============");
        console.log(userInput);


        var search0 = 'https://svcs.ebay.com/services/search/FindingService/v1?SECURITY-APPNAME=JeffMcMa-WishList-PRD-2090fc79c-bc5ccb42&OPERATION-NAME=findItemsByKeywords&SERVICE-VERSION=1.0.0&RESPONSE-DATA-FORMAT=JSON&REST-PAYLOAD&keywords=iPhone5&paginationInput.entriesPerPage=10&GLOBAL-ID=EBAY-US&siteid=0';
        var search1 = 'https://svcs.ebay.com/services/search/FindingService/v1?SECURITY-APPNAME=JeffMcMa-WishList-PRD-2090fc79c-bc5ccb42&OPERATION-NAME=findItemsByKeywords&SERVICE-VERSION=1.0.0&RESPONSE-DATA-FORMAT=JSON&REST-PAYLOAD&keywords=' + userInput + '&paginationInput.entriesPerPage=10&GLOBAL-ID=EBAY-US&siteid=0';

        request(search1, function(error, response, body) {
            var ebayArray = [];
            // var ebaySortedArray = [];
            if (!error && response.statusCode == 200) {
                for (var i = 0; i < JSON.parse(body).findItemsByKeywordsResponse[0].searchResult[0].item.length; i++) {
                    ebayArray.push({
                        "name": JSON.parse(body).findItemsByKeywordsResponse[0].searchResult[0].item[i].title[0],
                        "salePrice": parseInt(JSON.parse(body).findItemsByKeywordsResponse[0].searchResult[0].item[i].sellingStatus[0].currentPrice[0].__value__),
                        "productUrl": JSON.parse(body).findItemsByKeywordsResponse[0].searchResult[0].item[i].viewItemURL[0]
                    });

                    // console.log("\n" + "=================================ebay" + i + "==========================================");
                    // console.log("Item: " + JSON.parse(body).findItemsByKeywordsResponse[0].searchResult[0].item[i].title[0]);
                    // console.log("Product Page URL: " + JSON.parse(body).findItemsByKeywordsResponse[0].searchResult[0].item[i].viewItemURL[0]);
                    // console.log("Product Image URL: " + JSON.parse(body).findItemsByKeywordsResponse[0].searchResult[0].item[i].galleryURL[0]);
                    // console.log("Price: $" + JSON.parse(body).findItemsByKeywordsResponse[0].searchResult[0].item[i].sellingStatus[0].currentPrice[0].__value__ + "\n");
                }
            }
            console.log("==============================eBay lowest price===========================================");
            ebaySorted = (orderBy(ebayArray, ['salePrice'], ['asc']));
            console.log(ebaySorted[0].name);
            console.log(ebaySorted[0].salePrice);
            console.log(ebaySorted[0].productUrl);
            // cb(ebaySorted);
            // return ebaySorted;
            ebaySortedArray.push(ebaySorted[0]);
            console.log("59");
            console.log(ebaySortedArray);
            // cb(ebaySortedArray);
            // return ebaySortedArray;
        });
        console.log("oh no robots");
        // ebaySortedArray.push(ebaySorted);
        // cb(ebaySortedArray);
        // console.log("67");
        // console.log(ebaySortedArray);
        // return ebaySortedArray;

    }
    // cb(ebaySortedArray);

};

// };
module.exports = ebayApi;