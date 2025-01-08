import React, { useState, useEffect } from "react";
import Preloader from './partial/Preloader';
import Sidebar from './partial/Sidebar';
import Header from './partial/Header';
import { useParams, useNavigate } from "react-router-dom";
import { getAdminById, editAdmin } from "./api";

function EditAdmin() {
  const { id } = useParams();  // Ambil ID admin dari URL
  const [admin, setAdmin] = useState(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");  // Password tetap kosong di awal
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAdmin = async () => {
      setLoading(true);
      try {
        const response = await getAdminById(id);
        setAdmin(response.data);
        setUsername(response.data.username);
        setEmail(response.data.email);
      } catch (error) {
        setError("Gagal mengambil data admin");
      } finally {
        setLoading(false);
      }
    };

    fetchAdmin();
  }, [id, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedAdmin = { username, email, password };

    setLoading(true);
    try {
      await editAdmin(id, updatedAdmin);  // Edit admin
      navigate("/admin/dashboard");  // Kembali ke dashboard setelah berhasil edit
    } catch (error) {
      setError("Gagal mengupdate admin");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Preloader />
      <div className="flex h-screen overflow-hidden">
        <Sidebar />
        <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden bg-gray-200">
          <Header />
          <main>
            <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
              <h1 className="text-3xl font-bold mb-6 text-gray-800">Edit Admin</h1>

              {/* Error Handling */}
              {error && <p className="text-red-500 mb-4">{error}</p>}

              {/* Admin Data Form */}
              {loading ? (
                <div className="text-center">Loading...</div>
              ) : (
                admin && (
                  <div className="bg-white p-8 rounded shadow-lg max-w-lg mx-auto">
                    <form onSubmit={handleSubmit}>
                      {/* Username Input */}
                      <div className="mb-4">
                        <label htmlFor="username" className="block text-sm font-medium text-gray-600 mb-2">
                          Username
                        </label>
                        <input
                          id="username"
                          type="text"
                          placeholder="Enter Username"
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>

                      {/* Email Input */}
                      <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-600 mb-2">
                          Email
                        </label>
                        <input
                          id="email"
                          type="email"
                          placeholder="Enter Email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>

                      {/* Password Input */}
                      <div className="mb-4">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-600 mb-2">
                          New Password (optional)
                        </label>
                        <input
                          id="password"
                          type="password"
                          placeholder="Enter new password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>

                      {/* Update Button */}
                      <button
                        type="submit"
                        className="w-full py-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition duration-300"
                        disabled={loading}
                      >
                        {loading ? "Updating..." : "Update Admin"}
                      </button>
                    </form>
                  </div>
                )
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default EditAdmin;
