import React, { useEffect, useState } from "react";
import { getReportForLateAndAbsentUsers } from "../api"; // Sesuaikan path ke file api jika diperlukan

const Table = () => {
  const [data, setData] = useState([]);  // Data untuk menampung hasil fetch
  const [isLoading, setIsLoading] = useState(true);  // Menangani loading state

  useEffect(() => {
    const fetchTable = async () => {
      try {
        setIsLoading(true);
        const fetchedData = await getReportForLateAndAbsentUsers();
        setData(fetchedData);  // Set data yang diambil ke state
      } catch (error) {
        console.error("Error Fetching Report", error);
      } finally {
        setIsLoading(false);  // Setelah selesai fetching, set loading jadi false
      }
    };

    fetchTable();  // Panggil fungsi untuk fetch data
  }, []); // UseEffect tanpa dependency array berarti akan berjalan sekali saat komponen di-mount

  // Kondisi untuk menampilkan loading atau pesan jika data kosong
  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (data.length === 0) {
    return <p>No data available to display</p>;
  }

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <h4 className="mb-6 text-xl font-bold text-black dark:text-white">
        Guru Yang Jarang Hadir
      </h4>

      <div className="flex flex-col">
        <div className="grid grid-cols-3 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-5">
          <div className="p-2.5 xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">No</h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">Nama</h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">Mapel</h5>
          </div>
          <div className="hidden p-2.5 text-center sm:block xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">Jumlah Terlambat</h5>
          </div>
          <div className="hidden p-2.5 text-center sm:block xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">Jumlah Tidak Masuk</h5>
          </div>
        </div>

        {data.map((item, index) => (
          <div key={item.UserID} className="grid grid-cols-3 border-b border-stroke dark:border-strokedark sm:grid-cols-5">
            <div className="flex items-center gap-3 p-2.5 xl:p-5">
              <p className="hidden font-medium text-black dark:text-white sm:block">{index + 1}</p>
            </div>

            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="font-medium text-black dark:text-white">{item.Nama}</p>
            </div>

            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="font-medium text-meta-3">{item['Mata Pelajaran'] || 'N/A'}</p>
            </div>

            <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
              <p className="font-medium text-black dark:text-white">{item.JumlahTerlambat}</p>
            </div>

            <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
              <p className="font-medium text-meta-5">{item.JumlahTidakMasuk}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Table;
