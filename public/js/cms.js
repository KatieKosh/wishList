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
        console.log("working");
    }

    // Submits a new post and brings user to blog page upon completion
    // Check promise usage here. 
    // function submitPost(userList) {
    //     $.post("/api/cms", userList, function() {
            
    //         // API EBAY call, will respond w/ json
    //     }).then(function(ebayarray){
    //         $.post("/api/items", ebayarray, function () {
    //             // adding data to db
    //             // when done..
    //         }).done(function(){
    //             // window.location.href = "/posts";
    //         });
    //     });
    // }

    function submitPost(userList) {
        // Post the userlist data to db, then gather the data from Ebay/Walmart API, return results as json
        $.post("/api/cms", userList).done(function(apiArray){
            console.log(apiArray);
            for(var i = 0; i < apiArray.length; i++) {
                $.post("/api/items", apiArray[i]).done(function(){
                    console.log("apiArray[i] ", apiArray[i]);
                    console.log("item added..?");
                });
            }
        }).done(function(){
            window.location.href = "/posts";
        });
    }
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