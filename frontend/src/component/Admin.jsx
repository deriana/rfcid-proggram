import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAdmins, deleteAdmin } from "./api";
import Sidebar from "./partial/Sidebar";
import Preloader from "./partial/Preloader";
import Header from "./partial/Header";

const Admin = () => {
  const [admins, setAdmins] = useState([]);
  const [error, setError] = useState("");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteAdminData, setDeleteAdminData] = useState(null);
  const [loading, setLoading] = useState(false);

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
  }, []);

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
<div>
  <Preloader />
  <div className="flex h-screen overflow-hidden">
    <Sidebar />
    <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden bg-gray-200">
      <Header />
      <main>
        <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
          <h1 className="text-3xl font-bold mb-4 text-gray-800">Dashboard Admin</h1>

          {error && <p className="text-red-500 mb-4">{error}</p>}

          <button
            onClick={() => navigate('/admin/register')}
            className="px-4 py-2 text-white font-medium rounded bg-blue-500 hover:bg-blue-600 mb-4"
          >
            Tambah Admin Baru
          </button>

          {/* Admins Table */}
          <div className="bg-white p-6 rounded shadow-md overflow-x-auto">
            <h2 className="text-2xl font-semibold mb-4 text-gray-700">All Admins</h2>
            <table className="min-w-full max-w-full">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-6 py-3 border text-left">Username</th>
                  <th className="px-6 py-3 border text-left">Email</th>
                  <th className="px-6 py-3 border text-left">Role</th>
                  <th className="px-6 py-3 border text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {admins.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="px-6 py-3 text-center text-gray-600">
                      No admins available
                    </td>
                  </tr>
                ) : (
                  admins.map((admin) => (
                    <tr key={admin.id} className="border-b">
                      <td className="px-6 py-3">{admin.username}</td>
                      <td className="px-6 py-3">{admin.email}</td>
                      <td className="px-6 py-3">{admin.role}</td>
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
                          className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md"
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

          {/* Delete Confirmation Modal */}
          {isDeleteModalOpen && (
            <div
              className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50"
              onClick={() => setIsDeleteModalOpen(false)}
            >
              <div
                className="bg-white p-6 rounded shadow-md max-w-lg w-full"
                onClick={(e) => e.stopPropagation()}
              >
                <h2 className="text-xl font-semibold mb-4 text-gray-700">Konfirmasi Penghapusan</h2>
                <p className="mb-4 text-gray-600">
                  Apakah Anda yakin ingin menghapus admin
                  <span className="font-bold"> {deleteAdminData?.username}</span>?
                </p>
                <div className="flex justify-end space-x-4">
                  <button
                    onClick={() => setIsDeleteModalOpen(false)}
                    className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-700 rounded-md"
                  >
                    Batal
                  </button>
                  <button
                    onClick={handleDelete}
                    className={`px-4 py-2 text-white rounded ${
                      loading ? 'bg-gray-500' : 'bg-red-500 hover:bg-red-600'
                    }`}
                    disabled={loading}
                  >
                    {loading ? 'Menghapus...' : 'Hapus'}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  </div>
</div>

  );
};

export default Admin;
