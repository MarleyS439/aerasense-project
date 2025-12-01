// Contexto (Canvas) de sensores
var ctxSensores = document.getElementById("quantidade_sensores");

function distribuicaoDeSensores() {}

// Função para gerar o gráfico de distribuição de sensores
function gerarGraficoDistribuicaoSensores() {
  var opcoes = {
    type: "doughnut",
    data: {
      labels: ["Setor A", "Setor B", "Setor C", "Setor D"],
      datasets: [
        {
          label: "Quantidade de sensores",
          data: [8, 7, 4, 3],
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

// const ctx3 = document.getElementById("qtdSensores");

// new Chart(ctx3, {
//   type: "doughnut",
//   data: {
//     labels: ["Setor A", "Setor B", "Setor C", "Setor D"],
//     datasets: [
//       {
//         label: "Quantidade de sensores",
//         data: [8, 7, 4, 3],
//         backgroundColor: [
//           "rgba(80, 160, 22, 1)",
//           "rgb(54, 162, 235)",
//           "rgb(255, 205, 86)",
//           "rgba(216, 36, 168, 1)",
//         ],
//         hoverOffset: 4,
//       },
//     ],
//   },
//   options: {
//     plugins: {
//       legend: {
//         position: "right",
//       },
//       title: {
//         display: true,
//         text: "Quantidade total de sensores por setor",
//         position: "top",
//         align: "start",
//         font: {
//           size: 20,
//         },
//       },
//     },
//   },
// });
