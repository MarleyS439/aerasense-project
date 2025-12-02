var database = require("../database/config");


// Comando SQL para criar um registro de acesso de log de usuário
function pegarsetores() {
  var sql = `
    SELECT * FROM setor;
  `;
  console.log("Executando a seguinte instrução SQL: \n", sql);
  return database.executar(sql);
}




function pegarKPISensorproblema(idEmpresa) {
  var sql = `
select emp.nome_fantasia as 'Empresa',
    sum(case when sen.status_sensor != 'ativo' then 1 else 0 end) as 'inativos'
    from empresa as emp 
		join setor as str on str.fk_id_empresa = emp.id
		join sensor as sen on sen.fk_id_setor = str.id
    group by emp.nome_fantasia;
  `;

  console.log("Executando a seguinte instrução SQL: \n", sql);
  return database.executar(sql);
}






function pegarKPIAlertasCriticos(idEmpresa) {
  var sql = `
  SELECT count(nivel) AS qtdAlertasCriticos
	  FROM alerta
      WHERE nivel LIKE 'Crítico';

  `;
  console.log("Executando a seguinte instrução SQL: \n", sql);
  return database.executar(sql);
}






function setoresCadastrados(idEmpresa) {
  var sql = `
    SELECT * FROM setor;
  `;
  console.log("Executando a seguinte instrução SQL: \n", sql);
  return database.executar(sql);
}





module.exports = {
  pegarsetores,
  pegarKPISensorproblema,
  pegarKPIAlertasCriticos,
  setoresCadastrados
};
