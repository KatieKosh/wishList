// This is a code snippet. Please copy and change variables where needed.

// Jquery post route from "Posts" page for sending email.

// Ajax post request (using post to pass in authentication.)
// authId is a user's unique id for a session.
var authId = {authId: "USERS' UNIQUE ID"};
$.post("/api/emails", authId).done(function(emails){

});