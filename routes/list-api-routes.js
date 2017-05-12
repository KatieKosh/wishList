module.exports = function(app) {

    app.post("/api/cms", function(req, res) {
        console.log("list-api-route req.body: " + req.body);
        res.json(req.body);
    });
};