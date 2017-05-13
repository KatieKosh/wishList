$(document).ready(function () {
    var itemString = "<ul>";
    // On click handler for get-emails button.
    $(".get-emails").click(function () {

        $.post("/api/emails").done(function (contactsEmail) {
            var emailList = [];
            var emailPostBody = [];
            var contactList = contactsEmail[0].Contactlist.Contacts;
            for (var i = 0; i < contactList.length; i++) {
                emailList.push(contactList[i].email);
            }

            // emailList.forEach(function (element) {
            //     var emailObj = {"Email": element};
            //     var emailLine = $("<p>").text(element);
            //     $(".email-container").append(emailLine);
            //     emailPostBody.push(emailObj);
            // })
            
            var requestObject = {
                recipients: emailPostBody,
                textPart: itemString 
            };
            $.post("/email", requestObject);
            // emailList will be an array of email strings.
        });
    });

    // On click handler for get-items button.
    // This is for example. This can be done on load, etc.
    // $(".get-items").click(function () {

    // Again, using post for determining which user is logged in.
    function retrieveItems() {
        $.post("/api/useritems").done(function (userItems) {
            var itemsArray = userItems[0].Wishlists[0].Items;
            // console.log("itemsArray ", itemsArray);
            for (var i = 0; i < itemsArray.length; i++) {
                // Build Email text body
                itemString += "<li>" +  itemsArray[i].name + " - $" + itemsArray[i].best_price + "<ul><li>" + itemsArray[i].source_url + "</ul></li></li>";


                // Building the DOM in jQuery
                var itemsBoxDOM = $("<div>").addClass("well well-lg");
                var itemsDataDOM = $("<div>").addClass("row");
                var itemsImageDOM = $("<div>").addClass("col-sm-3");
                var itemsPriceDOM = $("<div>").addClass("col-sm-9");
                itemsImageDOM.append($("<img>").attr("src", itemsArray[i].img_url));
                itemsPriceDOM.append($("<h3>").text(itemsArray[i].name));
                itemsPriceDOM.append($("<p>").text("$" + itemsArray[i].best_price));
                itemsPriceDOM.append($("<a>").attr("href", itemsArray[i].source_url).text("Link to item"));
                itemsDataDOM.append(itemsImageDOM);
                itemsDataDOM.append(itemsPriceDOM);
                itemsBoxDOM.append(itemsDataDOM);
                // Appending to the html.
                $(".items-container").append(itemsBoxDOM);
            }
            itemString += "</ul>";
        });
    }

    retrieveItems();
});