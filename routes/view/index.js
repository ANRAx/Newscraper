let router = require("express").Router();
let db = require("../../models");

// route that renders homepage
router.get("/", function(req, res) {
    db.Headline.find({ saved: false })
        .sort({ date: -1 })
        .then(function(dbArticles) {
            res.render("home", { articles: dbArticles });
        });
});

// This route renders the saved handlebars page
router.get("/saved", function(req, res) {
    db.Headline.find({ saved: true })
        .sort({ date: -1 })
        .then(function(dbArticles) {
            res.render("saved", { articles: dbArticles});
        });
});

module.exports = router;

