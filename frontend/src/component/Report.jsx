import React, { useState, useEffect } from "react";
import Preloader from "./partial/Preloader";
import Sidebar from "./partial/Sidebar";
import Header from "./partial/Header";
import {
  getAllReport,
  getLateScans,
  getReportByDateRange,
  getReportByTeacher,
  getReportByDateRangeAndTimeCondition,
  getLateScansTeacher,
  getScansByTeacherDateRange,
  getReportForLateAndAbsentUsers,
  getUsers,
} from "./api";
import AbsensiTable from "./Report/renderAllReportsTable";
import LateTable from "./Report/renderLateScansTable";
import DateRangeTable from "./Report/renderDateRangeTable";
import TeacherTable from "./Report/renderTeacherReportTable";
import TeacherLateTable from "./Report/renderLateByTeacherTable";
import DateAndConditionTable from "./Report/renderDateRangeWithConditionTable";
import TeacherDateTable from "./Report/teacherDateRangeTable";
import AbsentAndLateTable from "./Report/renderAbsentAndLateReportTable";

function Report() {
  const [reportType, setReportType] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    startDate: "",
    endDate: "",
    teacherId: "",
    timeCondition: "",
    timeValue: "",
    teacherName: "",
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [users, setUsers] = useState([]);
  const [selectedTeacherId, setSelectedTeacherId] = useState(""); // Untuk menyimpan ID guru yang dipilih

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredData = data.filter((item) => {
    const matchesSearchQuery = item.Nama.toLowerCase().includes(
      searchQuery.toLowerCase()
    );
    const matchesTeacher = filters.teacherId
      ? item.teacherId === filters.teacherId
      : true;
    const matchesStartDate = filters.startDate
      ? new Date(item.date) >= new Date(filters.startDate)
      : true;
    const matchesEndDate = filters.endDate
      ? new Date(item.date) <= new Date(filters.endDate)
      : true;

    return (
      matchesSearchQuery && matchesTeacher && matchesStartDate && matchesEndDate
    );
  });

  const fetchReports = async () => {
    setLoading(true);
    try {
      let result;
      switch (reportType) {
        case "lateScans":
          result = await getLateScans();
          break;
        case "dateRange":
          result = await getReportByDateRange(
            filters.startDate,
            filters.endDate
          );
          break;
        case "teacher":
          result = await getReportByTeacher(filters.teacherId);
          break;
        case "lateByTeacher":
          result = await getLateScansTeacher(filters.teacherId);
          break;
        case "dateRangeWithCondition":
          result = await getReportByDateRangeAndTimeCondition(
            filters.startDate,
            filters.endDate,
            filters.timeCondition,
            filters.timeValue
          );
          break;
        case "teacherDateRange":
          result = await getScansByTeacherDateRange(
            filters.teacherId,
            filters.startDate,
            filters.endDate
          );
          break;
        case "absentAndLate":
          result = await getReportForLateAndAbsentUsers();
          break;
        default:
          result = await getAllReport();
          break;
      }

      if (!result || result.length === 0) {
        setData([]);
        setLoading(false);
        return;
      }
      setData(result);
    } catch (error) {
      console.error("Error fetching report:", error);
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, [reportType, filters]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Memanggil API untuk mendapatkan data guru
  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const userData = await getUsers();
        setUsers(userData); // Menyimpan data pengguna ke state 'users'
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers(); // Memanggil fungsi untuk mengambil data pengguna
  }, []);

  const handleTeacherChange = (event) => {
    setSelectedTeacherId(event.target.value); // Menyimpan ID guru yang dipilih ke state
    setFilters((prevFilters) => ({
      ...prevFilters,
      teacherId: event.target.value, // Mengubah state filters dengan teacherId yang baru
    }));
  };

  const renderTable = () => {
    if (loading) {
      return <p>Memuat laporan...</p>;
    }

    // Mengecek apakah data kosong
    if (!data || data.length === 0) {
      return <p>Laporan tidak tersedia.</p>; // Menampilkan pesan jika data tidak ada
    }

    switch (reportType) {
      case "lateScans":
        return renderLateScansTable(filteredData);
      case "dateRange":
        return renderDateRangeTable(filteredData);
      case "teacher":
        return renderTeacherReportTable(filteredData);
      case "lateByTeacher":
        return renderLateByTeacherTable(filteredData);
      case "dateRangeWithCondition":
        return renderDateRangeWithConditionTable(filteredData);
      case "teacherDateRange":
        return renderTeacherDateRangeTable(filteredData);
      case "absentAndLate":
        return renderAbsentAndLateReportTable(filteredData);
      default:
        return renderAllReportsTable(filteredData);
    }
  };

  // Fungsi render untuk laporan berbeda
  const renderLateScansTable = () => {
    return <LateTable data={data} />;
  };

  const renderDateRangeTable = () => {
    return <DateRangeTable data={data} />;
  };

  const renderTeacherReportTable = () => {
    return <TeacherTable data={data} />;
  };

  const renderLateByTeacherTable = () => {
    return <TeacherLateTable data={data} />;
  };

  const renderDateRangeWithConditionTable = () => {
    return <DateAndConditionTable data={data} />;
  };

  const renderTeacherDateRangeTable = () => {
    return <TeacherDateTable data={data} />;
  };

  const renderAbsentAndLateReportTable = () => {
    return <AbsentAndLateTable data={data} />;
  };

  const renderAllReportsTable = () => {
    return <AbsensiTable data={data} />;
  };

  return (
    <div>
      <Preloader />
      <div className="flex h-screen overflow-hidden">
        <Sidebar />
        <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden bg-gray-200">
          <Header />
          <main className="p-4">
            <h1 className="text-2xl font-bold">Laporan</h1>
            <div className="mt-4 space-y-4">
              <div>
                <label htmlFor="reportType" className="block font-medium">
                  Pilih Jenis Laporan:
                </label>
                <select
                  id="reportType"
                  value={reportType}
                  onChange={(e) => setReportType(e.target.value)}
                  className="block w-full p-2 border rounded"
                >
                  <option value="">Semua Laporan (Default)</option>
                  <option value="lateScans">Laporan Terlambat</option>
                  <option value="dateRange">
                    Laporan Berdasarkan Rentang Tanggal
                  </option>
                  <option value="teacher">Laporan Berdasarkan Guru</option>
                  <option value="lateByTeacher">
                    Laporan Terlambat Berdasarkan Guru
                  </option>
                  <option value="dateRangeWithCondition">
                    Laporan Berdasarkan Rentang Tanggal dan Waktu
                  </option>
                  <option value="teacherDateRange">
                    Laporan Guru Berdasarkan Rentang Tanggal
                  </option>
                  <option value="absentAndLate">
                    Laporan Terlambat dan Absen
                  </option>
                </select>
              </div>

              {reportType === "dateRange" && (
                <div className="space-y-2">
                  <label>
                    Start Date:{" "}
                    <input
                      type="date"
                      name="startDate"
                      value={filters.startDate}
                      onChange={handleInputChange}
                      className="p-2 border rounded"
                    />
                  </label>
                  <label>
                    End Date:{" "}
                    <input
                      type="date"
                      name="endDate"
                      value={filters.endDate}
                      onChange={handleInputChange}
                      className="p-2 border rounded"
                    />
                  </label>
                </div>
              )}

              {reportType === "teacher" && (
                <div className="space-y-2">
                  <label>
                    Teacher:
                    <select
                      name="teacherId"
                      value={filters.teacherId}
                      onChange={handleInputChange}
                      className="p-2 border rounded"
                    >
                      <option value="">Select Teacher</option>
                      {users.map((user) => (
                        <option key={user.id} value={user.id}>
                          {user.name}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>
              )}

              {reportType === "lateByTeacher" && (
                <div className="space-y-2">
                  <label>
                    Teacher:
                    <select
                      name="teacherId"
                      value={filters.teacherId}
                      onChange={handleInputChange}
                      className="p-2 border rounded"
                    >
                      <option value="">Select Teacher</option>
                      {users.map((user) => (
                        <option key={user.id} value={user.id}>
                          {user.name}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>
              )}

              {reportType === "dateRangeWithCondition" && (
                <div className="space-y-2">
                  <label>
                    Start Date:{" "}
                    <input
                      type="date"
                      name="startDate"
                      value={filters.startDate}
                      onChange={handleInputChange}
                      className="p-2 border rounded"
                    />
                  </label>
                  <label>
                    End Date:{" "}
                    <input
                      type="date"
                      name="endDate"
                      value={filters.endDate}
                      onChange={handleInputChange}
                      className="p-2 border rounded"
                    />
                  </label>
                  <label>
                    Time Condition:{" "}
                    <select
                      name="timeCondition"
                      value={filters.timeCondition}
                      onChange={handleInputChange}
                      className="p-2 border rounded"
                    >
                      <option value="">Select Condition</option>
                      <option value="<">Before</option>
                      <option value=">">After</option>
                    </select>
                  </label>
                  <label>
                    Time Value:{" "}
                    <input
                      type="time"
                      name="timeValue"
                      value={filters.timeValue}
                      onChange={handleInputChange}
                      className="p-2 border rounded"
                    />
                  </label>
                </div>
              )}

              {reportType === "teacherDateRange" && (
                <div className="space-y-2">
                  <label>
                    Teacher:
                    <select
                      name="teacherId"
                      value={filters.teacherId}
                      onChange={handleInputChange}
                      className="p-2 border rounded"
                    >
                      <option value="">Select Teacher</option>
                      {users.map((user) => (
                        <option key={user.id} value={user.id}>
                          {user.name}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label>
                    Start Date:{" "}
                    <input
                      type="date"
                      name="startDate"
                      value={filters.startDate}
                      onChange={handleInputChange}
                      className="p-2 border rounded"
                    />
                  </label>
                  <label>
                    End Date:{" "}
                    <input
                      type="date"
                      name="endDate"
                      value={filters.endDate}
                      onChange={handleInputChange}
                      className="p-2 border rounded"
                    />
                  </label>
                </div>
              )}
              <div className="mt-6">{renderTable()}</div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default Report;
