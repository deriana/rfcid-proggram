// ChartComponent.jsx
import React from 'react';
import { Line } from 'react-chartjs-2';  // Import komponen Line dari react-chartjs-2
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

// Registrasi tipe-tipe yang diperlukan untuk Chart.js
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const ChartComponent = () => {
  // Data untuk chart
  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'], // Label di sumbu X
    datasets: [
      {
        label: 'Pendapatan',  // Label chart
        data: [100, 200, 150, 170, 250],  // Data yang di-plot
        borderColor: 'rgba(75,192,192,1)', // Warna garis
        backgroundColor: 'rgba(75,192,192,0.2)', // Warna area chart
        borderWidth: 1,
      },
    ],
  };

  // Opsi chart (optional)
  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Grafik Pendapatan',
      },
      tooltip: {
        mode: 'nearest',
      },
    },
  };

  return (
    <div>
      <h2>Grafik Line Pendapatan</h2>
      <Line data={data} options={options} />
    </div>
  );
};

export default ChartComponent;
