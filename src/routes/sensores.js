var express = require("express");
var router = express.Router();
var sensoresController = require("../controllers/sensoresController");

// Listar sensores da empresa
router.post("/listar/:id", function (req, res) {
  sensoresController.listarSensores(req, res);
});

module.exports = router;
