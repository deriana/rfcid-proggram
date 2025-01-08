import { formatDateTime } from "../utilis/formatDateTime";

const renderAbsentAndLateReportTable = ({ data }) => {
  return (
<table className="table-auto w-full border-collapse bg-white shadow-md rounded-lg">
        <thead className="bg-gray-100 text-gray-600">
          <tr>
            <th className="px-4 py-2 border-b text-left">No</th>
            <th className="px-4 py-2 border-b text-left">Nama</th>
            <th className="px-4 py-2 border-b text-left">Kelamin</th>
            <th className="px-4 py-2 border-b text-left">Mata Pelajaran</th>
            <th className="px-4 py-2 border-b text-left">Jumlah Terlambat</th>
            <th className="px-4 py-2 border-b text-left">Jumlah Tidak Masuk</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={item.UserID} className="hover:bg-gray-50">
              <td className="px-4 py-2 border-b">{index + 1}</td>
              <td className="px-4 py-2 border-b">{item.Nama}</td>
              <td className="px-4 py-2 border-b">{item.Kelamin}</td>
              <td className="px-4 py-2 border-b">{item["Mata Pelajaran"]}</td>
              <td className="px-4 py-2 border-b">{item.JumlahTerlambat}</td>
              <td className="px-4 py-2 border-b">{item.JumlahTidakMasuk}</td>
            </tr>
          ))}
        </tbody>
      </table>
  );
};

export default renderAbsentAndLateReportTable;
