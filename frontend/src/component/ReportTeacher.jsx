import React, { useState, useEffect, useRef } from "react";
import Preloader from "./partial/Preloader"; // Import Preloader untuk loading
import Sidebar from "./partial/Sidebar";
import Header from "./partial/Header";
import ExportButton from "./Report/Excel"; // Import ExportButton
import PrintButton from "./Report/PrintButton"; // Import PrintButton
import { getScansByTeacherDateRange, getUsers } from "./api"; // Import API untuk data
import { formatDateTime } from "./utilis/formatDateTime"; // Untuk format tanggal
import TitleBox from "./Title";

const ReportTeacher = () => {
  // State untuk inputan
  const [teacherId, setTeacherId] = useState(""); // ID Guru
  const [startDate, setStartDate] = useState(""); // Tanggal mulai
  const [endDate, setEndDate] = useState(""); // Tanggal selesai
  const [teachers, setTeachers] = useState([]); // Data guru
  const [reportData, setReportData] = useState([]); // Data laporan
  const [loading, setLoading] = useState(true); // Status loading
  const [errorMessage, setErrorMessage] = useState(""); // Pesan error

  const [searchTeacher, setSearchTeacher] = useState(""); // Pencarian guru
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // Status dropdown
  const [filteredTeachers, setFilteredTeachers] = useState([]); // Filter guru berdasarkan pencarian

  const inputRef = useRef(null); // Ref untuk input
  const dropdownRef = useRef(null); // Ref untuk dropdown

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

  // Ambil data laporan berdasarkan ID guru dan rentang tanggal
  useEffect(() => {
    const fetchReport = async () => {
      setLoading(true);
      try {
        if (teacherId && startDate && endDate) {
          const data = await getScansByTeacherDateRange(
            teacherId,
            startDate,
            endDate
          );
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
      item["Mata Pelajaran"]
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      item["Jenis Absensi"].toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  // Pencarian untuk guru
  useEffect(() => {
    const filtered = teachers.filter((teacher) =>
      teacher.name.toLowerCase().includes(searchTeacher.toLowerCase())
    );
    setFilteredTeachers(filtered);
  }, [searchTeacher, teachers]);

  const handleSearchTeacherChange = (event) => {
    setSearchTeacher(event.target.value);
    setIsDropdownOpen(true); // Buka dropdown saat mengetik
  };

  const handleSelectTeacher = (teacher) => {
    setTeacherId(teacher.id);
    setSearchTeacher(teacher.name);
    setIsDropdownOpen(false); // Tutup dropdown setelah memilih
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Menangani klik di luar dropdown untuk menutupnya
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        inputRef.current &&
        !inputRef.current.contains(event.target)
      ) {
        setIsDropdownOpen(false); // Menutup dropdown jika klik di luar
      }
    };

    // Menambahkan event listener saat komponen terpasang
    document.addEventListener("click", handleClickOutside);

    // Membersihkan event listener saat komponen unmount
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  // Menangani event keydown untuk memilih item pertama saat tekan "Enter"
  const handleKeyDown = (event) => {
    if (event.key === "Enter" && filteredTeachers.length > 0) {
      // Jika ada hasil pencarian dan menekan "Enter", pilih item pertama
      handleSelectTeacher(filteredTeachers[0]);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Preloader />
      <div className="flex h-screen overflow-hidden">
        <Sidebar />
        <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden bg-gray-200">
          <Header />
          <main className="p-6 space-y-6">
            <TitleBox title="Laporan Guru" />
            <div className="flex gap-4 mb-6">
              <div className="flex-1 relative">
                <label> ID Guru: </label>
                {/* Searchable Dropdown untuk Guru */}
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Cari Guru..."
                  value={searchTeacher}
                  onChange={handleSearchTeacherChange}
                  onFocus={() => setIsDropdownOpen(true)} // Buka dropdown saat focus
                  onBlur={() => setTimeout(() => setIsDropdownOpen(false), 100)} // Tutup dropdown saat blur
                  onKeyDown={handleKeyDown} // Menambahkan handler keydown
                  className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                {/* Dropdown Filter Guru */}
                {isDropdownOpen && (
                  <div
                    ref={dropdownRef}
                    className="absolute border w-full max-h-60 overflow-y-auto bg-white shadow-lg z-10 mt-1"
                  >
                    {filteredTeachers.length > 0 ? (
                      filteredTeachers.map((teacher) => (
                        <div
                          key={teacher.id}
                          onClick={() => handleSelectTeacher(teacher)}
                          className="p-3 cursor-pointer hover:bg-gray-200"
                        >
                          {teacher.name}
                        </div>
                      ))
                    ) : (
                      <div className="p-3 text-gray-500">Tidak ada guru ditemukan</div>
                    )}
                  </div>
                )}
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

            {/* Search Bar untuk Filter Data */}
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
                <h2 className="text-xl font-bold text-gray-600">
                  Tidak ada laporan untuk periode ini
                </h2>
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
                      <th className="py-3 px-4 text-left">NIP</th>
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
                        <td className="py-3 px-4 text-sm">{item.nip}</td>
                        <td className="py-3 px-4 text-sm">
                          {item["Mata Pelajaran"]}
                        </td>
                        <td className="py-3 px-4 text-sm">
                          {formatDateTime(item["Waktu Absensi"])}
                        </td>
                        <td className="py-3 px-4 text-sm">
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

export default ReportTeacher;
