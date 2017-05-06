var request = require("request");

var search = 'https://svcs.ebay.com/services/search/FindingService/v1?SECURITY-APPNAME=JeffMcMa-WishList-PRD-2090fc79c-bc5ccb42&OPERATION-NAME=findItemsByKeywords&SERVICE-VERSION=1.0.0&RESPONSE-DATA-FORMAT=JSON&REST-PAYLOAD&keywords=iPhone&paginationInput.entriesPerPage=6&GLOBAL-ID=EBAY-US&siteid=0'

request(search,

    function(error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log(JSON.parse(body).findItemsByKeywordsResponse[0].searchResult[0].item[0].title[0]);
            console.log(JSON.parse(body).findItemsByKeywordsResponse[0].searchResult[0].item[0].viewItemURL[0]);
            console.log(JSON.parse(body).findItemsByKeywordsResponse[0].searchResult[0].item[0].sellingStatus[0].currentPrice[0].__value__);


        }
        return body;
    });
console.log("working?")