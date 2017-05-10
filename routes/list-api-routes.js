module.exports = function(app) {

    app.post("/api/cms", function(req, res) {
        console.log(req.body);
        res.json(list);
    });
};