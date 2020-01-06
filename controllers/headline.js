// CONTROLLER FOR HEADLINES
// ====================================

let db = require("../models");

module.exports = {
    // Finds all headlines, sorts them by date, sends back to user
    findAll: function(req, res) {
        db.Headline
            .find(req.query)    
            .sort({ date: -1 })
            .then(function(dbHeadline) {
                res.json(dbHeadline);
            });
    },
    // Deletes the specified headline
    delete: function(req, res) {
        db.Headline.remove({ _id: req.params.id }).then(function(dbHeadline) {
            res.json(dbHeadline);
        });
    },
    // Update the specified headline
    update: function(req, res) {
        db.Headline.findOneAndUpdate({ _id: req.params.id }, { $set: req.body }, { new: true}).then(function(dbHeadline) {
            res.json(dbHeadline);
        });
    }
};