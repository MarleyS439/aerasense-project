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




//sensoresProblemas
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
function pegaralertas(req, res) {
  
  dashboardModel.pegaralertas().then(function (resposta) {
      if (resposta) {
        console.log("Quey feita com sucesso");
        return res.status(200).send(resposta);
      }else{
        console.log("Quey NÂO feita com sucesso");

      }
    }).catch(function (erro) {
      console.log("Ocorreu um erro ao realizar a requisição: ", erro);
      return res.status(500).send(erro);
    });
}


function updateLido(req, res) {
  

  var idAlerta = req.body.idAlerta
  var Lido = req.body.lido
  
  dashboardModel.updateLido(idAlerta,Lido).then(function (resposta) {
      if (resposta) {
        console.log("Quey feita com sucesso");
        return res.status(200).send(resposta);
      }else{
        console.log("Quey NÂO feita com sucesso");
      }
    }).catch(function (erro) {
      console.log("Ocorreu um erro ao realizar a requisição: ", erro);
      return res.status(500).send(erro);
    });
}











//alertasCriticos
function pegarKPIAlertasCriticos(req, res) {
  console.log("PEGANDOBBBBBBBBBBb")
  var idEmpresa = req.body.ID_EMPRESA

  dashboardModel.pegarKPIAlertasCriticos(idEmpresa)
    .then(function (dadosAlertasCriticos) {
      console.log("PEGANDOB")
      if (dadosAlertasCriticos) {
        console.log("Quey feita com sucesso");
       return res.status(200).send(dadosAlertasCriticos);
  

      } else {
        console.log("Quey NÂO feita com sucesso");
      }
    }).catch(function (erro) {
      console.log("Ocorreu um erro ao realizar a requisição: ", erro);
      return res.status(500).send(erro);
    });

}

function KPIMaiorPropCriticos(req, res) {
  var IdEmpresa = req.body.ID_EMPRESA
  
  dashboardModel.KPIMaiorPropCriticos(IdEmpresa).then(function (resposta) {
      if (resposta) {
        console.log("Quey feita com sucesso");
        return res.status(200).send(resposta);
      }else{
        console.log("Quey NÂO feita com sucesso");
      }
    }).catch(function (erro) {
      console.log("Ocorreu um erro ao realizar a requisição: ", erro);
      return res.status(500).send(erro);
    });
}
function pegarKPIMaiorLeitura(req, res) {
  var IdEmpresa = req.body.ID_EMPRESA
  
  dashboardModel.pegarKPIMaiorLeitura(IdEmpresa).then(function (resposta) {
      if (resposta) {
        console.log("Quey feita com sucesso");
        return res.status(200).send(resposta);
      }else{
        console.log("Quey NÂO feita com sucesso");
      }
    }).catch(function (erro) {
      console.log("Ocorreu um erro ao realizar a requisição: ", erro);
      return res.status(500).send(erro);
    });
}

module.exports = {
  pegarsetores,
  pegarKPISensorproblema,
  pegarKPIAlertasCriticos,
  pegaralertas,
  updateLido,
  KPIMaiorPropCriticos,
  pegarKPIMaiorLeitura
};
