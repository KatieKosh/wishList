$(document).ready(function () {
    // On click handler for get-emails button.
    $(".get-emails").click(function () {
        // Testing AuthId
        var authId = {authId: "nodice"}; 

        $.post("/api/emails", authId).done(function (contactsEmail) {
            var emailList = [];
            var contactList = contactsEmail[0].Contactlist.Contacts;
            for (var i = 0; i < contactList.length; i++) {
                emailList.push(contactList[i].email);
            }
            
            emailList.forEach(function(element){
                var emailLine = $("<p>").text(element);
                $(".email-container").append(emailLine);
            })
            // emailList will be an array of email strings.
        });
    });

    
});