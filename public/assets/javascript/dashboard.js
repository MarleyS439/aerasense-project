const ctx = document.getElementById("media_setor");
const ctx1 = document.getElementById("alertas_por_setor");
const ctx2 = document.getElementById("comparar_alertas");

function gerarGraficoAlertasSetor() {}

const alertasSetor = new Chart(ctx1, {
  type: "bar",
  data: {
    labels: ["Setor A", "Setor B", "Setor C", "Setor D"],
    datasets: [
      {
        label: "Quantidade de alertas totais",
        data: [10, 6, 13, 8],
        backgroundColor: "rgb(24, 98, 141)",
        borderWidth: 1,
        borderRadius: 10,
      },

      {
        label: "Quantidade de alertas críticos (>= 1,9%)",
        data: [4, 1, 2, 3],
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
