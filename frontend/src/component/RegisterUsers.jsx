import React, { useState } from "react";
import { registerUser } from "./api"; // Pastikan import API service yang sudah dibuat
import { useNavigate } from "react-router-dom"; // Untuk navigasi
import Preloader from "./partial/Preloader";
import Sidebar from "./partial/Sidebar";
import Header from "./partial/Header";

const RegisterUserPage = () => {
  const navigate = useNavigate(); // Hook untuk melakukan navigasi ke halaman lain
  const [formData, setFormData] = useState({
    rfid: "",
    name: "",
    nip: "",
    kelamin: "",
    mapel: "",
    image: null,
  });
  const [formError, setFormError] = useState("");
  const [loading, setLoading] = useState(false);

  // Menangani perubahan pada input form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Menangani perubahan gambar (file)
  const handleImageChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  // Menangani submit formulir
  const handleSubmit = async (e) => {
    e.preventDefault(); // Mencegah reload halaman
    setFormError(""); // Reset error message

    if (!formData.image) {
      setFormError("Gambar harus diupload!");
      return;
    }

    setLoading(true); // Mulai loading

    try {
      // Mendaftar user menggunakan API service
      const response = await registerUser(formData);

      // Jika berhasil, arahkan ke halaman "/users"
      navigate("/users");
    } catch (error) {
      // Log the full error object to see its structure
      console.log(error);

      // Alternatively, log a more readable version, like the message from the response
      console.log(
        error?.response?.data?.message || "Terjadi kesalahan, coba lagi."
      );

      // You may also want to log other details such as the status or stack trace
      console.log(error?.response?.status);
      console.log(error?.stack);

      setFormError(
        error?.response?.data?.message || "Terjadi kesalahan, coba lagi."
      );
    } finally {
      setLoading(false); // Matikan loading
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Preloader />
      <div className="flex h-screen overflow-hidden">
        <Sidebar />
        <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden bg-gray-200">
          <Header />
          <main className="p-6 w-full max-w-full">
            <div className="container mx-auto bg-white p-6 rounded-lg shadow-md max-w-4xl">
              <h2 className="text-2xl font-semibold mb-6 text-gray-700">
                Registrasi Pengguna Baru
              </h2>

              {/* Error Message */}
              {formError && (
                <p className="text-red-500 font-semibold text-lg mb-4">
                  {formError}
                </p>
              )}

              {/* Formulir */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-gray-600 font-medium mb-1">
                    RFID:
                  </label>
                  <input
                    type="text"
                    name="rfid"
                    value={formData.rfid}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border rounded shadow-sm focus:outline-none focus:ring focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-600 font-medium mb-1">
                    Nama:
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border rounded shadow-sm focus:outline-none focus:ring focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-600 font-medium mb-1">
                    Nip:
                  </label>
                  <input
                    type="text"
                    name="nip"
                    value={formData.nip}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border rounded shadow-sm focus:outline-none focus:ring focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-600 font-medium mb-1">
                    Kelamin:
                  </label>
                  <select
                    name="kelamin"
                    value={formData.kelamin}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border rounded shadow-sm focus:outline-none focus:ring focus:ring-blue-500"
                  >
                    <option value="">Pilih</option>
                    <option value="Pria">Pria</option>
                    <option value="Wanita">Wanita</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-600 font-medium mb-1">
                    Mata Pelajaran:
                  </label>
                  <input
                    type="text"
                    name="mapel"
                    value={formData.mapel}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border rounded shadow-sm focus:outline-none focus:ring focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-600 font-medium mb-1">
                    Gambar (Upload):
                  </label>
                  <input
                    type="file"
                    name="image"
                    onChange={handleImageChange}
                    required
                    className="w-full px-4 py-2 border rounded shadow-sm focus:outline-none focus:ring focus:ring-blue-500"
                  />
                </div>
                <div>
                  <button
                    type="submit"
                    disabled={loading}
                    className={`px-4 py-2 text-white font-medium rounded ${
                      loading ? "bg-blue-300" : "bg-blue-500 hover:bg-blue-600"
                    }`}
                  >
                    {loading ? "Proses..." : "Daftar Pengguna"}
                  </button>
                </div>
              </form>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default RegisterUserPage;
