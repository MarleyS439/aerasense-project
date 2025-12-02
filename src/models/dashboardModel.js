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
  select emp.id as Empresa,
    sum(case when a.nivel = 'Crítico' then 1 else 0 end) as 'Alertas_Críticos'
    from alerta as a join sensor as sen 
    on a.idSensor = sen.id 
    join setor as str 
    on sen.fk_id_setor = str.id
    join empresa as emp 
    on str.fk_id_empresa = emp.id 
    where str.fk_id_empresa = ${idEmpresa}
  group by emp.id;
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

function KPIMaiorPropCriticos(idempresa) {
  var sql = `
    select str.id as Setor,
      sum(case when a.nivel = 'Crítico' then 1 else 0 end) as 'Alertas_Críticos',
      sum(case when a.nivel = 'Risco' then 1 else 0 end) as 'Alertas_Risco'
      from alerta as a join sensor as sen 
      on a.idSensor = sen.id 
      join setor as str 
      on sen.fk_id_setor = str.id 
      where str.fk_id_empresa = ${idempresa}
      group by str.id
      LIMIT 1;
  `;
  console.log("Executando a seguinte instrução SQL: \n", sql);
  return database.executar(sql);
}



module.exports = {
  pegarsetores,
  pegaralertas,
  updateLido,
  pegarKPISensorproblema,
  pegarKPIAlertasCriticos,
  setoresCadastrados,
  KPIMaiorPropCriticos
};
