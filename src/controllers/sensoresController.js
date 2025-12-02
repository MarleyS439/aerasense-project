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

// Função de buscar as pultimas medidas
function buscarUltimasMedidas(req, res) {
  const limite_linhas = 7;

  var idSensor = req.params.idSensor;

  console.log(`Recuperando as ultimas ${limite_linhas} medidas`);

  sensorModel
    .buscarUltimasMedidas(idSensor, limite_linhas)
    .then(function (resultado) {
      if (resultado.length > 0) {
        res.status(200).json(resultado);
      } else {
        res.status(204).send("Nenhum resultado encontrado!");
      }
    })
    .catch(function (erro) {
      console.log(erro);
      console.log(
        "Houve um erro ao buscar as ultimas medidas.",
        erro.sqlMessage,
      );
      res.status(500).json(erro.sqlMessage);
    });
}

// Função de buscar das medidas em tempo real
function buscarMedidasEmTempoReal(req, res) {
  var idSensor = req.params.idSensor;

  console.log(`Recuperando medidas em tempo real`);

  sensorModel
    .buscarMedidasEmTempoReal(idSensor)
    .then(function (resultado) {
      if (resultado.length > 0) {
        res.status(200).json(resultado);
      } else {
        res.status(204).send("Nenhum resultado encontrado!");
      }
    })
    .catch(function (erro) {
      console.log(erro);
      console.log(
        "Houve um erro ao buscar as ultimas medidas.",
        erro.sqlMessage,
      );
      res.status(500).json(erro.sqlMessage);
    });
}

module.exports = {
  listarSensores,
  buscarUltimasMedidas,
  buscarMedidasEmTempoReal,
};
