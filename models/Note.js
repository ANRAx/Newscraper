// NOTE MODLE
// ============================================

// Require mongoose
let mongoose = require("mongoose");
// Create the schema class using mongoose's schema method
let Schema = mongoose.Schema;

// Create the noteSchema with the schema object
let noteSchema = new Schema({
    // headline is the article associated w/ the note
    _headlineId: {
        type: Schema.Types.ObjectId,
        ref: "Headline"
    },
    // date is just a string
    date: {
        type: Date,
        default: Date.now
    },
    // and so is noteText
    noteText: String
});

// create the Note model using the noteSchema
let Note = mongoose.model("Note", noteSchema);

// Export the Note model
module.exports = Note;