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
    function submitPost(userList) {
        $.post("/api/cms", userList, function() {
            window.location.href = "/posts";
        });
    }
});