var request = require("request");

var search = 'http://api.walmartlabs.com/v1/search?query=ipod&format=json&apiKey=gv4fj48wed5epggnuwnrjt8c&numItems=1';

request(search,

    function(error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log("Product Name: " + JSON.parse(body).items[0].name);
            console.log("Sale Price: $" + JSON.parse(body).items[0].salePrice + ".00");
            console.log("Product URL: " + JSON.parse(body).items[0].productUrl);
        }
        return body;
    });
console.log("working?")