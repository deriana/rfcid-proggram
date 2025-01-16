import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAdmins, deleteAdmin } from "./api";
import Sidebar from "./partial/Sidebar";
import Preloader from "./partial/Preloader";
import Header from "./partial/Header";
import Swal from "sweetalert2";

const Admin = () => {
  const [admins, setAdmins] = useState([]);
  const [error, setError] = useState("");
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

  const handleDelete = async (admin) => {
    // Menampilkan SweetAlert untuk konfirmasi penghapusan
    const result = await Swal.fire({
      title: `Apakah Anda yakin ingin menghapus admin ${admin.username}?`,
      icon: 'warning',  // Ikon peringatan
      showCancelButton: true,
      confirmButtonText: 'Hapus',
      cancelButtonText: 'Batal',
      customClass: {
        icon: 'text-yellow-500',  // Menyesuaikan warna ikon
      }
    });

    if (result.isConfirmed) {
      setLoading(true);
      try {
        await deleteAdmin(admin.id);
        // Menghapus admin yang sudah dihapus dari daftar
        setAdmins(admins.filter((item) => item.id !== admin.id));
        Swal.fire({
          title: 'Terhapus!',
          text: 'Admin telah dihapus.',
          icon: 'success',  // Ikon sukses
          confirmButtonText: 'OK',
          customClass: {
            icon: 'text-green-500',  // Menyesuaikan warna ikon sukses
          }
        });
      } catch (error) {
        setError("Gagal menghapus admin.");
        Swal.fire({
          title: 'Gagal!',
          text: 'Terjadi kesalahan saat menghapus admin.',
          icon: 'error',  // Ikon error
          confirmButtonText: 'OK',
          customClass: {
            icon: 'text-red-500',  // Menyesuaikan warna ikon error
          }
        });
      } finally {
        setLoading(false);
      }
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
                              onClick={() => handleDelete(admin)} // Ganti di sini, panggil fungsi handleDelete
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
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Admin;
