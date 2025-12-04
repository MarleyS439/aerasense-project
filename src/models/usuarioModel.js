var database = require("../database/config");

// Função para executar SELECT no banco de dados para verificar existência de usuário
function autenticar(email, senha) {
  console.log(
    `Executando verificação de existência do usuário para e-mail: ${email} e senha: ${senha}`,
  );

  // Instrução SQL a ser executada
  var sql = `
    SELECT u.id,
           u.nome,
           u.email,
           u.fk_id_empresa AS idEmpresa,
           e.nome_fantasia as 'Nome_Empresa'
    FROM usuario as u left join empresa as e
    on u.fk_id_empresa = e.id
    WHERE u.email = '${email}'
        AND u.senha = '${senha}' LIMIT 1;
  `;

  console.log("Executando a instrução SQL: \n" + sql);
  return database.executar(sql);
}

// Coloque os mesmos parâmetros aqui. Vá para a var instrucaoSql
function cadastrar(
  nome,
  sobrenome,
  empresa,
  cnpjempresa,
  celular,
  email,
  senha,
  idempresa,
) {
  console.log("MODEL CADASTRAR");

  var instrucaoSql = `
       INSERT INTO usuario (nome, sobrenome, email, senha, tipo_usuario, status_usuario, data_hora_cadastro, data_hora_atualizacao, fk_id_empresa, fk_id_adm) value
				('${nome}','${sobrenome}', '${email}', '${senha}', 'admin', 'ativo', NOW(), null, ${idempresa}, null)
    `;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function VerificacaoEmpresa(Token) {
  var instrucaoSql = `
        SELECT * FROM empresa WHERE codigo_ativacao = '${Token}'
    `;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function CriarLog(idUsuario, empresaId) {
  var instrucaoSql = `
        insert into acesso values(default,${idUsuario},${empresaId},default,null)
    `;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

// Comando SQL para criar um registro de acesso de log de usuário
function criarLogUsuario(idUsuario, idEmpresa) {
  var sql = `
    INSERT INTO acesso
    VALUES (DEFAULT, ${idUsuario}, ${idEmpresa}, DEFAULT, NULL);
  `;
  console.log("Executando a seguinte instrução SQL: \n", sql);
  return database.executar(sql);
}

function Checkout(id){

  

  var sql = `
  update acesso set dtHrLogout = default where idAcesso = ${id}
  `;
  console.log("Executando a seguinte instrução SQL: \n", sql);
  return database.executar(sql);

}

module.exports = {
  autenticar,
  cadastrar,
  VerificacaoEmpresa,
  CriarLog,
  criarLogUsuario,
  Checkout
};
