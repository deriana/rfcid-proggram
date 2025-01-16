import React, { useState, useEffect } from "react";
import Preloader from "./partial/Preloader"; // Import Preloader untuk loading
import Sidebar from "./partial/Sidebar";
import Header from "./partial/Header";
import ExportButton from "./Report/Excel"; // Import ExportButton
import PrintButton from "./Report/PrintButton"; // Import PrintButton
import { getScansByTeacherDateRange, getUsers } from "./api"; // Import API untuk data
import { formatDateTime } from "./utilis/formatDateTime"; // Untuk format tanggal

const ReportTeacher = () => {
  // State untuk inputan
  const [teacherId, setTeacherId] = useState(""); // ID Guru
  const [startDate, setStartDate] = useState("2025-01-01"); // Tanggal mulai
  const [endDate, setEndDate] = useState("2025-01-10"); // Tanggal selesai
  const [teachers, setTeachers] = useState([]); // Data guru
  const [reportData, setReportData] = useState([]); // Data laporan
  const [loading, setLoading] = useState(true); // Status loading
  const [errorMessage, setErrorMessage] = useState(""); // Pesan error

  // Ambil data guru dari API
  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const data = await getUsers();
        setTeachers(data); // Update state dengan data guru
      } catch (error) {
        console.error("Error fetching teachers:", error);
      }
    };
    fetchTeachers();
  }, []);

  // Fetch laporan berdasarkan ID guru dan rentang tanggal
  useEffect(() => {
    const fetchReport = async () => {
      setLoading(true);
      try {
        if (teacherId && startDate && endDate) {
          const data = await getScansByTeacherDateRange(teacherId, startDate, endDate);
          setReportData(data || []);
        } else {
          setReportData([]);
        }
      } catch (error) {
        console.error("Error fetching reports:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReport();
  }, [teacherId, startDate, endDate]);

  // Pencarian filter untuk laporan
  const [searchQuery, setSearchQuery] = useState("");
  const filteredData = reportData.filter((item) => {
    return (
      item.Nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item["Mata Pelajaran"].toLowerCase().includes(searchQuery.toLowerCase()) ||
      item["Jenis Absensi"].toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Preloader />
      <div className="flex h-screen overflow-hidden">
        <Sidebar />
        <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden bg-gray-200">
          <Header />
          <main className="p-6 space-y-6">
            <div className="flex gap-4 mb-6">
              <div className="flex-1">
                <label> ID Guru: </label>
                <select
                  value={teacherId}
                  onChange={(e) => setTeacherId(e.target.value)}
                  className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="">Pilih Guru</option>
                  {teachers.map((teacher) => (
                    <option key={teacher.id} value={teacher.id}>
                      {teacher.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex-1">
                <label> Tanggal Mulai: </label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div className="flex-1">
                <label> Tanggal Selesai: </label>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>

            {/* Search Bar */}
            <div className="mb-6">
              <input
                type="text"
                className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Search by name, subject, or attendance type"
                value={searchQuery}
                onChange={handleSearchChange}
              />
            </div>

            {/* Tombol Export dan Print */}
            <div className="mb-6 flex gap-4">
              <ExportButton 
                data={filteredData} 
                columns={[
                  { header: "No", field: "No" },
                  { header: "Nama", field: "Nama" },
                  { header: "Mata Pelajaran", field: "Mata Pelajaran" },
                  { header: "Waktu Absensi", field: "Waktu Absensi" },
                  { header: "Jenis Absensi", field: "Jenis Absensi" },
                ]}
                tableName="Laporan Absensi"
              />
              <PrintButton />
            </div>

            {/* Loading State */}
            {loading ? (
              <div className="text-center py-10">
                <h2 className="text-xl font-bold text-gray-600">Loading...</h2>
              </div>
            ) : filteredData.length === 0 ? (
              <div className="text-center py-10">
                <h2 className="text-xl font-bold text-gray-600">Tidak ada laporan untuk periode ini</h2>
              </div>
            ) : (
              // Data Table
              <div className="overflow-x-auto shadow-lg rounded-lg">
                <table
                  id="table-to-print" // Tambahkan ID agar dapat dicetak
                  className="min-w-full bg-white border border-gray-300 rounded-lg shadow-sm"
                >
                  <thead>
                    <tr className="bg-gray-600 text-white">
                      <th className="py-3 px-4 text-left">No</th>
                      <th className="py-3 px-4 text-left">Nama</th>
                      <th className="py-3 px-4 text-left">Mata Pelajaran</th>
                      <th className="py-3 px-4 text-left">Waktu Absensi</th>
                      <th className="py-3 px-4 text-left">Jenis Absensi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredData.map((item, index) => (
                      <tr key={index} className="border-b hover:bg-gray-50">
                        <td className="py-3 px-4 text-sm">{index + 1}</td>
                        <td className="py-3 px-4 text-sm">{item.Nama}</td>
                        <td className="py-3 px-4 text-sm">{item["Mata Pelajaran"]}</td>
                        <td className="py-3 px-4 text-sm">
                          {formatDateTime(item["Waktu Absensi"])}
                        </td>
                        <td className="py-3 px-4 text-sm">{item["Jenis Absensi"]}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default ReportTeacher;
