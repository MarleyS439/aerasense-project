var express = require("express");
var router = express.Router();
var sensoresController = require("../controllers/sensoresController");

// Listar sensores da empresa
router.post("/listar/:idEmpresa", function (req, res) {
  sensoresController.listarSensores(req, res);
});

// Ultimas leituras
router.get("/ultimas/:idSensor", function (req, res) {
  sensoresController.buscarUltimasMedidas(req, res);
});

// Tempo real
router.get("/tempo-real/:idSensor", function (req, res) {
  sensoresController.buscarMedidasEmTempoReal(req, res);
});

module.exports = router;
