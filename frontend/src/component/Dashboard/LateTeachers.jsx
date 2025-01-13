import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from "chart.js";

// Registering necessary elements in Chart.js for Bar charts
ChartJS.register(BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

const LateTeachersChart = ({ data = [] }) => {
  // Default to an empty array if no data is passed
  const chartData = {
    labels: data.length > 0 ? data.map((item) => item.date) : [],
    datasets: [
      {
        label: "Late Teachers",
        data: data.length > 0 ? data.map((item) => item.late_count) : [],
        backgroundColor: "rgba(255, 206, 86, 0.6)",
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
    },
    scales: { y: { beginAtZero: true } },
  };

  // Render a loading message while the data is being fetched
  if (data.length === 0) {
    return <div>Loading chart data...</div>;
  }

  return <Bar data={chartData} options={chartOptions} />;
};

export default LateTeachersChart;
