import React, { useState, useEffect } from "react";
import Preloader from "./partial/Preloader";
import Sidebar from "./partial/Sidebar";
import Header from "./partial/Header";
import { getAllReport } from "./api";
import ExportButton from "./Report/Excel"; // Import ExportButton
import PrintButton from "./Report/PrintButton"; // Import PrintButton
import { formatDateTime } from "./utilis/formatDateTime";
import TitleBox from "./Title";

function Report() {
  // State untuk laporan, loading, dan pencarian
  const [reportData, setReportData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  // Filter data berdasarkan query pencarian
  const filteredData = reportData.filter((item) => {
    return (
      item.Nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item["Mata Pelajaran"]
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      item["Jenis Absensi"].toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  // Mengambil data saat komponen pertama kali dipasang
  useEffect(() => {
    const fetchReportData = async () => {
      setLoading(true); // Mulai loading
      try {
        const data = await getAllReport();
        setReportData(data); // Menyimpan data ke state reportData
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false); // Set loading false setelah data selesai diproses
      }
    };

    fetchReportData(); // Panggil fungsi untuk mengambil data
  }, []); // Hanya dipanggil sekali ketika komponen pertama kali dibuka

  // Handler untuk input pencarian
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
            <TitleBox title="Laporan Hari Ini" />

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

            {/* Loading State */}
            {loading ? (
              <div className="text-center py-10">
                <h2 className="text-xl font-bold text-gray-600">Loading...</h2>
              </div>
            ) : filteredData.length === 0 ? (
              <div className="text-center py-10">
                <h2 className="text-xl font-bold text-gray-600">
                  No reports available
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
                      <th className="py-3 px-4 text-left">Kelamin</th>
                      <th className="py-3 px-4 text-left">Mata Pelajaran</th>
                      <th className="py-3 px-4 text-left">Waktu Absensi</th>
                      <th className="py-3 px-4 text-left">Jenis Absensi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredData.map((item, index) => (
                      <tr key={item.No} className="border-b hover:bg-gray-50">
                        <td className="py-3 px-4 text-sm">{index + 1}</td>
                        <td className="py-3 px-4 text-sm">{item.Nama}</td>
                        <td className="py-3 px-4 text-sm">{item.nip}</td>
                        <td className="py-3 px-4 text-sm">{item.Kelamin}</td>
                        <td className="py-3 px-4 text-sm">
                          {item["Mata Pelajaran"]}
                        </td>
                        <td className="py-3 px-4 text-sm">
                          {formatDateTime(item["Waktu Absensi"])}{" "}
                          {/* Format tanggal menggunakan fungsi formatDateTime */}
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
}

export default Report;
