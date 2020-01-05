let router = require("express").Router();
let fetchControler = require("../../controllers/fetch");

router.get("/", fetchControler.scrapeHeadline);

module.exports = router;

