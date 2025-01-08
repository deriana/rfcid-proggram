import { formatDateTime } from "../utilis/formatDateTime";

const renderLateByTeacherTable = ({ data }) => {
  return (
<table className="table-auto w-full border-collapse bg-white shadow-md rounded-lg">
        <thead className="bg-gray-100 text-gray-600">
          <tr>
            <th className="px-4 py-2 border-b text-left">No</th>
            <th className="px-4 py-2 border-b text-left">Nama</th>
            <th className="px-4 py-2 border-b text-left">Mapel</th>
            <th className="px-4 py-2 border-b text-left">Waktu Absensi</th>
            <th className="px-4 py-2 border-b text-left">Tipe Absensi</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index} className="hover:bg-gray-50">
              <td className="px-4 py-2 border-b">{index + 1}</td>
              <td className="px-4 py-2 border-b">{item.Nama}</td>
              <td className="px-4 py-2 border-b">{item["Mata Pelajaran"]}</td>
              <td className="px-4 py-2 border-b">
                {formatDateTime(item["Waktu Masuk"])} 
              </td>
              <td className="px-4 py-2 border-b">{item["Jenis Absensi"]}</td>
            </tr>
          ))}
        </tbody>
      </table>
  );
};

export default renderLateByTeacherTable;
