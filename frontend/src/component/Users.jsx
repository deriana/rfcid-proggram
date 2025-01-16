import { useEffect, useState } from "react";
import Preloader from "./partial/Preloader";
import Sidebar from "./partial/Sidebar";
import Header from "./partial/Header";
import { getUsers, deleteUser } from "./api";
import { useNavigate } from "react-router-dom";
import ImportExcel from "./ImportExcel"

function Users() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const [deleteId, setDeleteId] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getUsers();
        setUsers(data);
      } catch (err) {
        setError(err.message || "Gagal mengambil data pengguna.");
      }
    };

    fetchUsers();
  }, [navigate]);

  const handleDelete = async (id) => {
    try {
      await deleteUser(id); // Panggil fungsi delete
      setUsers(users.filter((user) => user.id !== id)); // Update state users
      setIsDeleteModalOpen(false); // Tutup modal
    } catch (error) {
      setError("Gagal menghapus user");
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <Preloader />
      <div className="flex h-screen overflow-hidden">
        <Sidebar />
        <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden bg-gray-200">
          <Header />
          <main>
            <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
              <h1 className="text-3xl font-bold mb-4 text-gray-800">
                Dashboard Users
              </h1>

              <button
                onClick={() => navigate("/register")}
                className="px-4 py-2 text-white font-medium rounded bg-blue-500 hover:bg-blue-600 mb-4"
              >
                Buka Form Registrasi
              </button>

              <ImportExcel />

              {/* Users Table */}
              <div className="bg-white p-6 rounded shadow-md overflow-x-auto">
                <input
                  type="text"
                  placeholder="Cari nama guru"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  className="px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500 mb-4"
                />

                <table className="min-w-full max-w-full">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="px-6 py-3 border text-left">Nama</th>
                      <th className="px-6 py-3 border text-left">Nip</th>
                      <th className="px-6 py-3 border text-left">Kelamin</th>
                      <th className="px-6 py-3 border text-left">
                        Mata Pelajaran
                      </th>
                      <th className="px-6 py-3 border text-left">Gambar</th>
                      <th className="px-6 py-3 border text-left">Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUsers.map((user) => (
                      <tr key={user.id} className="border-b">
                        <td className="px-6 py-3">{user.name}</td>
                        <td className="px-6 py-3">{user.nip}</td>
                        <td className="px-6 py-3">{user.kelamin}</td>
                        <td className="px-6 py-3">{user.mapel}</td>

                        {/* Kolom Gambar */}
                        <td className="px-6 py-3">
                          <img
                            src={
                              user.image
                                ? `/images/${user.image}`
                                : "/images/default.jpeg"
                            }
                            alt={user.name}
                            className="w-16 h-16 rounded-full object-cover" // Menyesuaikan ukuran gambar
                          />
                        </td>

                        <td className="px-6 py-3">
                          <button
                            onClick={() => navigate(`/users/edit/${user.id}`)}
                            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md mr-2"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => {
                              setDeleteId(user.id);
                              setIsDeleteModalOpen(true);
                            }}
                            className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
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
                    <h2 className="text-xl font-semibold mb-4 text-gray-700">
                      Konfirmasi Penghapusan
                    </h2>
                    <p className="mb-4 text-gray-600">
                      Anda yakin ingin menghapus user ini? Proses ini tidak
                      dapat dibatalkan.
                    </p>
                    <div className="flex justify-end space-x-4">
                      <button
                        onClick={() => setIsDeleteModalOpen(false)}
                        className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-700 rounded-md"
                      >
                        Batal
                      </button>
                      <button
                        onClick={() => handleDelete(deleteId)}
                        className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md"
                      >
                        Hapus
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
}

export default Users;
