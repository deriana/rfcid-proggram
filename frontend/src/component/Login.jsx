import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Preloader from "./partial/Preloader";
import { loginAdmin } from "./api";
import Swal from "sweetalert2"; // Import SweetAlert2

const Login = () => {
  const [usernameOrEmail, setUsernameOrEmail] = useState(""); // Input untuk username atau email
  const [password, setPassword] = useState(""); // Input untuk password
  const [loading, setLoading] = useState(false); // Loading spinner
  const [message, setMessage] = useState(null); // Status pesan: error atau sukses

  const navigate = useNavigate();

  // Cek apakah user sudah login
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      navigate("/dashboard"); // Arahkan ke halaman admin
    }
  }, [navigate]);

  // Handle Form Submit
  const handleSubmit = async (e) => {
    e.preventDefault(); // Mencegah reload halaman
    setMessage(null); // Reset pesan error/sukses

    if (!usernameOrEmail || !password) {
      setMessage({ type: "error", text: "Semua bidang wajib diisi." });
      return;
    }

    try {
      setLoading(true);
      const response = await loginAdmin(usernameOrEmail, password);

      // Tampilkan SweetAlert jika login sukses
      Swal.fire({
        title: "Login Berhasil!",
        text: "Anda berhasil login, sedang mengalihkan ke dashboard...",
        icon: "success",
        confirmButtonText: "OK",
      });

      localStorage.setItem("authToken", response.token);
      localStorage.setItem("adminData", JSON.stringify(response.admin));

      setTimeout(() => navigate("/dashboard"), 1000);
    } catch (error) {
      const errorMsg =
        error.response?.data?.message || "Terjadi kesalahan saat login.";

      // Tampilkan SweetAlert jika login gagal
      Swal.fire({
        title: "Login Gagal!",
        text: errorMsg,
        icon: "error",
        confirmButtonText: "OK",
      });

      setMessage({ type: "error", text: errorMsg });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100 p-4 md:p-12">
      <div className="w-full md:w-1/2 flex flex-col items-center justify-between bg-white p-8 rounded-lg shadow-lg">
        <div className="flex w-full justify-start">
          <h1 className="text-1xl font-bold text-black">SMKN 1 CIANJUR</h1>
        </div>

        <div className="w-full">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-left text-gray-800 mb-6">
            Present Zie Login
          </h2>

          {/* Display error or success message */}
          {message && (
            <div
              className={`text-sm text-center mb-4 ${
                message.type === "error" ? "text-red-500" : "text-green-500"
              }`}
            >
              {message.text}
            </div>
          )}

          {/* Updated Form */}
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="usernameOrEmail"
                className="block text-sm font-medium text-gray-700 dark:text-white"
              >
                Username atau Email
              </label>
              <input
                type="text"
                id="usernameOrEmail"
                value={usernameOrEmail}
                onChange={(e) => setUsernameOrEmail(e.target.value)}
                placeholder="Masukkan username atau email Anda"
                className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:ring-primary dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:outline-none"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 dark:text-white"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Masukkan password Anda"
                className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:ring-primary dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full p-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
              disabled={loading}
            >
              {loading ? "Memproses..." : "Sign In"}
            </button>
          </form>
        </div>

        <div className="flex w-full justify-end">
          <img src="/logo.png" alt="Logo" className="w-15 h-15 mr-4" />
          <img src="/logo-tefa.png" alt="Tefa Logo" className="w-15 h-15" />
        </div>

        {/* <div className="flex w-full justify-end mt-auto">
          <img src="/logo.png" alt="Logo" className="w-15 h-15 mr-4" />
          <img src="/logo-tefa.png" alt="Tefa Logo" className="w-15 h-15" />
        </div> */}
      </div>

      <div className="hidden md:flex w-1/2 justify-center items-center">
        <img
          src="/bg.jpeg"
          alt="Smakzie building"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default Login;
