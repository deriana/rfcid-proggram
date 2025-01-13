import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from "chart.js";

// Registering necessary elements in Chart.js for Bar charts
ChartJS.register(BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

const SickTeachersChart = ({ sick, healthy }) => {
  const chartData = {
    labels: ["Sick", "Healthy"],
    datasets: [
      {
        data: [sick, healthy],
        backgroundColor: ["rgba(255, 99, 132, 0.8)", "rgba(75, 192, 192, 0.8)"],
        borderWidth: 1,
      },
    ],
  };

  return <Doughnut data={chartData} />;
};

export default SickTeachersChart;
