$(document).ready(function () {
    // On click handler for get-emails button.
    $(".get-emails").click(function () {
        // Testing AuthId
        var authId = { authId: "nodice" };

        $.post("/api/emails", authId).done(function (contactsEmail) {
            var emailList = [];
            var contactList = contactsEmail[0].Contactlist.Contacts;
            for (var i = 0; i < contactList.length; i++) {
                emailList.push(contactList[i].email);
            }

            emailList.forEach(function (element) {
                var emailLine = $("<p>").text(element);
                $(".email-container").append(emailLine);
            })
            // emailList will be an array of email strings.
        });
    });

    // On click handler for get-items button.
    // This is for example. This can be done on load, etc.
    $(".get-items").click(function () {
        // Testing AuthId
        var authId = { authId: "nodice" };

        // Again, using post for determining which user is logged in.
        $.post("/api/useritems", authId).done(function (userItems) {
            var itemsArray = userItems[0].Wishlists[0].Items;
            // console.log("itemsArray ", itemsArray);
            for (var i = 0; i < itemsArray.length; i++) {
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

        });
    });
});