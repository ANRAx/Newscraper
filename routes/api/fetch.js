let router = require("express").Router();
let fetchControler = require("../../controllers/fetch");

router.get("/", fetchControler.scrapeHeadlines);

module.exports = router;

