let router = require("express").Router();
let clearController = require("../../controllers/clear");

router.get("/", clearController.clearDB);

module.exports = router;