var usuarioModel = require("../models/usuarioModel");

// Função para autenticar o usuário
function autenticar(req, res) {
  // E-mail do corpo da requisição
  var email = req.body.email;

  // Senha do corpo da requisição
  var senha = req.body.senha;

  // Validação dos valores das requisições
  if (email == undefined) {
    // Envia HTTP 400 - E-mail undefined
    return res.status(400).send("Seu email está undefined!");
  } else if (senha == undefined) {
    // Envia HTTP 400 - Senha undefined
    return res.status(400).send("Sua senha está indefinida!");
  } else {
    usuarioModel
      .autenticar(email, senha)
      .then(function (resultado) {
        console.log(
          `Foi encontrado ${resultado.length} resultado: `,
          resultado,
        );

        console.log(`Resultados: ${JSON.stringify(resultado)}`);

        if (resultado.length == 1) {
          console.log(JSON.stringify(resultado));
          return res.json(resultado);
        } else if (resultado.length == 0) {
          return res.status(403).send("Email e/ou senha inválido(s)");
        } else {
          return res
            .status(403)
            .send("Mais de um usuário com o mesmo login e senha!");
        }
      })
      .catch(function (erro) {
        console.log(erro);
        console.log(
          "\nHouve um erro ao realizar o login! Erro: ",
          erro.sqlMessage,
        );
        return res.status(500).json(erro.sqlMessage);
      });
  }
}

function cadastrar(req, res) {
  console.log("Chegou no controller");
  var nome = req.body.nomeServer;
  var sobrenome = req.body.sobrenomeServer;
  var empresa = req.body.empresaServer;
  var cnpjempresa = req.body.cnpjempresaServer;
  var celular = req.body.celularServer;
  var email = req.body.emailServer;
  var senha = req.body.senhaServer;
  var TokenEmpresa = req.body.tokenempresaServer;
  console.log(
    +nome +
    "/" +
    +sobrenome +
    "/" +
    +empresa +
    "/" +
    +cnpjempresa +
    "/" +
    +celular +
    "/" +
    +email +
    "/" +
    +senha +
    "/" +
    +TokenEmpresa,
  );

  // Faça as validações dos valores
  if (nome == undefined) {
    res.status(400).send("Seu nome está undefined!");
  } else if (sobrenome == undefined) {
    res.status(400).send("Seu email está undefined!");
  } else if (empresa == undefined) {
    res.status(400).send("Sua senha está undefined!");
  } else if (cnpjempresa == undefined) {
    res.status(400).send("Sua CNPJ a vincular está undefined!");
  } else if (celular == undefined) {
    res.status(400).send("Seu celular a vincular está undefined!");
  } else if (email == undefined) {
    res.status(400).send("Seu email a vincular está undefined!");
  } else if (senha == undefined) {
    res.status(400).send("Sua senha a vincular está undefined!");
  } else if (TokenEmpresa == undefined) {
    res.status(400).send("Seu tokenEmpresa a vincular está undefined!");
  } else {
    usuarioModel.VerificacaoEmpresa(TokenEmpresa).then(function (Resposta) {
      console.log("a" + JSON.stringify(Resposta[0]));
      if (Resposta.length > 0) {
        usuarioModel
          .cadastrar(
            nome,
            sobrenome,
            empresa,
            cnpjempresa,
            celular,
            email,
            senha,
            Resposta[0].id,
          )
          .then(function (resultado) {
            console.log("RESULTADO: " + JSON.stringify(resultado));
            res.json(resultado);
          })
          .catch(function (erro) {
            console.log(erro);
            console.log(
              "\nHouve um erro ao realizar o cadastro! Erro: ",
              erro.sqlMessage,
            );
            res.status(500).json(erro.sqlMessage);
          });
      } else {
        console.error("TOKEN nÃO EXISTE");
      }
    });
  }
}

function CriarLog(req, res) {
  var idUsuario = req.body.idUsuario;
  var idEmpresa = req.body.idEmpresa;

  usuarioModel.CriarLog(idUsuario, idEmpresa).then(function (resposta) {

    console.log(JSON.stringify(resposta));
    console.log(`${JSON.stringify(resposta.insertId)}`);
    // res.send(`${JSON.stringify(resposta.insertId)}`);

    res.json({
      id: resposta.insertId
    })

  });
}

// Função para criar log de acesso do usuário
function criarLogUsuario(req, res) {
  // ID do usuário
  var idUsuario = req.body.idUsuario;

  // ID da empresa
  var idEmpresa = req.body.idEmpresa;

  usuarioModel
    .criarLogUsuario(idUsuario, idEmpresa)
    .then(function (resposta) {
      if (resposta.ok) {
        console.log("Log de acesso criado com sucesso!");
        return res.status(200).send("Log de acesso criado com sucesso!");
      }
    })
    .catch(function (erro) {
      console.log("Ocorreu um erro ao realizar a requisição: ", erro);
      return res.status(500).send(erro);
    });
}

function Checkout(req, res) {

  var id = req.body.idAcesso;
  console.log(id);

  usuarioModel.Checkout(id)
    .then(function (resposta) {

      res.status(200).send('Tudo Certo')


    })

}

module.exports = {
  autenticar,
  cadastrar,
  CriarLog,
  criarLogUsuario,
  Checkout
};
