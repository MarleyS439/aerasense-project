var express = require("express");
var router = express.Router();
var dashboardController = require("../controllers/dashboardController");

router.get("/pegarsetores", function (req, res) {
  dashboardController.pegarsetores(req, res);
});


module.exports = router;
