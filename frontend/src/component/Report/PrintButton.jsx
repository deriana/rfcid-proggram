import React from "react";
import Swal from "sweetalert2"; // Import SweetAlert2

const PrintButton = () => {
  const handlePrint = async () => {
    const printContent = document.getElementById("table-to-print");

    if (!printContent) {
      alert("Tabel tidak ditemukan!");
      return;
    }

    // Menampilkan konfirmasi dengan SweetAlert2 sebelum melanjutkan pencetakan
    const result = await Swal.fire({
      title: "Konfirmasi Pencetakan",
      text: "Apakah Anda yakin ingin mencetak tabel ini?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Ya, Cetak!",
      cancelButtonText: "Batal",
    });

    if (!result.isConfirmed) {
      return; // Hentikan proses pencetakan jika dibatalkan
    }

    const printWindow = window.open("", "_self"); // Menggunakan jendela yang ada saat ini

    // Menulis HTML yang akan dicetak
    printWindow.document.write("<html><head><title>Cetak Laporan</title>");

    // Menambahkan gaya khusus untuk pencetakan
    printWindow.document.write(`
      <style>
        body {
          font-family: Arial, sans-serif;
          margin: 0;
          padding: 0;
        }
        h1 {
          font-size: 20px;
          text-align: center;
        }
        #table-to-print {
          width: 100%;
          border-collapse: collapse;
          margin-bottom: 20px;
        }
        #table-to-print th,
        #table-to-print td {
          padding: 10px;
          border: 1px solid #000;
          text-align: left;
        }
        #table-to-print th {
          background-color: #f2f2f2;
        }
        /* Menyembunyikan elemen selain tabel saat pencetakan */
        .print-hide {
          display: none;
        }
        /* Menambahkan media query untuk pencetakan */
        @media print {
          body {
            background-color: #fff;
            font-size: 12px;
          }
          .no-print {
            display: none;
          }
          #table-to-print {
            width: 100%;
            border: 1px solid #000;
          }
          #table-to-print th,
          #table-to-print td {
            border: 1px solid #ddd;
            padding: 8px;
          }
        }
      </style>
    `);
    
    printWindow.document.write("</head><body>");
    printWindow.document.write("<h1>Laporan Absensi</h1>"); // Menambahkan judul
    printWindow.document.write(printContent.outerHTML); // Menyalin tabel
    printWindow.document.write("</body></html>");

    printWindow.document.close(); // Menutup dokumen setelah konten dimuat
    printWindow.print(); // Memanggil dialog print pada window yang terbuka
  };

  return (
    <button
      onClick={handlePrint}
      className="p-2 bg-blue-500 text-white rounded hover:bg-blue-700 no-print"
    >
      Cetak Tabel
    </button>
  );
};

export default PrintButton;
