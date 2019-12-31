// CONTROLLER FOR SCRAPER
// ===========================================================

let db = require("../models");
let scrape = require("../scripts/scrape");

module.exports = {
    scrapeHeadline: function(req, res) {
        // scrape the NYT
        return scrape().then(function(articles) {
            // insert articles into the db
            return db.Headline.create(articles);            
        }).then(function(dbHeadline) {
            if (dbHeadline.length === 0) {
                res.json({
                    message: "No new articles today. Check back tomorrow!"
                });
            } else {
                // send back a caount of how many new articles we got
                res.json({
                    message: "Added " + dbHeadline.length + " new articles!"
                });
            }
        }).catch(function(err) {
            // This query won't insert articles with duplicate headlines but will error after inserting the others
            res.json({
                message: "Scrape complete!"
            });
        });
    }
};