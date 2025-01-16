import { useState } from 'react';
import { uploadXlsx } from './api'; // Mengimpor API service

const ImportExcel = () => {
  const [file, setFile] = useState(null); // State untuk menyimpan file
  const [loading, setLoading] = useState(false); // State untuk menampilkan status loading

  // Handler untuk menangani file yang dipilih
  const handleFileChange = (e) => {
    setFile(e.target.files[0]); // Menyimpan file yang dipilih
  };

  // Fungsi untuk mengupload file
  const handleUpload = async () => {
    if (!file) {
      alert("Please choose a file first!"); // Periksa apakah file telah dipilih
      return;
    }

    setLoading(true); // Set status loading menjadi true

    const formData = new FormData();
    formData.append('file', file); // Menambahkan file ke FormData

    try {
      // Mengupload file
      const response = await uploadXlsx(formData);
      alert(response.message); // Menampilkan pesan dari server setelah upload selesai
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Failed to upload the file.");
    } finally {
      setLoading(false); // Setelah proses selesai, set loading ke false
    }
  };

  return (
    <div className='mb-4'>
      {/* Input untuk memilih file */}
      <input
        type="file"
        accept=".xlsx"
        onChange={handleFileChange}
        id="file-input"
        className="hidden"
      />

      {/* Tombol untuk membuka dialog file */}
      <label
        htmlFor="file-input"
        className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg cursor-pointer hover:bg-blue-700"
      >
        Choose File
      </label>

      {/* Tombol Upload */}
      <button
        onClick={handleUpload}
        disabled={loading}
        className={`ml-4 px-6 py-3 bg-green-600 text-white font-semibold rounded-lg cursor-pointer ${
          loading ? "bg-gray-400 cursor-not-allowed" : "hover:bg-green-700"
        }`}
      >
        {loading ? "Uploading..." : "Upload"}
      </button>
    </div>
  );
};

export default ImportExcel;
