var express = require("express");
var router = express.Router();
var usuarioController = require("../controllers/usuarioController");

router.post("/cadastrar", function (req, res) {
  usuarioController.cadastrar(req, res);
});

// Rota POST para autenticar usuário
router.post("/autenticar", function (req, res) {
  usuarioController.autenticar(req, res);
});

router.post("/criarLog", function (req, res) {
  usuarioController.CriarLog(req, res);
});

// Rota para criar um registro de acesso do usuário
router.post("/registrar/log/", function (req, res) {
  usuarioController.criarLogUsuario(req, res);
});

router.post('/checkout', function(req,res){
  console.log('çpçpçpçpçpççpçpçpçpç');
  usuarioController.Checkout(req,res);
})

module.exports = router;
