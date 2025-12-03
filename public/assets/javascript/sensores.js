// Contexto (Canvas) de sensores
var ctxSensores = document.getElementById("quantidade_sensores");

function distribuicaoDeSensores() {}

// Função para gerar o gráfico de distribuição de sensores
function gerarGraficoDistribuicaoSensores(setores, valores) {
  var opcoes = {
    type: "doughnut",
    data: {
      labels: setores,
      datasets: [
        {
          label: "Quantidade de sensores",
          data: valores,
          backgroundColor: [
            "rgb(59, 158, 219)",
            "rgb(59, 208, 219)",
            "rgb(59, 107, 219)",
            "rgb(71, 84, 92)",
          ],
          hoverOffset: 2,
        },
      ],
    },
    options: {
      plugins: {
        legend: {
          position: "right",
        },
        title: {
          display: true,
          text: "Quantidade total de sensores por setor",
          position: "top",
          align: "center",
          font: {
            size: 18,
            family: "Kanit",
          },
          color: "rgb(10, 43, 64)",
        },
      },
    },
  };

  new Chart(ctxSensores, opcoes);
}

// Função de listar os sensores pelo ID da empresa
function listarSensores() {
  // ID da empresa
  var idEmpresa = sessionStorage.ID_EMPRESA;

  // Fetch
  fetch(`/sensores/listar/${idEmpresa}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      idEmpresa: idEmpresa,
    }),
  })
    .then(function (resposta) {
      if (resposta.ok) {
        console.log(resposta);
        resposta.json().then((json) => {
          console.log(json);

          var dados = JSON.stringify(json);

          sensores = JSON.parse(dados);

          sensores.forEach((sensor) => {
            document.getElementById("qtd_sensores").innerHTML =
              `Total de sensores ${sensores.length}`;

            document.getElementById("sensor-container").innerHTML += `
            <div class="card-sensor" onclick="modalSensor(${sensor.id})">
                <div>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="24px"
                        viewBox="0 -960 960 960"
                        width="24px"
                        fill="#1f1f1f"
                    >
                        <path
                            d="M340-360q-25 0-42.5-17.5T280-420q0-25 17.5-42.5T340-480q25 0 42.5 17.5T400-420q0 25-17.5 42.5T340-360Zm140 120q-25 0-42.5-17.5T420-300q0-25 17.5-42.5T480-360q25 0 42.5 17.5T540-300q0 25-17.5 42.5T480-240ZM340-120q-25 0-42.5-17.5T280-180q0-25 17.5-42.5T340-240q25 0 42.5 17.5T400-180q0 25-17.5 42.5T340-120Zm280-240q-25 0-42.5-17.5T560-420q0-25 17.5-42.5T620-480q25 0 42.5 17.5T680-420q0 25-17.5 42.5T620-360Zm0 240q-25 0-42.5-17.5T560-180q0-25 17.5-42.5T620-240q25 0 42.5 17.5T680-180q0 25-17.5 42.5T620-120Zm140-120q-25 0-42.5-17.5T700-300q0-25 17.5-42.5T760-360q25 0 42.5 17.5T820-300q0 25-17.5 42.5T760-240Zm-560 0q-25 0-42.5-17.5T140-300q0-25 17.5-42.5T200-360q25 0 42.5 17.5T260-300q0 25-17.5 42.5T200-240Zm136-320q-26 0-47-15.5T260-616l-20-64h-40q-33 0-56.5-23.5T120-760v-120h720v120q0 33-23.5 56.5T760-680h-40l-26 68q-9 23-29 37.5T620-560H336ZM200-800v40h560v-40H200Zm124 120 12 40h288l12-40H324ZM200-800v40-40Z"
                        />
                    </svg>
                </div>
                <div>
                    <h3>${sensor.nome}</h3>
                </div>
                <span
                    >Status:
                    <span style="color: var(--color-success)"
                        >${sensor.status}</span
                    ></span
                >
                <span>${sensor.setor}</span>
                <span>${sensor.codigo}</span>
            </div>
            `;
          });
        });
      } else {
        console.log("Erro ao obter busca");
      }
    })
    .catch(function (erro) {
      console.log(erro);
    });
}
