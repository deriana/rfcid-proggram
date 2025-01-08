import { useEffect, useState } from "react";
import Preloader from "./partial/Preloader";
import Sidebar from "./partial/Sidebar";
import Header from "./partial/Header";
import {
  getUsers,
  registerUser,
  deleteUser,
  getUsersHurt,
  getUsersPermission,
} from "./api";
import { useNavigate } from "react-router-dom";

function Users() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    rfid: "",
    name: "",
    kelamin: "",
    mapel: "",
    image: "",
  });
  const [formError, setFormError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError("");

    if (
      !formData.rfid ||
      !formData.name ||
      !formData.kelamin ||
      !formData.mapel ||
      !formData.image
    ) {
      setFormError("Semua field harus diisi.");
      return;
    }

    setLoading(true);

    try {
      const response = await registerUser(formData);
      console.log(response);

      const updatedUsers = await getUsers();
      setUsers(updatedUsers);

      setFormData({
        rfid: "",
        name: "",
        kelamin: "",
        mapel: "",
        image: "",
      });
      setIsModalOpen(false);
    } catch (err) {
      setFormError(err.message || "Terjadi kesalahan dalam registrasi.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteUser(id); // Panggil fungsi delete
      setUsers(users.filter((user) => user.id !== id)); // Update state users
      setIsDeleteModalOpen(false); // Tutup modal
    } catch (error) {
      setError("Gagal menghapus user");
    }
  };

  const handleAbsence = async (type, userID) => {
    try {
      let response;
      if (type === "sakit") {
        response = await getUsersHurt({ userID });
      } else if (type === "ijin") {
        response = await getUsersPermission({ userID });
      } else {
        throw new Error("Tipe absensi tidak valid.");
      }
      alert(response.message); // Tampilkan pesan sukses dari API
    } catch (error) {
      alert(
        error?.message ||
          `Gagal mencatat kondisi ${type}. Periksa koneksi Anda.`
      ); // Tampilkan pesan error
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

              {/* Button to Open Modal */}
              <button
                onClick={() => setIsModalOpen(true)}
                className="px-4 py-2 text-white font-medium rounded bg-blue-500 hover:bg-blue-600 mb-4"
              >
                Buka Form Registrasi
              </button>

              {/* Modal Registrasi */}
              {isModalOpen && (
                <div
                  className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50"
                  onClick={() => setIsModalOpen(false)} // Close modal if clicked outside
                >
                  <div
                    className="bg-white p-6 rounded shadow-md max-w-lg w-full"
                    onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
                  >
                    <h2 className="text-xl font-semibold mb-4 text-gray-700">
                      Registrasi Pengguna Baru
                    </h2>
                    {formError && (
                      <p className="text-red-500 mb-4">{formError}</p>
                    )}
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
                          <option value="Wanita">Perempuan</option>
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
                          Gambar (URL):
                        </label>
                        <input
                          type="text"
                          name="image"
                          value={formData.image}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-2 border rounded shadow-sm focus:outline-none focus:ring focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <button
                          type="submit"
                          disabled={loading}
                          className={`px-4 py-2 text-white font-medium rounded ${
                            loading
                              ? "bg-blue-300"
                              : "bg-blue-500 hover:bg-blue-600"
                          }`}
                        >
                          {loading ? "Proses..." : "Daftar Pengguna"}
                        </button>
                      </div>
                    </form>
                    <button
                      onClick={() => setIsModalOpen(false)}
                      className="mt-4 text-gray-500"
                    >
                      Tutup
                    </button>
                  </div>
                </div>
              )}

              {/* Users Table */}
              <div className="bg-white p-6 rounded shadow-md overflow-x-auto">
                <input
                  type="text"
                  placeholder="Cari nama guru"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  className="px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500 mb-4"
                />

                <table className="min-w-full">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="px-4 py-2 border text-left">Nama</th>
                      <th className="px-4 py-2 border text-left">RFID</th>
                      <th className="px-4 py-2 border text-left">Kelamin</th>
                      <th className="px-4 py-2 border text-left">
                        Mata Pelajaran
                      </th>
                      <th className="px-4 py-2 border text-left">Gambar</th>
                      <th className="px-4 py-2 border text-left">Aksi</th>
                      <th className="px-4 py-2 border text-left">Absensi</th>
                    </tr>
                  </thead>
              <tbody>
  {filteredUsers.map((user) => (
    <tr key={user.id} className="border-b">
      <td className="px-4 py-2">{user.name}</td>
      <td className="px-4 py-2">{user.rfid}</td>
      <td className="px-4 py-2">{user.kelamin}</td>
      <td className="px-4 py-2">{user.mapel}</td>
      <td className="px-4 py-2">
        <img
          src={user.image}
          alt={user.name}
          className="w-16 h-16 object-cover rounded-full"
        />
      </td>
      <td>
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
      <td>
        <button
          onClick={() => handleAbsence("sakit", user.id)}
          className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-md mr-2"
        >
          Sakit
        </button>
        <button
          onClick={() => handleAbsence("ijin", user.id)}
          className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-md"
        >
          Ijin
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
