var request = require("request");



module.exports = function(app) {
    var userInput = "iphone5";

    var search = 'https://svcs.ebay.com/services/search/FindingService/v1?SECURITY-APPNAME=JeffMcMa-WishList-PRD-2090fc79c-bc5ccb42&OPERATION-NAME=findItemsByKeywords&SERVICE-VERSION=1.0.0&RESPONSE-DATA-FORMAT=JSON&REST-PAYLOAD&keywords=' + userInput + '&paginationInput.entriesPerPage=6&GLOBAL-ID=EBAY-US&siteid=0';
    request(search,

        function(error, response, body) {
            if (!error && response.statusCode == 200) {
                console.log("\n" + "=================================ebay==========================================");
                console.log("Item: " + JSON.parse(body).findItemsByKeywordsResponse[0].searchResult[0].item[0].title[0]);
                console.log("Product Page URL: " + JSON.parse(body).findItemsByKeywordsResponse[0].searchResult[0].item[0].viewItemURL[0]);
                console.log("Product Image URL: " + JSON.parse(body).findItemsByKeywordsResponse[0].searchResult[0].item[0].galleryURL[0]);
                console.log("Price: $" + JSON.parse(body).findItemsByKeywordsResponse[0].searchResult[0].item[0].sellingStatus[0].currentPrice[0].__value__ + "\n");
                console.log("================================================================================");
            }
        });
};