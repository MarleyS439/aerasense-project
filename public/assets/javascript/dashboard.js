const ctx = document.getElementById("media_setor");
const ctx1 = document.getElementById("alertas_por_setor");
const ctx2 = document.getElementById("comparar_alertas");

function gerarGraficoAlertasSetor(setores,qtdAlertasTotais,QtdAlertasRiscos){

  
  const alertasSetor = new Chart(ctx1, {
  type: "bar",
  data: {
    labels: setores,
    datasets: [
      {
        label: "Quantidade de alertas totais",
        data: qtdAlertasTotais,
        backgroundColor: "rgb(24, 98, 141)",
        borderWidth: 1,
        borderRadius: 10,
      },{
        label: "Quantidade de alertas críticos (>= 1,9%)",
        data: QtdAlertasRiscos,
        backgroundColor: "rgb(255, 58, 58)",
        borderWidth: 1,
        borderRadius: 10,
      },
    ],
  },
  options: {
    plugins: {
      legend: {
        labels: {
          font: {
            family: "Kanit",
          },
          color: "rgb(10, 43, 64)",
        },
      },
      title: {
        display: true,
        text: "Alertas por setor",
        position: "top",
        align: "center",
        font: {
          size: 20,
          family: "Kanit",
        },
        color: "rgb(10, 43, 64)",
      },
    },
    scales: {
      y: {
        title: {
          display: true,
          text: "Quantidade de alertas",
          color: "#555",
          font: { size: 12, weight: "600" },
          padding: { bottom: 8 },
        },
        beginAtZero: true,
      },
      x: {
        title: {
          display: true,
          text: "Setores",
          color: "#555",
          font: { size: 12, weight: "600" },
          padding: { bottom: 8 },
        },
        ticks: {
          font: {
            weight: "bold",
            family: "Kanit",
          },
        },
      },
    },
  },
});

}