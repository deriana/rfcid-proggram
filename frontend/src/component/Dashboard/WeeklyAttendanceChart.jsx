import React from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from "chart.js";

// Registering necessary elements in Chart.js for Bar charts
ChartJS.register(BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

const WeeklyAttendanceChart = ({ data = [] }) => {
  // Default to an empty array if data is not provided
  const chartData = {
    labels: data.length > 0 ? data.map((item) => `Week ${item.week}`) : [],
    datasets: [
      {
        label: "Attendance",
        data: data.length > 0 ? data.map((item) => item.total_present) : [],
        borderColor: "rgba(75,192,192,1)",
        backgroundColor: "rgba(75,192,192,0.2)",
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { display: true, position: "top" },
    },
    scales: { y: { beginAtZero: true } },
  };

  // Return a loading message or an empty chart if data is still unavailable
  if (data.length === 0) {
    return <div>Loading chart data...</div>;
  }

  return <Line data={chartData} options={chartOptions} />;
};

export default WeeklyAttendanceChart;
