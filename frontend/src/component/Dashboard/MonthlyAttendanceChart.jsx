import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from "chart.js";

// Registering necessary elements in Chart.js for Bar charts
ChartJS.register(BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

const MonthlyAttendanceChart = ({ present, absent }) => {
  const chartData = {
    labels: ["Present", "Absent"],
    datasets: [
      {
        data: [present, absent],
        backgroundColor: ["rgba(54, 162, 235, 0.8)", "rgba(255, 99, 132, 0.8)"],
        borderWidth: 1,
      },
    ],
  };

  return <Pie data={chartData} />;
};

export default MonthlyAttendanceChart;
