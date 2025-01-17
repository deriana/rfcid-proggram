import React, { useEffect, useState } from "react";
import Preloader from "./partial/Preloader";
import Sidebar from "./partial/Sidebar";
import Header from "./partial/Header";
import TitleBox from "./Title";
import { getDashboard, getDashboardHadir, getDashboardFullHadir, getDashboardFullTerlambat } from "./api";
import Card from "./Dashboard/Card";
import {
  faCalendarCheck,
  faClock,
  faHospital,
  faTimes,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";

import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
import Footer from "./partial/Footer";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

function Dashboard() {
  const [cardData, setCardData] = useState([]);
  const [fullHadirValue, setFullHadirValue] = useState(0);
  const [fullTerlambatValue, setFullTerlambatValue] = useState(0);

  const fetchDashboardData = async () => {
    try {
      const sakitData = await getDashboard("sakit");
      const izinData = await getDashboard("ijin");
      const alphaData = await getDashboard("alfa");
      const terlambatData = await getDashboard("terlambat");
      const hadirData = await getDashboardHadir();
      const fullHadirData = await getDashboardFullHadir();
      const fullTerlambatData = await getDashboardFullTerlambat();

      const sakitValue = sakitData[0]?.hasil || 0;
      const izinValue = izinData[0]?.hasil || 0;
      const alphaValue = alphaData[0]?.hasil || 0;
      const terlambatValue = terlambatData[0]?.hasil || 0;
      const hadirValue = hadirData[0]?.hasil || 0;
      const fullHadir = fullHadirData[0]?.hasil || 0;
      const fullTerlambat = fullTerlambatData[0]?.hasil || 0;

      setCardData([
        { title: "Hadir", description: "Jumlah Guru yang Hadir Hari Ini", icon: faUsers, bgColor: "bg-green-500", value: hadirValue },
        { title: "Sakit", description: "Guru Sakit Hari Ini", icon: faHospital, bgColor: "bg-red-500", value: sakitValue },
        { title: "Ijin", description: "Guru Ijin Hari Ini", icon: faCalendarCheck, bgColor: "bg-blue-500", value: izinValue },
        { title: "Alfa", description: "Guru Alfa Hari Ini", icon: faTimes, bgColor: "bg-gray-500", value: alphaValue },
        { title: "Terlambat", description: "Guru Terlambat Hari Ini", icon: faClock, bgColor: "bg-yellow-500", value: terlambatValue },
      ]);

      setFullHadirValue(fullHadir);
      setFullTerlambatValue(fullTerlambat);
    } catch (error) {
      console.error("Error fetching dashboard data", error);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const chartData = {
    labels: ["Full Hadir", "Full Terlambat"],
    datasets: [
      {
        label: "Full Hadir",
        data: [0, fullTerlambatValue],
        fill: true,
        backgroundColor: "rgba(52, 211, 153, 0.4)",
        borderColor: "#34D399",
        borderWidth: 3,
        tension: 0.7,
        cubicInterpolationMode: 'monotone',
      },
      {
        label: "Full Terlambat",
        data: [0, fullHadirValue],
        fill: true,
        backgroundColor: "rgba(250, 191, 36, 0.4)",
        borderColor: "#FBBF24",
        borderWidth: 3,
        tension: 0.7,
        cubicInterpolationMode: 'monotone',
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
      },
    },
    plugins: {
      title: {
        display: true,
        text: "Daftar Hadi Dan Terlambat",
      },
    },
  };

  return (
    <div>
      <Preloader />
      <div className="flex h-screen overflow-hidden bg-gray-100">
        <Sidebar />
        <div className="relative flex flex-1 flex-col overflow-y-auto bg-white">
          <Header />
          <main className="p-0 md:p-0 2xl:p-0 mx-auto max-w-screen-2xl">
            <TitleBox title="Dashboard" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 p-6">
              {cardData.map((data, index) => (
                <Card
                  key={index}
                  title={data.title}
                  value={data.value}
                  description={data.description}
                  icon={data.icon}
                  bgColor={data.bgColor}
                />
              ))}
            </div>
            <div className="p-6">
              <div className="h-72 sm:h-96">
                <Line data={chartData} options={chartOptions} />
              </div>
            </div>
          </main>
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
