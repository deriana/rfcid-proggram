import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Untuk navigasi
import Preloader from "./partial/Preloader";
import { loginAdmin } from './api'; // Mengimpor fungsi API login admin

const Login = () => {
  const [usernameOrEmail, setUsernameOrEmail] = useState(""); // Untuk username atau email
  const [password, setPassword] = useState(""); // Untuk password
  const [loading, setLoading] = useState(false); // Untuk status loading
  const [errorMessage, setErrorMessage] = useState(""); // Menampilkan pesan error
  const [successMessage, setSuccessMessage] = useState(""); // Menampilkan pesan sukses
  
  const navigate = useNavigate(); // Hook untuk navigasi ke halaman admin

  // Cek token saat komponen pertama kali dimuat
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      navigate("/admin"); // Jika sudah ada token, langsung arahkan ke halaman admin
    }
  }, [navigate]);  // Hanya sekali ketika pertama kali komponen dimuat

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    if (!usernameOrEmail || !password) {
      setErrorMessage("Username/Email dan Password wajib diisi.");
      return;
    }

    try {
      setLoading(true);

      const response = await loginAdmin(usernameOrEmail, password);

      setSuccessMessage("Login berhasil! Mengarahkan ke halaman admin...");
      console.log("Login berhasil:", response);

      localStorage.setItem("authToken", response.token);

      setTimeout(() => {
        navigate("/admin"); 
      }, 1000);
    } catch (error) {
      console.error("Error saat login:", error);
      setErrorMessage(
        error.message || "Terjadi kesalahan saat login. Coba lagi."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      {loading && <Preloader />}

      <div className="flex flex-1 items-center justify-center">
        <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-lg p-8 shadow-lg">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-black dark:text-white">
              Sign In to ZieAbsensi
            </h2>
          </div>

          {errorMessage && (
            <div className="text-red-500 text-sm mb-4 text-center">
              {errorMessage}
            </div>
          )}
          {successMessage && (
            <div className="text-green-500 text-sm mb-4 text-center">
              {successMessage}
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
                name="usernameOrEmail"
                value={usernameOrEmail}
                onChange={(e) => setUsernameOrEmail(e.target.value)}
                placeholder="Enter your username or email"
                required
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
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
                className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:ring-primary dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:outline-none"
              />
            </div>
            <div className="mb-5">
              <input
                type="submit"
                value="Sign In"
                className="w-full p-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
