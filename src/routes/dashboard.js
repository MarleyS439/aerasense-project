var express = require("express");
var router = express.Router();
var dashboardController = require("../controllers/dashboardController");

router.get("/pegarsetores", function (req, res) {
  dashboardController.pegarsetores(req, res);
});

router.get("/pegaralertas", function (req, res) {
  dashboardController.pegaralertas(req, res);
});


router.post("/updateLido", function (req, res) {
  dashboardController.updateLido(req, res);
});

router.post("/pegarKPISensorproblema", function (req, res) {
  dashboardController.pegarKPISensorproblema(req, res);
});

router.post("/pegarKPIAlertasCriticos", function (req, res) {
  dashboardController.pegarKPIAlertasCriticos(req, res)
});

module.exports = router;


