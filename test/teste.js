const mysql = require("mysql2");
const express = require("express");

let val1 = 0;
let val2 = 0;

let poolBancoDados = mysql
  .createPool({
    host: "",
    user: "",
    password: "",
    port: 3306,
  })
  .promise();

function rand() {
  val1 = Math.random() * (0.3 - 0);
  val2 = Math.random() * (3.9 - 0);
}

const SERVIDOR_PORTA = 3300;

const servidor = (ArrayVal1, Arrayval2) => {
  const app = express();

  app.use((request, response, next) => {
    response.header("Access-Control-Allow-Origin", "*");
    response.header(
      "Access-Control-Allow-Headers",
      "Origin, Content-Type, Accept",
    );
    next();
  });

  app.listen(SERVIDOR_PORTA, () => {
    console.log(`API executada com sucesso na porta ${SERVIDOR_PORTA}`);
  });

  app.get("/sensores/ArrayVal1", (_, response) => {
    return response.json(ArrayVal1);
  });
  app.get("/sensores/ArrayVal2", (_, response) => {
    return response.json(ArrayVal2);
  });
};

const pros = async (ArrayVal1, Arrayval2) => {
  setInterval(() => {
    rand();

    poolBancoDados.execute(
      "INSERT INTO medicao(valor_medicao, fk_id_sensor) VALUES (?, ?)",

      [val1, 1],
    );

    poolBancoDados.execute(
      "INSERT INTO medicao(valor_medicao, fk_id_sensor) VALUES (?, ?)",
      [val2, 2],
    );

    console.log("dados inseridos");

    ArrayVal1.push(val1);
    ArrayVal2.push(val2);
  }, 1000);
};

(async () => {
  ArrayVal1 = [];
  ArrayVal2 = [];

  pros(ArrayVal1, ArrayVal2);

  servidor(val1, val2);
})();
