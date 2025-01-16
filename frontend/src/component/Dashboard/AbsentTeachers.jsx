import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from "chart.js";

// Registering necessary elements in Chart.js for Bar charts
ChartJS.register(BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

const AbsentTeachersChart = ({ data = [] }) => {
  // Default to an empty array if data is undefined
  const chartData = {
    labels: data.length > 0 ? data.map((item) => item.date) : [],
    datasets: [
      {
        label: "Sick Leave",
        data: data.length > 0 ? data.map((item) => item.sick_leave) : [],
        backgroundColor: "rgba(255, 99, 132, 0.8)",
      },
      {
        label: "Personal Leave",
        data: data.length > 0 ? data.map((item) => item.personal_leave) : [],
        backgroundColor: "rgba(54, 162, 235, 0.8)",
      },
      {
        label: "Other",
        data: data.length > 0 ? data.map((item) => item.other_leave) : [],
        backgroundColor: "rgba(75, 192, 192, 0.8)",
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
    },
    scales: {
      x: { stacked: true },
      y: { stacked: true, beginAtZero: true },
    },
  };

  // Render a loading message while data is being fetched
  if (data.length === 0) {
    return <div>Loading chart data...</div>;
  }

  return <Bar data={chartData} options={chartOptions} />;
};

export default AbsentTeachersChart;
