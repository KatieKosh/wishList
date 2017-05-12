$(document).ready(function() {
    // Getting jQuery references to the post body, title, form, and author select
    var listInput = $("#list");
    var titleInput = $("#listTitle");
    var emailInput = $("#emails");
    var categoryInput = $("#category");
    var cmsForm = $("#cms");

    // Adding an event listener for when the form is submitted
    $(cmsForm).on("submit", handleFormSubmit);

    // Gets the part of the url that comes after the "?" (which we have if we're updating a post)
    var url = window.location.search;
    var postId;
    var authorId;
    // Sets a flag for whether or not we're updating a post to be false initially
    var updating = false;

    // A function for handling what happens when the form to create a new post is submitted
    function handleFormSubmit(event) {
        event.preventDefault();
        console.log(titleInput.val());
        console.log(listInput.val());
        console.log(emailInput.val());
        console.log(categoryInput.val());

        // Wont submit the post if we are missing a body, title, or author
        if (!titleInput.val().trim() || !listInput.val().trim() || !emailInput.val()) {
            return;
        }
        // Constructing a newPost object to hand to the database
        var userList = {
            title: titleInput
                .val()
                .trim(),
            list: listInput
                .val()
                .trim(),
            emails: emailInput
                .val()
                .trim(),
            category: categoryInput

                .val()
                .trim(),
        };

        submitPost(userList);
        // submitList(userList.list);
        // console.log("working");
    }

    function submitPost(userList) {
        $.post("/api/cms", userList).done(function() {
            var requestBody = { wList: userList.list };
            $.post("/api/ebay", requestBody).done(function(sortedArray) {
                for (var i = 0; i < sortedArray.length; i++) {
                    if (i != (sortedArray.length - 1)) {
                        $.post("/api/items", sortedArray[i]).done(function() {
                            // console.log("item added!");
                        });
                    } else {
                        // If its the last item to add....
                        $.post("/api/items", sortedArray[i]).done(function() {
                            // console.log("item added! - Switching Pages...");
                            // Change this to change redirect.
                            window.location.href = "/db-test";
                        });
                    }
                }
            });
        });
    }
    // done(function(){console.log("nextpage")})
    // function submitPost(userList) {
    //     // On submit, adds user information
    //     // Then call ebay API
    //     $.post("/api/cms", userList).done(function () {
    //         console.log("User and WL init in DB");
    //     }).done(function () {
    //         // Ebay API call.
    //         console.log("Post req to Ebay API");
    //         var requestBody = { wList: userList.list };
    //         console.log("requestBody ", requestBody);
    //         $.post("/api/ebay", requestBody).done(function (sortedArray) {
    //             // Call to insert items into database.
    //             console.log("Return from Ebay API: ", sortedArray);
    //             sortedArray.forEach(function (item) {
    //                 $.post("/api/items", item).done(function () {
    //                     console.log("item added!");
    //                 });
    //             });
    //         });
    //     });
    // }

});

/*
[
{
"name": "Apple iPhone 4s - 16GB - Black (Verizon) Smartphone with LifeProof",
"salePrice": 56,
"productUrl": "http://www.ebay.com/itm/Apple-iPhone-4s-16GB-Black-Verizon-Smartphone-LifeProof-/162506382821"
},
{
"name": "Easton Mako Power Brigade pro grade Ash wood baseball bat 33/30",
"salePrice": 29,
"productUrl": "http://www.ebay.com/itm/Easton-Mako-Power-Brigade-pro-grade-Ash-wood-baseball-bat-33-30-/382037781498"
},
{
"name": "Xbox One 500 gb Console Powers On But No Picture For Parts",
"salePrice": 72,
"productUrl": "http://www.ebay.com/itm/Xbox-One-500-gb-Console-Powers-But-No-Picture-Parts-/152542049102"
}
]
*/