// Require our dependencies 
let express = require("express");
let mongoose = require("mongoose");
let exphbs = require("express-handlebars");

// Set port to be host's designated port or 3000
let PORT = process.env.PORT || 3000;

// Instantiate our Express App
let app = express();

// Require our routes
let routes = require("./routes");

// Parse thru request body as JSON
app.use(express.urlencoded({ extended: true}));
app.use(express.json());

// Make public a static folder 
app.use(express.static("public"));

// Connect Handlebars to express app
app.engine("handlebars", exhphbs({ defaultLayout: "main"}));
app.set("view engine", "handlebars");

// make each request go thru route middleware
app.use(routes);

// if deployed, use the deployed db. Otherwise, use local mongoHeadlines db
let MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

// Connect to the Mongo DB
mongoose.connect(MONGODB_URI);

// Listen on the port
app.listen(PORT, function() {
    console.log("Listening on port: " + PORT);
});