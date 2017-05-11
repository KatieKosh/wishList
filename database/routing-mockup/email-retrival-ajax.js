// This is a code snippet. Please copy and change variables where needed.

// Jquery post route from "Posts" page for sending email.

// Ajax post request (using post to pass in authentication.)
// authId is a user's unique id for a session.
var authId = {authId: "USERS' UNIQUE ID"};
$.post("/api/emails", authId).done(function(contactsEmail){
    var emailList = [];
    var contactList = contactsEmail[0].Contactlist.Contacts;
    for (var i = 0; i < contactList.length; i++) {
        emailList.push(contactList[i].email);
    }

    // emailList will be an array of email strings.
});