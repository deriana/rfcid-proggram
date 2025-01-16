import React, { useState, useEffect } from "react";
import Preloader from "./partial/Preloader";
import Sidebar from "./partial/Sidebar";
import Header from "./partial/Header";
import { getRecapAbsen } from "./api";
import ExportButton from "./Report/Excel";
import PrintButton from "./Report/PrintButton";
import { formatDateTime } from "./utilis/formatDateTime";

const RecapReport = () => {
  // State untuk menyimpan laporan, rentang tanggal, loading state, dan filter
  const [reportData, setReportData] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState(""); // State untuk pencarian
  const [sortOrder, setSortOrder] = useState("default"); // State untuk urutan data

  // Fungsi untuk menangani perubahan pada input tanggal mulai
  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
  };

  // Fungsi untuk menangani perubahan pada input tanggal akhir
  const handleEndDateChange = (event) => {
    setEndDate(event.target.value);
  };

  // Fungsi untuk menangani perubahan pada input pencarian
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value.toLowerCase()); // Mengubah ke lowercase agar pencarian tidak sensitif terhadap kapitalisasi
  };

  // Fungsi untuk menangani perubahan pada dropdown filter
  const handleSortOrderChange = (event) => {
    setSortOrder(event.target.value);
  };

  // Fungsi untuk menangani pengambilan data laporan berdasarkan rentang tanggal
  const fetchReportData = async () => {
    if (!startDate || !endDate) {
      alert("Harap pilih tanggal mulai dan tanggal akhir.");
      return;
    }

    setLoading(true);
    const data = await getRecapAbsen(startDate, endDate);
    if (data) {
      setReportData(data);
    } else {
      setReportData([]); // Reset jika tidak ada data
    }
    setLoading(false);
  };

  // Effect untuk fetch data jika startDate atau endDate berubah
  useEffect(() => {
    if (startDate && endDate) {
      fetchReportData();
    }
  }, [startDate, endDate]);

  // Fungsi untuk melakukan pencarian di data laporan
  const filteredReports = reportData
    .filter((item) =>
      item.Nama.toLowerCase().includes(searchTerm) ||
      item.RFID.includes(searchTerm)
    )
    .sort((a, b) => {
      if (sortOrder === "late-desc") {
        return b.Terlambat - a.Terlambat; // Urutkan Terlambat dari besar ke kecil
      } else if (sortOrder === "late-asc") {
        return a.Terlambat - b.Terlambat; // Urutkan Terlambat dari kecil ke besar
      }
      return 0; // Tidak mengubah urutan
    });

  return (
    <div className="min-h-screen bg-gray-100">
      <Preloader />
      <div className="flex h-screen overflow-hidden">
        <Sidebar />
        <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden bg-gray-200">
          <Header />
          <main className="p-6 space-y-6">
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

            {/* Pencarian */}
            <div className="flex items-center space-x-4 mb-6">
              <input
                type="text"
                placeholder="Cari berdasarkan Nama atau RFID"
                value={searchTerm}
                onChange={handleSearchChange}
                className="p-2 w-1/3 rounded-md border"
              />

              {/* Dropdown untuk Sort Order */}
              <select
                value={sortOrder}
                onChange={handleSortOrderChange}
                className="p-2 rounded-md border"
              >
                <option value="default">Urutan Default</option>
                <option value="late-desc">Terlambat (Banyak ke Sedikit)</option>
                <option value="late-asc">Terlambat (Sedikit ke Banyak)</option>
              </select>
            </div>

            {/* Tombol Export dan Print - Ditempatkan di atas tabel */}
            <div className="flex space-x-4 mt-6 mb-4">
              <ExportButton
                data={filteredReports}
                columns={[
                  { header: "No", field: "No" },
                  { header: "Nama", field: "Nama" },
                  { header: "Mata Pelajaran", field: "Mata Pelajaran" },
                  { header: "Hadir", field: "Hadir" },
                  { header: "Terlambat", field: "Terlambat" },
                  { header: "Ijin", field: "Ijin" },
                  { header: "Alfa", field: "Alfa" }
                ]}
                tableName="Recap Absensi"
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
                  No reports available for the selected date range and search criteria.
                </h2>
              </div>
            ) : (
              <div className="overflow-x-auto shadow-lg rounded-lg">
                <table id="table-to-print" className="min-w-full bg-white border border-gray-300">
                  <thead>
                    <tr className="bg-gray-300 text-gray-700">
                      <th className="py-3 px-4 text-left">No</th>
                      <th className="py-3 px-4 text-left">Nama</th>
                      <th className="py-3 px-4 text-left">Mata Pelajaran</th>
                      <th className="py-3 px-4 text-left">Hadir</th>
                      <th className="py-3 px-4 text-left">Terlambat</th>
                      <th className="py-3 px-4 text-left">Ijin</th>
                      <th className="py-3 px-4 text-left">Alfa</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredReports.map((item, index) => (
                      <tr key={index} className="border-b hover:bg-gray-50">
                        <td className="py-2 px-4 text-sm">{index + 1}</td>
                        <td className="py-2 px-4 text-sm">{item.Nama}</td>
                        <td className="py-2 px-4 text-sm">{item["Mata Pelajaran"] || "-"}</td>
                        <td className="py-2 px-4 text-sm">{item.Hadir}</td>
                        <td className="py-2 px-4 text-sm">{item.Terlambat}</td>
                        <td className="py-2 px-4 text-sm">{item.Ijin}</td>
                        <td className="py-2 px-4 text-sm">{item.Alfa}</td>
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

export default RecapReport;
