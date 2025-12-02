var sensorModel = require("../models/sensorModel");

function listarSensores(req, res) {
  var idEmpresa = req.body.idEmpresa;

  sensorModel
    .listarSensores(idEmpresa)
    .then(function (resposta) {
      if (resposta) {
        console.log("Query feita com sucesso");
        return res.status(200).send(resposta);
      } else {
        console.log("Query NÂO feita com sucesso");
      }
    })
    .catch(function (erro) {
      console.log("Ocorreu um erro ao realizar a requisição: ", erro);
      return res.status(500).send(erro);
    });
}

module.exports = {
  listarSensores,
};
