import * as XLSX from "xlsx";

const ExportButton = ({ data, columns, tableName }) => {
  const handleExport = () => {
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
