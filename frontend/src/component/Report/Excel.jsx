import * as XLSX from "xlsx";
import Swal from "sweetalert2"; // Import SweetAlert2

const ExportButton = ({ data, columns, tableName }) => {
  const handleExport = async () => {
    // Menampilkan SweetAlert untuk konfirmasi ekspor
    const result = await Swal.fire({
      title: "Konfirmasi Ekspor",
      text: "Apakah Anda yakin ingin mengekspor data ke file Excel?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Ya, Ekspor!",
      cancelButtonText: "Batal",
    });

    if (!result.isConfirmed) {
      return; // Hentikan ekspor jika dibatalkan
    }

    // Menyiapkan data yang akan diekspor dengan kolom dinamis
    const formattedData = data.map((item) => {
      let formattedItem = {};
      columns.forEach((col) => {
        formattedItem[col.header] = item[col.field]; // Sesuaikan dengan field yang ditentukan
      });
      return formattedItem;
    });

    // Membuat worksheet dari data yang sudah diformat
    const ws = XLSX.utils.json_to_sheet(formattedData);
    const wb = XLSX.utils.book_new();

    // Menambahkan worksheet ke dalam workbook
    XLSX.utils.book_append_sheet(wb, ws, tableName || "Sheet1");

    // Mengekspor ke file Excel
    XLSX.writeFile(wb, "Laporan_Data.xlsx");

    // Menampilkan SweetAlert setelah sukses ekspor
    Swal.fire({
      title: "Berhasil!",
      text: "Data berhasil diekspor ke Excel.",
      icon: "success",
    });
  };

  return (
    <button
      onClick={handleExport}
      className="p-2 bg-green-500 text-white rounded hover:bg-green-700"
    >
      Export ke Excel
    </button>
  );
};

export default ExportButton;
