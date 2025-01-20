import { useEffect, useState } from "react";
import Preloader from "./partial/Preloader";
import Sidebar from "./partial/Sidebar";
import Header from "./partial/Header";
import { getUsers, deleteUser, getUsername, editPassword } from "./api";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2"; // Import SweetAlert
import ImportExcel from "./ImportExcel";
import TitleBox from "./Title";

function Users() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

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
  }, []);

  const fetchUserAuth = async (id) => {
    try {
      const data = await getUsername(id);
      const selectedUser = data.user[0];

      Swal.fire({
        title: "Informasi Akun Guru",
        html: `
          <strong>Username:</strong> ${selectedUser.username} <br>
        `,
        icon: "info",
        confirmButtonText: "OK",
        customClass: {
          icon: "text-blue-500",
        },
      });
    } catch (err) {
      setError(err.message || "Gagal mengambil data autentikasi.");
    }
  };

  // Handle delete confirmation with SweetAlert
  const handleDelete = async (id) => {
    // Menampilkan SweetAlert konfirmasi penghapusan
    Swal.fire({
      title: "Konfirmasi Penghapusan",
      text: "Anda yakin ingin menghapus user ini? Proses ini tidak dapat dibatalkan.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Hapus",
      cancelButtonText: "Batal",
      customClass: {
        icon: "text-yellow-500",
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteUser(id); // Panggil fungsi delete

          // Menampilkan SweetAlert jika berhasil
          Swal.fire({
            title: "Berhasil dihapus!",
            text: "User telah berhasil dihapus.",
            icon: "success",
            confirmButtonText: "OK",
            customClass: {
              icon: "text-green-500",
            },
          });

          setUsers(users.filter((user) => user.id !== id)); // Update state users setelah dihapus
        } catch (error) {
          setError("Gagal menghapus user");

          // Menampilkan SweetAlert jika gagal
          Swal.fire({
            title: "Gagal!",
            text: "Terjadi kesalahan saat menghapus user.",
            icon: "error",
            confirmButtonText: "OK",
            customClass: {
              icon: "text-red-500",
            },
          });

          console.error("Error detail:", error);
        }
      }
    });
  };

  const handlePasswordEdit = (id) => {
    // Show input prompt for password
    Swal.fire({
      title: "Ganti Password",
      html: `
        <input type="password" id="newPassword" class="swal2-input" placeholder="Enter new password" />
      `,
      confirmButtonText: "Update Password",
      preConfirm: () => {
        const newPassword = document.getElementById("newPassword").value;
        if (!newPassword) {
          Swal.showValidationMessage("Password cannot be empty");
          return false;
        }
        return newPassword;
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          // Call the API to update the password
          const updatedPassword = result.value; // The new password entered by the user
          await editPassword(id, { password: updatedPassword });
          Swal.fire({
            title: "Password Berhasil Diganti!",
            icon: "success",
            confirmButtonText: "OK",
          });
        } catch (error) {
          Swal.fire({
            title: "Error!",
            text: error.message || "Gagal mengganti password",
            icon: "error",
            confirmButtonText: "OK",
          });
        }
      }
    });
  };

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100">
      <Preloader />

      <div className="flex h-screen overflow-hidden">
        {/* Sidebar */}
        <Sidebar />
        <div className="relative flex flex-1 flex-col overflow-y-auto bg-gray-200">
          <Header />

          <main className="px-4 md:px-6 lg:px-8 py-6 w-full">
            {/* TitleBox Component */}

            <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
              <TitleBox title="Guru" />

              {/* Button to Register */}

              <ImportExcel />

              {/* Users Table */}
              <div className="bg-white p-6 rounded-xl shadow-md overflow-x-auto">
                <div className="flex-row justify-between w-full">
                  <input
                    type="text"
                    placeholder="Cari nama guru"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    className="px-4 py-2 mb-4 w-full max-w-xs border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    onClick={() => navigate("/register")}
                    className="px-6 py-3 mb-6 ml-10 text-white font-medium rounded-lg bg-blue-500 hover:bg-blue-600 shadow-md transition duration-300"
                  >
                    Tambahkan Guru
                  </button>
                </div>

                <table className="min-w-full table-auto">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="px-6 py-3 border text-left text-sm font-semibold text-gray-600">
                        Nama
                      </th>
                      <th className="px-6 py-3 border text-left text-sm font-semibold text-gray-600">
                        Nip
                      </th>
                      <th className="px-6 py-3 border text-left text-sm font-semibold text-gray-600">
                        Kelamin
                      </th>
                      <th className="px-6 py-3 border text-left text-sm font-semibold text-gray-600">
                        Mata Pelajaran
                      </th>
                      <th className="px-6 py-3 border text-left text-sm font-semibold text-gray-600">
                        Gambar
                      </th>
                      <th className="px-6 py-3 border text-left text-sm font-semibold text-gray-600">
                        Aksi
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUsers.map((user) => (
                      <tr key={user.id} className="border-b hover:bg-gray-50">
                        <td className="px-6 py-3">{user.name}</td>
                        <td className="px-6 py-3">{user.nip}</td>
                        <td className="px-6 py-3">{user.kelamin}</td>
                        <td className="px-6 py-3">{user.mapel}</td>

                        {/* Gambar Kolom */}
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
                            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 mr-2"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(user.id)} // langsung panggil handleDelete
                            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 mr-2"
                          >
                            Delete
                          </button>
                          <button
                            onClick={() => fetchUserAuth(user.id)} // Menampilkan modal untuk user yang dipilih
                            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                          >
                            Lihat Data
                          </button>

                          <button
                            onClick={() => handlePasswordEdit(user.id)}
                            className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 ml-2"
                          >
                            Edit Password
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default Users;
