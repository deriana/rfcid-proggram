import { formatDateTime } from "../utilis/formatDateTime";
import SearchableTable from "./Search";
import ExportButton from "./Excel"; // Import komponen ExportButton

const AbsensiTable = ({ data }) => {
  const filterAbsensiData = (item, query) => {
    const queryLower = query.toLowerCase();
    return item.Nama && item.Nama.toLowerCase().includes(queryLower);
  };

  const columns = [
    { header: "No", field: "No" }, 
    { header: "Nama", field: "Nama" },
    { header: "Mata Pelajaran", field: "Mata Pelajaran" },
    { header: "Waktu Absensi", field: "Waktu Absensi" },
    { header: "Jenis Absensi", field: "Jenis Absensi" }
  ];

  const renderTable = (filteredData) => (
    <table id="table-to-print" className="table-auto w-full border-collapse bg-white shadow-md rounded-lg">
      <thead className="bg-gray-100 text-gray-600">
        <tr>
          <th className="px-4 py-2 border-b text-left">No</th>
          <th className="px-4 py-2 border-b text-left">Nama</th>
          <th className="px-4 py-2 border-b text-left">Mapel</th>
          <th className="px-4 py-2 border-b text-left">Waktu Absensi</th>
          <th className="px-4 py-2 border-b text-left">Jenis Absensi</th>
        </tr>
      </thead>
      <tbody>
        {filteredData.length === 0 ? (
          <tr>
            <td colSpan="5" className="px-4 py-2 text-center">
              Tidak ada data yang ditemukan
            </td>
          </tr>
        ) : (
          filteredData.map((item, index) => (
            <tr key={item.No} className="hover:bg-gray-50">
              <td className="px-4 py-2 border-b">{index + 1}</td>
              <td className="px-4 py-2 border-b">{item.Nama}</td>
              <td className="px-4 py-2 border-b">{item["Mata Pelajaran"]}</td>
              <td className="px-4 py-2 border-b">{formatDateTime(item["Waktu Absensi"])}</td>
              <td className="px-4 py-2 border-b">{item["Jenis Absensi"]}</td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );

  return (
    <div>
      <ExportButton data={data} columns={columns} tableName="Absensi Tabel" /> 
      <SearchableTable
        data={data}
        renderTable={renderTable}
        filterFunction={filterAbsensiData}
      />
    </div>
  );
};

export default AbsensiTable;
