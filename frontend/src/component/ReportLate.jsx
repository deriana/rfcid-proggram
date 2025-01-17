import React, { useState, useEffect, useRef } from "react";
import Preloader from "./partial/Preloader";
import Sidebar from "./partial/Sidebar";
import Header from "./partial/Header";
import { getLateScansTeacher, getUsers } from "./api";
import ExportButton from "./Report/Excel";
import PrintButton from "./Report/PrintButton";
import { formatDateTime } from "./utilis/formatDateTime";
import TitleBox from "./Title";

const ReportLate = () => {
  // State untuk laporan, rentang tanggal, loading state, dan data pengguna
  const [reportData, setReportData] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [selectedTeacherName, setSelectedTeacherName] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [showUserList, setShowUserList] = useState(false); // State untuk mengontrol tampilkan daftar pengguna
  const [noUsersFound, setNoUsersFound] = useState(false); // Kondisi ketika tidak ada pengguna

  const inputRef = useRef(null); // Ref untuk input pencarian
  const dropdownRef = useRef(null); // Ref untuk dropdown

  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
  };

  const handleEndDateChange = (event) => {
    setEndDate(event.target.value);
  };

  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
    setShowUserList(true);

    // Jika input kosong, menampilkan 10 pengguna pertama sebagai saran
    if (value === "") {
      setNoUsersFound(false);
    } else {
      setNoUsersFound(users.filter(user => user.name.toLowerCase().includes(value.toLowerCase())).length === 0);
    }
  };

  const handleTeacherSelect = (name) => {
    setSelectedTeacherName(name);
    setShowUserList(false); // Menyembunyikan daftar setelah memilih nama
    setSearchTerm(name); // Menambahkan nama yang dipilih ke input
  };

  // Menangani tekan enter pada input
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      if (filteredTeachers.length > 0) {
        handleTeacherSelect(filteredTeachers[0].name);
      }
    }
  };

  // Filter daftar guru sesuai dengan pencarian
  const filteredTeachers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  ).slice(0, 10); // Batasi hasil filter hingga 10 guru

  // Mengambil data laporan berdasarkan rentang tanggal
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
      setReportData([]);
    }
    setLoading(false);
  };

  // Effect untuk menutup dropdown jika klik di luar kotak input dan dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target) && inputRef.current && !inputRef.current.contains(event.target)) {
        setShowUserList(false); // Tutup dropdown jika klik di luar elemen
      }
    };

    // Menambahkan event listener ke document
    document.addEventListener("click", handleClickOutside);

    // Membersihkan event listener saat komponen unmount
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

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

  // Filter laporan berdasarkan guru yang dipilih
  const filteredReports = reportData.filter((item) =>
    selectedTeacherName ? item.Nama === selectedTeacherName : true
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

            {/* Input dengan daftar pengguna */}
            <div className="mb-6 relative">
              <label htmlFor="teacher" className="block text-gray-600">
                Pilih Guru:
              </label>

              {/* Input pencarian yang langsung tampilkan daftar */}
              <input
                ref={inputRef}
                type="text"
                placeholder="Cari nama guru..."
                value={searchTerm}
                onChange={handleSearchChange}
                onKeyDown={handleKeyDown} // Menghandle enter key
                className="p-2 mb-2 rounded-md border border-gray-300 w-full"
              />

              {/* Daftar pengguna yang muncul setelah mengetik di input */}
              {showUserList && (
                <div
                  ref={dropdownRef}
                  className="absolute z-10 w-full bg-white border border-gray-300 rounded-md max-h-60 overflow-y-auto"
                  style={{ top: '100%', left: 0 }}
                >
                  {filteredTeachers.length === 0 && !noUsersFound ? (
                    <div className="p-2 text-gray-500">Pilih guru</div>
                  ) : noUsersFound ? (
                    <div className="p-2 text-gray-500">Tidak ada pengguna yang cocok</div>
                  ) : (
                    filteredTeachers.map((user) => (
                      <div
                        key={user.id}
                        className="p-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() => handleTeacherSelect(user.name)}
                      >
                        {user.name}
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>

            {/* Tombol Export dan Print */}
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
                        <td className="py-2 px-4 text-sm">{item.nip}</td>
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