import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAdmins, deleteAdmin, registerAdmin } from "./api";
import Sidebar from "./partial/Sidebar";
import Preloader from './partial/Preloader'; // Import Preloader jika perlu

const Dashboard = () => {
  const [admins, setAdmins] = useState([]);
  const [error, setError] = useState("");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteAdminData, setDeleteAdminData] = useState(null); 
  const [loading, setLoading] = useState(false);
  
  // Modal Registrasi State
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [formError, setFormError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const response = await getAdmins();
        setAdmins(response.data);
      } catch (error) {
        setError("Gagal mengambil data admin");
      }
    };
    fetchAdmins();
  }, [navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError("");

    if (!formData.username || !formData.email || !formData.password) {
      setFormError("Semua kolom harus diisi.");
      return;
    }

    setLoading(true);
    try {
      const response = await registerAdmin(formData);
      console.log("Registrasi berhasil:", response);
      const updatedAdmins = await getAdmins();
      setAdmins(updatedAdmins);
      setFormData({ username: "", email: "", password: "" });
      setIsModalOpen(false);
    } catch (err) {
      setFormError(err.message || "Terjadi kesalahan dalam registrasi.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteAdminData) return;

    setLoading(true);
    try {
      await deleteAdmin(deleteAdminData.id);
      setAdmins(admins.filter((admin) => admin.id !== deleteAdminData.id));
      setIsDeleteModalOpen(false);
      setDeleteAdminData(null);
    } catch (error) {
      setError("Gagal menghapus admin.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen">
      <Preloader /> {/* Assuming Preloader shows when page is loading */}
      <Sidebar /> {/* Sidebar Navigation */}

      <div className="flex-grow p-8 bg-gray-100">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Dashboard Admin</h1>

        {/* Error Handling */}
        {error && <p className="text-red-500 mb-4">{error}</p>}

        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 text-white font-medium rounded bg-blue-500 hover:bg-blue-600 mb-4"
        >
          Buka Form Registrasi
        </button>

        {/* Table Admin */}
        <div className="bg-white p-6 rounded shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">All Admins</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                    Username
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {admins.length === 0 ? (
                  <tr>
                    <td
                      colSpan="3"
                      className="px-6 py-3 text-center text-gray-600"
                    >
                      No admins available
                    </td>
                  </tr>
                ) : (
                  admins.map((admin) => (
                    <tr key={admin.id} className="border-t hover:bg-gray-50">
                      <td className="px-6 py-3">{admin.username}</td>
                      <td className="px-6 py-3">{admin.email}</td>
                      <td className="px-6 py-3">
                        <button
                          onClick={() => navigate(`/admin/edit/${admin.id}`)}
                          className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md mr-2"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => {
                            setDeleteAdminData(admin);
                            setIsDeleteModalOpen(true);
                          }}
                          className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal Registrasi Admin */}
      {isModalOpen && (
        <div
          className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="bg-white p-6 rounded shadow-md w-full max-w-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-semibold mb-4 text-gray-700">
              Registrasi Admin Baru
            </h2>

            {formError && <p className="text-red-500 mb-4">{formError}</p>}

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-600 mb-1">Username:</label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-600 mb-1">Email:</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-600 mb-1">Password:</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded"
                  required
                />
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  className={`px-4 py-2 text-white rounded ${
                    loading ? "bg-gray-500" : "bg-blue-500 hover:bg-blue-600"
                  }`}
                  disabled={loading}
                >
                  {loading ? "Proses..." : "Registrasi"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Konfirmasi Delete Admin */}
      {isDeleteModalOpen && (
        <div
          className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50"
          onClick={() => setIsDeleteModalOpen(false)}
        >
          <div
            className="bg-white p-6 rounded shadow-md w-full max-w-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-semibold mb-4 text-gray-700">
              Konfirmasi Penghapusan
            </h2>
            <p className="mb-4 text-gray-600">
              Apakah Anda yakin ingin menghapus admin{" "}
              <span className="font-bold">{deleteAdminData?.username}</span>?
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded"
              >
                Batal
              </button>
              <button
                onClick={handleDelete}
                className={`px-4 py-2 text-white rounded ${
                  loading ? "bg-gray-500" : "bg-blue-500 hover:bg-blue-600"
                }`}
                disabled={loading}
              >
                {loading ? "Menghapus..." : "Hapus"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
