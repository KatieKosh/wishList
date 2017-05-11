// Get models
var db = require("../models");

module.exports = function(app) {
    // Currently using a post to carry a body for authentication. We can use a get if we have a way to identify the current session user.
    app.post("/api/emails", function (req, res) {
        // Tentative authentication
        var authId = req.body.authId;

        db.User.findAll({
            where: {authId: authId},
            include: [{
                model: Contactlist,
                include: [{
                    model: Contact
                }]
            }]
        }).then(function(contact){
            res.json(user);
        });
    });
};