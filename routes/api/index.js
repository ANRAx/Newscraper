let router = require("express").Router();
let fetchRoutes = require("./fetch");
let noteRoutes = require("./notes");
let headlineRoutes = require("./headlines");
let clearRoutes = require("./clear");

router.use("/fetch", fetchRoutes);
router.use("/notes", noteRoutes);
router.use("/headlines", headlineRoutes);
router.use("/clear", clearRoutes);

module.exports = router;
