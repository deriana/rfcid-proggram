import React, { useState, useEffect } from "react";
import Preloader from "./partial/Preloader"; // Import Preloader untuk loading
import Sidebar from "./partial/Sidebar";
import Header from "./partial/Header";
import { getLateScansTeacher, getUsers } from "./api"; // Impor API untuk mendapatkan data terlambat
import ExportButton from "./Report/Excel";
import PrintButton from "./Report/PrintButton";
import { formatDateTime } from "./utilis/formatDateTime"; // Untuk format tanggal
import TitleBox from "./Title";

const ReportLate = () => {
  // State untuk menyimpan laporan, rentang tanggal, dan loading state
  const [reportData, setReportData] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]); // State untuk user data
  const [selectedTeacherName, setSelectedTeacherName] = useState(""); // State untuk nama guru yang dipilih
  const [searchTeacher, setSearchTeacher] = useState(""); // State untuk input pencarian guru
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // Menyimpan apakah dropdown terbuka atau tidak

  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
  };

  // Fungsi untuk menangani perubahan pada input tanggal akhir
  const handleEndDateChange = (event) => {
    setEndDate(event.target.value);
  };

  // Fungsi untuk menangani perubahan pada input dropdown pemilihan user
  const handleTeacherChange = (teacherName) => {
    setSelectedTeacherName(teacherName);
    setIsDropdownOpen(false); // Tutup dropdown setelah memilih
  };

  // Fungsi untuk menangani pencarian guru
  const handleSearchTeacherChange = (event) => {
    setSearchTeacher(event.target.value);
  };

  // Fungsi untuk menangani pengambilan data laporan berdasarkan rentang tanggal
  const fetchReportData = async () => {
    if (!startDate || !endDate) {
      alert("Harap pilih tanggal mulai dan tanggal akhir.");
      return;
    }

    setLoading(true);
    const data = await getLateScansTeacher(startDate, endDate);
    if (data) {
      setReportData(data);
    } else {
      setReportData([]); // Reset jika tidak ada data
    }
    setLoading(false);
  };

  useEffect(() => {
    const fetchUsersData = async () => {
      try {
        const userData = await getUsers();
        setUsers(userData);
      } catch (error) {
        console.error("Error fetching users", error);
      }
    };

    fetchUsersData();
  }, []);

  useEffect(() => {
    if (startDate && endDate) {
      fetchReportData();
    }
  }, [startDate, endDate]);

  // Filter reportData berdasarkan nama user yang dipilih dari dropdown
  const filteredReports = reportData.filter((item) =>
    selectedTeacherName ? item.Nama === selectedTeacherName : true
  );

  // Filter daftar guru berdasarkan input pencarian
  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTeacher.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100">
      <Preloader />
      <div className="flex h-screen overflow-hidden">
        <Sidebar />
        <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden bg-gray-200">
          <Header />
          <main className="p-6 space-y-6">
            <TitleBox title="Laporan Terlambat" />

            <div className="flex space-x-4 mb-4">
              {/* Input untuk memilih rentang tanggal */}
              <input
                type="date"
                value={startDate}
                onChange={handleStartDateChange}
                className="p-2 rounded-md border"
              />
              <span>to</span>
              <input
                type="date"
                value={endDate}
                onChange={handleEndDateChange}
                className="p-2 rounded-md border"
              />
            </div>

            {/* Input untuk pencarian nama guru */}
            <div className="mb-6">
              <label htmlFor="teacher" className="block text-gray-600">
                Pilih Guru:
              </label>

              {/* Pencarian dengan input */}
              <input
                type="text"
                placeholder="Cari Guru..."
                value={searchTeacher}
                onChange={handleSearchTeacherChange}
                onFocus={() => setIsDropdownOpen(true)} // Buka dropdown saat fokus
                onBlur={() => setTimeout(() => setIsDropdownOpen(false), 100)} // Tutup dropdown setelah input kehilangan fokus
                className="p-2 mb-2 rounded-md border w-full"
              />

              {/* Custom Dropdown */}
              {isDropdownOpen && (
                <div className="absolute border bg-white w-full max-h-60 overflow-y-auto rounded-md shadow-lg mt-1 z-10">
                  {filteredUsers.length > 0 ? (
                    filteredUsers.map((user) => (
                      <div
                        key={user.id}
                        onClick={() => handleTeacherChange(user.name)}
                        className="p-2 cursor-pointer hover:bg-gray-200"
                      >
                        {user.name}
                      </div>
                    ))
                  ) : (
                    <div className="p-2 text-gray-500">Tidak ada guru ditemukan</div>
                  )}
                </div>
              )}
            </div>

            {/* Tombol Export dan Print - Ditempatkan di atas tabel */}
            <div className="flex space-x-4 mt-6 mb-4">
              <ExportButton
                data={filteredReports}
                columns={[
                  { header: "No", field: "No" },
                  { header: "Nama", field: "Nama" },
                  { header: "NIP", field: "NIP" },
                  { header: "Kelamin", field: "Kelamin" },
                  { header: "Mata Pelajaran", field: "Mata Pelajaran" },
                  { header: "Waktu Absensi", field: "Waktu Absensi" },
                  { header: "Jenis Absensi", field: "Jenis Absensi" },
                ]}
                tableName="Laporan Absensi"
              />
              <PrintButton />
            </div>

            {loading ? (
              <div className="text-center py-10">
                <h2 className="text-xl font-bold text-gray-600">Loading...</h2>
              </div>
            ) : filteredReports.length === 0 ? (
              <div className="text-center py-10">
                <h2 className="text-xl font-bold text-gray-600">
                  No reports available for the selected date range and teacher.
                </h2>
              </div>
            ) : (
              <div className="overflow-x-auto shadow-lg rounded-lg">
                <table
                  id="table-to-print"
                  className="min-w-full bg-white border border-gray-300"
                >
                  <thead>
                    <tr className="bg-gray-300 text-gray-700">
                      <th className="py-3 px-4 text-left">No</th>
                      <th className="py-3 px-4 text-left">Nama</th>
                      <th className="py-3 px-4 text-left">NIP</th>
                      <th className="py-3 px-4 text-left">Kelamin</th>
                      <th className="py-3 px-4 text-left">Mata Pelajaran</th>
                      <th className="py-3 px-4 text-left">Waktu Absensi</th>
                      <th className="py-3 px-4 text-left">Jenis Absensi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredReports.map((item, index) => (
                      <tr key={item.No} className="border-b hover:bg-gray-50">
                        <td className="py-2 px-4 text-sm">{index + 1}</td>
                        <td className="py-2 px-4 text-sm">{item.Nama}</td>
                        <td className="py-2 px-4 text-sm">{item.RFID}</td>
                        <td className="py-2 px-4 text-sm">{item.Kelamin}</td>
                        <td className="py-2 px-4 text-sm">
                          {item["Mata Pelajaran"]}
                        </td>
                        <td className="py-2 px-4 text-sm">
                          {formatDateTime(item["Waktu Absensi"])}
                        </td>
                        <td className="py-2 px-4 text-sm">
                          {item["Jenis Absensi"]}
                        </td>
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

export default ReportLate;
