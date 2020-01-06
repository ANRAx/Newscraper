// HEADLINE MODEL 
// ========================================

// Require mongoose
let mongoose = require("mongoose");
// Create schema class using a mongoose's schema method
let Schema = mongoose.Schema;

// Create the headlinesSchema with our schema class
let headlinesSchema = new Schema({
    // A String (headline) must be entered
    headline: {
        type: String,
        required: true,
        unique: { index: { unique: true } }
    },
    // A String (summary) must be entered
    summary: {
        type: String,
        required: true
    },
    // A String (URL) must be entered
    url: {
        type: String,
        required: true
    },
    // date is just a string
    date: {
        type: Date,
        default: Date.now
    },
    saved: {
        type: Boolean,
        default: false
    }
});

let Headline = mongoose.model("Headline", headlinesSchema);

module.exports = Headline;