var database = require("../database/config");


// Comando SQL para criar um registro de acesso de log de usuário
function pegarsetores() {
  var sql = `
    SELECT * FROM setor;
  `;
  console.log("Executando a seguinte instrução SQL: \n", sql);
  return database.executar(sql);
}
function pegaralertas() {
  var sql = `
    SELECT alerta.*, setor.*, sensor.* FROM alerta join sensor on alerta.idSensor = sensor.id JOIN setor ON sensor.fk_id_setor = setor.id ;
  `;
  console.log("Executando a seguinte instrução SQL: \n", sql);
  return database.executar(sql);
}
function updateLido(idAlerta,Lido) {
  if(!Lido){
    var sql = `
      UPDATE alerta SET lido = '!Lido' WHERE idAlerta = ${idAlerta};
    `;
  }else{
    var sql = `
      UPDATE alerta SET lido = 'Lido' WHERE idAlerta = ${idAlerta};
    `;
  }
  console.log("Executando a seguinte instrução SQL: \n", sql);
  return database.executar(sql);
}

module.exports = {
  pegarsetores,
  pegaralertas,
  updateLido
};
