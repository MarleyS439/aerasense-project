var database = require("../database/config");

// Função par alistar os sensores da empresa
function listarSensores(idEmpresa) {
  console.log("Listando sensores da empresa de ID", idEmpresa);

  var sql = `
    SELECT sen.id,
           sen.nome,
           str.nome setor,
           sen.codigo,
           sen.localizacao,
           sen.rotulo,
           sen.status_sensor status,
           sen.codigo_botijao botijao,
           sen.fk_id_setor,
           e.id empresa
    FROM sensor as sen join setor as str
    on sen.fk_id_setor = str.id
    join empresa as e
    on e.id = str.fk_id_empresa
    WHERE fk_empresasetor = ${idEmpresa};
  `;

  console.log("Executando a instrução SQL:", sql);
  return database.executar(sql);
}

// Função par abuscar as últimas medidas
function buscarUltimasMedidas(idSensor, limite_linhas) {
  var instrucaoSql = `SELECT
                        valor_medicao,
                        DATE_FORMAT(data_hora_medicao,'%H:%i:%s') as momento_grafico
                    FROM medicao
                    WHERE fk_id_sensor = ${idSensor}
                    ORDER BY id DESC LIMIT ${limite_linhas}`;

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

// Função de buscar as medidas em tempo real
function buscarMedidasEmTempoReal(idSensor) {
  var instrucaoSql = `SELECT
                        valor_medicao,
                        DATE_FORMAT(data_hora_medicao,'%H:%i:%s') as momento_grafico
                    FROM medicao
                    WHERE fk_id_sensor = ${idSensor}
                    ORDER BY id DESC LIMIT 7`;

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

module.exports = {
  listarSensores,
  buscarUltimasMedidas,
  buscarMedidasEmTempoReal,
};
