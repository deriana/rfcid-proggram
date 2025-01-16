import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Preloader from "./partial/Preloader";
import { loginAdmin } from "./api";

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
      navigate("/admin"); // Arahkan ke halaman admin
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

      setMessage({ type: "success", text: "Login berhasil!" });
      localStorage.setItem("authToken", response.token);
      localStorage.setItem("adminData", JSON.stringify(response.admin));

      setTimeout(() => navigate("/admin"), 1000);
    } catch (error) {
      const errorMsg = error.response?.data?.message || "Terjadi kesalahan saat login.";
      setMessage({ type: "error", text: errorMsg });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      {loading && <Preloader />}

      <div className="flex flex-1 items-center justify-center">
        <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-lg p-8 shadow-lg">
          <h2 className="text-2xl font-bold text-black dark:text-white text-center mb-6">
            Sign In to ZieAbsensi
          </h2>

          {message && (
            <div
              className={`text-sm text-center mb-4 ${
                message.type === "error" ? "text-red-500" : "text-green-500"
              }`}
            >
              {message.text}
            </div>
          )}

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
      </div>
    </div>
  );
};

export default Login;
