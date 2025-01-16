import React, { useEffect, useState } from "react";
import Preloader from "./partial/Preloader";
import Sidebar from "./partial/Sidebar";
import Header from "./partial/Header";
import CardDashboard from "./Dashboard/Card";

import {
  getTotalTeachersPresentToday,
  getTotalTeachersOnSickLeaveToday,
  getTeachersPresentPerMonth,
  getTotalTeachersArrivedLateToday,
  getTeachersAbsentLast30Days,
  getTeachersPresentPerWeek,
  getAverageMonthlyAttendance,
} from "./api";
import { Line, Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [teachersPresentToday, setTeachersPresentToday] = useState(0);
  const [teachersSickToday, setTeachersSickToday] = useState(0);
  const [averageMonthlyAttendance, setAverageMonthlyAttendance] = useState(0);
  const [teachersLateToday, setTeachersLateToday] = useState(0);
  const [weeklyAttendance, setWeeklyAttendance] = useState([]);
  const [monthlyAttendance, setMonthlyAttendance] = useState([]); // Data untuk grafik Line
  const [absentStats, setAbsentStats] = useState([]); // Data untuk grafik Bar
  const [teacherStatus, setTeacherStatus] = useState({
    present: 0,
    sick: 0,
    late: 0,
  }); // Data untuk grafik Pie

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const presentRes = await getTotalTeachersPresentToday();
        const sickRes = await getTotalTeachersOnSickLeaveToday();
        const avgAttendanceRes = await getAverageMonthlyAttendance();
        const lateRes = await getTotalTeachersArrivedLateToday();
        const weeklyAttendanceRes = await getTeachersPresentPerWeek();
        const teacherAbsencesRes = await getTeachersAbsentLast30Days(); // Data untuk grafik Bar
        const monthlyAttendanceRes = await getTeachersPresentPerMonth(); // Data untuk grafik Line

        // Set data
        setTeachersPresentToday(presentRes.data.total_teachers_present || 0);
        setTeachersSickToday(sickRes.data.total_teachers_sick_leave || 0);
        setAverageMonthlyAttendance(
          parseFloat(avgAttendanceRes.data.average_monthly_attendance || 0)
        );
        setTeachersLateToday(lateRes.data.total_teachers_late || 0);
        setWeeklyAttendance(weeklyAttendanceRes.data || []);
        setTeacherStatus({
          present: presentRes.data.total_teachers_present,
          sick: sickRes.data.total_teachers_sick_leave,
          late: lateRes.data.total_teachers_late,
        });

        // Grafik data untuk line chart (absensi per bulan)
        setMonthlyAttendance(monthlyAttendanceRes.data || []);
        console.log(monthlyAttendance.data);

        // Grafik data untuk bar chart (jumlah guru tidak hadir di 30 hari terakhir)
        setAbsentStats(teacherAbsencesRes.data || []);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const processedAbsentStats = absentStats.reduce((acc, item) => {
    if (acc[item.name]) {
      acc[item.name]++;
    } else {
      acc[item.name] = 1;
    }
    return acc;
  }, {});

  if (loading) {
    return <Preloader />;
  }

  const getWeekDateRange = (weekNumber) => {
    const startDate = new Date();
    const endDate = new Date();

    startDate.setDate(
      startDate.getDate() - startDate.getDay() + (weekNumber - 1) * 7
    ); 

    endDate.setDate(startDate.getDate() + 6); 

    const formatOptions = { year: "numeric", month: "short", day: "numeric" };
    return `${startDate.toLocaleDateString(
      "en-GB",
      formatOptions
    )} - ${endDate.toLocaleDateString("en-GB", formatOptions)}`;
  };

  const lineData = {
    labels: monthlyAttendance.map((item) => {
      // Format bulan menjadi nama bulan
      const months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];
      return months[item.month - 1]; // Menyesuaikan angka bulan (1-12)
    }), // Nama bulan
    datasets: [
      {
        label: "Jumlah Guru Hadir per Bulan",
        data: monthlyAttendance.map((item) => item.total_present), // Jumlah hadir
        borderColor: "rgba(75,192,192,1)",
        backgroundColor: "rgba(75,192,192,0.2)",
        borderWidth: 2,
      },
    ],
  };

  const barData = {
    labels: Object.keys(processedAbsentStats), // Nama Guru
    datasets: [
      {
        label: "Jumlah Ketidakhadiran per Guru (30 Hari Terakhir)",
        data: Object.values(processedAbsentStats), // Jumlah ketidakhadiran
        backgroundColor: "rgba(255,99,132,0.2)",
        borderColor: "rgba(255,99,132,1)",
        borderWidth: 1,
      },
    ],
  };

  // Data untuk Pie Chart (Status Absensi Guru)
  const pieData = {
    labels: ["Present", "Sick", "Late"],
    datasets: [
      {
        data: [teacherStatus.present, teacherStatus.sick, teacherStatus.late],
        backgroundColor: ["#36A2EB", "#FF6384", "#FFCE56"],
        hoverBackgroundColor: ["#36A2EB", "#FF6384", "#FFCE56"],
      },
    ],
  };

  // Data untuk Weekly Attendance Chart
  const weeklyData = {
    labels: weeklyAttendance.map((item, index) => getWeekDateRange(index + 1)), // Mengonversi minggu ke rentang tanggal
    datasets: [
      {
        label: "Jumlah Guru Hadir per Minggu",
        data: weeklyAttendance.map((item) => item.total_present), // Jumlah hadir
        borderColor: "rgba(153,102,255,1)",
        backgroundColor: "rgba(153,102,255,0.2)",
        borderWidth: 2,
      },
    ],
  };

  return (
    <div className="flex h-screen overflow-hidden bg-gray-100">
    <Sidebar />
    <div className="relative flex flex-1 flex-col overflow-y-auto bg-white">
      <Header />
      <main className="p-6 md:p-8 2xl:p-10 mx-auto max-w-screen-2xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <CardDashboard
            title="Teachers Present Today"
            value={teachersPresentToday}
            description="Number of teachers present today"
            percentageChange={null}
            icon={null}
            className="bg-indigo-500 text-white shadow-md hover:shadow-lg transition-shadow duration-300"
          />
          <CardDashboard
            title="Teachers on Sick Leave"
            value={teachersSickToday}
            description="Number of teachers on sick leave today"
            percentageChange={null}
            icon={null}
            className="bg-red-500 text-white shadow-md hover:shadow-lg transition-shadow duration-300"
          />
          <CardDashboard
            title="Average Monthly Attendance"
            value={averageMonthlyAttendance}
            description="Average monthly attendance of teachers"
            percentageChange={null}
            icon={null}
            className="bg-green-500 text-white shadow-md hover:shadow-lg transition-shadow duration-300"
          />
          <CardDashboard
            title="Late Teachers"
            value={teachersLateToday}
            description="Number of teachers arriving late today"
            percentageChange={null}
            icon={null}
            className="bg-yellow-500 text-white shadow-md hover:shadow-lg transition-shadow duration-300"
          />
        </div>
  
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mt-5">
          {/* Row 1 */}
          <div className="col-span-1 bg-white shadow-lg rounded-xl overflow-hidden">
            <h3 className="text-xl font-semibold p-4 bg-gray-800 text-white">Monthly Attendance</h3>
            <div className="p-6" style={{ height: "500px" }}>
              <Line data={lineData} />
            </div>
          </div>
  
          {/* Row 2 */}
          <div className="col-span-1 bg-white shadow-lg rounded-xl overflow-hidden">
            <h3 className="text-xl font-semibold p-4 bg-gray-800 text-white">Teacher Attendance Status</h3>
            <div className="p-6" style={{ height: "500px" }}>
              <Pie data={pieData} />
            </div>
          </div>
  
          <div className="col-span-1 bg-white shadow-lg rounded-xl overflow-hidden">
            <h3 className="text-xl font-semibold p-4 bg-gray-800 text-white">Weekly Attendance</h3>
            <div className="p-6" style={{ height: "500px", width: "100%" }}>
              <Line data={weeklyData} />
            </div>
          </div>
  
          <div className="col-span-1 bg-white shadow-lg rounded-xl overflow-hidden">
            <h3 className="text-xl font-semibold p-4 bg-gray-800 text-white">
              Absensi Guru (30 Hari Terakhir)
            </h3>
            <div className="p-6" style={{ height: "500px" }}>
              <Bar data={barData} />
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
  
  );
}

export default Dashboard;
