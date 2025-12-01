var dashboardModel = require("../models/dashboardModel");


function pegarsetores(req, res) {

  dashboardModel.pegarsetores().then(function (resposta) {
    if (resposta) {
      console.log("Quey feita com sucesso");
      return res.status(200).send(resposta);
    } else {
      console.log("Quey NÂO feita com sucesso");

    }
  }).catch(function (erro) {
    console.log("Ocorreu um erro ao realizar a requisição: ", erro);
    return res.status(500).send(erro);
  });
}





function pegarKPISensorproblema(req, res) {
  console.log("PEGANDOBBBBBBBBBBb")
  var idEmpresa = req.body.ID_EMPRESA

  dashboardModel.pegarKPISensorproblema(idEmpresa)
    .then(function (dadosSensorProblema) {
      console.log("PEGANDOB")
      if (dadosSensorProblema) {
        console.log("Quey feita com sucesso");
       return res.status(200).send(dadosSensorProblema);
  

      } else {
        console.log("Quey NÂO feita com sucesso");
      }
    }).catch(function (erro) {
      console.log("Ocorreu um erro ao realizar a requisição: ", erro);
      return res.status(500).send(erro);
    });



}


module.exports = {
  pegarsetores,
  pegarKPISensorproblema
};
