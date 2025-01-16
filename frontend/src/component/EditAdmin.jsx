import React, { useState, useEffect } from "react";
import Preloader from "./partial/Preloader";
import Sidebar from "./partial/Sidebar";
import Header from "./partial/Header";
import { useParams, useNavigate } from "react-router-dom";
import { getAdminById, editAdmin } from "./api";
import Swal from "sweetalert2"; // Import SweetAlert

const EditAdmin = () => {
  const { id } = useParams(); // Ambil ID admin dari URL
  const [admin, setAdmin] = useState(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [password, setPassword] = useState(""); // Field untuk password opsional
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Ambil data admin berdasarkan ID
  useEffect(() => {
    const fetchAdminData = async () => {
      setLoading(true);
      try {
        const response = await getAdminById(id); // Panggil API untuk mendapatkan data admin

        if (response.data && response.data.length > 0) {
          const adminData = response.data[0]; // Ambil elemen pertama dari array
          setAdmin(adminData); // Set admin data
          setUsername(adminData.username); // Set username
          setEmail(adminData.email); // Set email
          setRole(adminData.role);
        } else {
          setError("Admin not found.");
        }
      } catch (error) {
        console.error("Error fetching admin data:", error);
        setError("Failed to fetch admin data.");
      } finally {
        setLoading(false);
      }
    };

    fetchAdminData();
  }, [id]);

  // Tangani submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedAdmin = {
      username,
      email,
      role,
      ...(password && { password }), // Sertakan password hanya jika diisi
    };

    setLoading(true);
    try {
      await editAdmin(id, updatedAdmin); // Panggil API untuk mengedit admin
      
      // Menampilkan SweetAlert setelah sukses
      Swal.fire({
        title: "Update Berhasil!",
        text: "Admin telah berhasil diperbarui.",
        icon: "success",
        confirmButtonText: "OK",
        customClass: {
          icon: "text-green-500",
        },
      }).then(() => {
        navigate("/admin"); // Kembali ke dashboard admin setelah sukses
      });
    } catch (error) {
      setError("Failed to update admin.");

      // Menampilkan SweetAlert ketika gagal update
      Swal.fire({
        title: "Gagal!",
        text: "Terjadi kesalahan saat memperbarui admin.",
        icon: "error",
        confirmButtonText: "OK",
        customClass: {
          icon: "text-red-500",
        },
      });
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
              <h1 className="text-3xl font-bold mb-6 text-gray-800">
                Edit Admin
              </h1>

              {/* Error handling */}
              {error && <p className="text-red-500 mb-4">{error}</p>}

              {/* Form untuk edit admin */}
              {loading ? (
                <div className="text-center">Loading...</div>
              ) : (
                admin && (
                  <div className="bg-white p-8 rounded shadow-lg max-w-lg mx-auto">
                    <form onSubmit={handleSubmit}>
                      {/* Input untuk Username */}
                      <div className="mb-4">
                        <label
                          htmlFor="username"
                          className="block text-sm font-medium text-gray-600 mb-2"
                        >
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

                      {/* Input untuk Email */}
                      <div className="mb-4">
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium text-gray-600 mb-2"
                        >
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

                      <div className="mb-4">
                        <label className="block text-gray-600 mb-1">
                          Role:
                        </label>
                        <select
                          name="role"
                          value={role}
                          onChange={(e) => setRole(e.target.value)}
                          className="w-full px-4 py-2 border rounded"
                          required
                        >
                          <option value="" disabled>
                            Select a role
                          </option>
                          <option value="admin">Admin</option>
                          <option value="operator">Operator</option>
                        </select>
                      </div>

                      {/* Input untuk Password */}
                      <div className="mb-4">
                        <label
                          htmlFor="password"
                          className="block text-sm font-medium text-gray-600 mb-2"
                        >
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

                      {/* Tombol Submit */}
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
};

export default EditAdmin;
