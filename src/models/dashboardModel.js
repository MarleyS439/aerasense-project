var database = require("../database/config");


// Comando SQL para criar um registro de acesso de log de usuário
function pegarsetores() {
  var sql = `
    SELECT * FROM setor;
  `;
  console.log("Executando a seguinte instrução SQL: \n", sql);
  return database.executar(sql);
}




function pegarKPISensorproblema() {
  var sql = `
      SELECT length(sensor.id) as qtdSensorProblema
	        FROM alerta
		        JOIN sensor ON alerta.idSensor = sensor.id;
  `;
  console.log("Executando a seguinte instrução SQL: \n", sql);
  return database.executar(sql);
}






function alertasCriticos() {
  var sql = `
    SELECT * FROM setor;
  `;
  console.log("Executando a seguinte instrução SQL: \n", sql);
  return database.executar(sql);
}






function setoresCadastrados() {
  var sql = `
    SELECT * FROM setor;
  `;
  console.log("Executando a seguinte instrução SQL: \n", sql);
  return database.executar(sql);
}





module.exports = {
  pegarsetores,
  pegarKPISensorproblema,
  alertasCriticos,
  setoresCadastrados
};
