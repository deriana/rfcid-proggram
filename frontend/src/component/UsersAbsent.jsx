import React, { useState, useEffect } from "react";
import Preloader from "./partial/Preloader";
import Header from "./partial/Header";
import Sidebar from "./partial/Sidebar";
import {
  checkUserAbsent,
  getUsersHurt,
  getUsersPermission,
  getUsersAlfa,
} from "./api";
import Swal from "sweetalert2"; // Import SweetAlert2

const UsersAbsent = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, [selectedDate]);

  const fetchUsers = async () => {
    try {
      const dateToCheck =
        selectedDate || new Date().toISOString().split("T")[0];
      const response = await checkUserAbsent(dateToCheck);

      if (response.status === "success") {
        setUsers(response.data || []);
      } else {
        setError("Gagal memuat data pengguna.");
      }
    } catch (err) {
      setError(err?.message || "Terjadi kesalahan saat memuat data pengguna.");
    }
  };

  const handleAbsenceSingle = async (userID) => {
    const result = await Swal.fire({
      title: "Pilih Jenis Absensi",
      text: "Pilih jenis absensi yang ingin diterapkan",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Terapkan",
      cancelButtonText: "Batal",
      input: "radio",
      inputOptions: {
        sakit: "Sakit",
        ijin: "Ijin",
        alfa: "Alfa",
      },
      inputValidator: (value) => {
        if (!value) {
          return "Anda harus memilih jenis absensi";
        }
      },
    });

    if (!result.isConfirmed) return;

    const absenceType = result.value;
    const confirmationMessage =
      absenceType === "sakit"
        ? "Apakah Anda yakin ingin menginput absen sebagai sakit?"
        : absenceType === "ijin"
        ? "Apakah Anda yakin ingin menginput absen sebagai izin?"
        : "Apakah Anda yakin ingin menginput absen sebagai alfa?";

    const confirmAbsence = await Swal.fire({
      title: "Konfirmasi",
      text: confirmationMessage,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ya",
      cancelButtonText: "Batal",
    });

    if (!confirmAbsence.isConfirmed) return;

    try {
      const today = new Date().toISOString().split("T")[0];
      const effectiveDate = selectedDate || today;

      let response;
      if (absenceType === "sakit") {
        response = await getUsersHurt({ userID, date: effectiveDate });
      } else if (absenceType === "ijin") {
        response = await getUsersPermission({ userID, date: effectiveDate });
      } else if (absenceType === "alfa") {
        response = await getUsersAlfa({ userID, date: effectiveDate });
      }

      Swal.fire({
        title: "Berhasil!",
        text: response?.message || "Absensi berhasil dicatat.",
        icon: "success",
      });
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userID));
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: "Gagal!",
        text: "Terjadi kesalahan saat mencatat absensi.",
        icon: "error",
      });
    }
  };

  const handleAbsenceBatch = async () => {
    if (selectedUsers.length === 0) {
      Swal.fire({
        title: "Peringatan!",
        text: "Pilih pengguna untuk batch absensi.",
        icon: "warning",
      });
      return;
    }

    const result = await Swal.fire({
      title: "Pilih Jenis Absensi untuk Batch",
      text: "Pilih jenis absensi yang akan diterapkan ke pengguna terpilih",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Terapkan",
      cancelButtonText: "Batal",
      input: "radio",
      inputOptions: {
        sakit: "Sakit",
        ijin: "Ijin",
        alfa: "Alfa",
      },
      inputValidator: (value) => {
        if (!value) {
          return "Anda harus memilih jenis absensi";
        }
      },
    });

    if (!result.isConfirmed) return;

    const absenceType = result.value;

    const confirmAbsence = await Swal.fire({
      title: "Konfirmasi",
      text:
        absenceType === "sakit"
          ? "Apakah Anda yakin ingin menginput absensi sakit untuk pengguna yang dipilih?"
          : absenceType === "ijin"
          ? "Apakah Anda yakin ingin menginput absensi izin untuk pengguna yang dipilih?"
          : "Apakah Anda yakin ingin menginput absensi alfa untuk pengguna yang dipilih?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ya",
      cancelButtonText: "Batal",
    });

    if (!confirmAbsence.isConfirmed) return;

    try {
      const date = selectedDate || new Date().toISOString().split("T")[0];
      const promises = selectedUsers.map((userID) => {
        if (absenceType === "sakit") return getUsersHurt({ userID, date });
        if (absenceType === "ijin") return getUsersPermission({ userID, date });
        if (absenceType === "alfa") return getUsersAlfa({ userID, date });
      });

      await Promise.all(promises);
      Swal.fire({
        title: "Berhasil!",
        text: "Absensi berhasil dicatat untuk semua pengguna.",
        icon: "success",
      });
      setUsers((prevUsers) =>
        prevUsers.filter((user) => !selectedUsers.includes(user.id))
      );
      setSelectedUsers([]);
    } catch (error) {
      console.error("Batch absence error:", error);
      Swal.fire({
        title: "Gagal!",
        text: "Gagal mencatat absensi batch.",
        icon: "error",
      });
    }
  };

  const handleSelectAll = () => {
    if (filteredUsers.length === selectedUsers.length) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(filteredUsers.map((user) => user.id));
    }
  };

  const handleCheckboxChange = (userID) => {
    setSelectedUsers((prevSelectedUsers) =>
      prevSelectedUsers.includes(userID)
        ? prevSelectedUsers.filter((id) => id !== userID)
        : [...prevSelectedUsers, userID]
    );
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
                Guru Belum Absen
              </h1>
              {error && <div className="text-red-500 mb-4">{error}</div>}

              <div className="mb-4 flex gap-4">
                <input
                  type="date"
                  className="p-2 border rounded"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  max={new Date().toISOString().split("T")[0]} // This will set the max date as today
                  placeholder="Pilih Tanggal"
                />
                <input
                  type="text"
                  className="p-2 border rounded flex-grow"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Cari nama guru..."
                />
              </div>

              <div className="bg-white p-6 rounded shadow-md overflow-x-auto">
                {filteredUsers.length > 0 ? (
                  <table className="min-w-full max-w-full">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="px-6 py-3 border text-left">
                          <input
                            type="checkbox"
                            checked={filteredUsers.length === selectedUsers.length}
                            onChange={handleSelectAll}
                          />
                        </th>
                        <th className="px-6 py-3 border text-left">Nama</th>
                        <th className="px-6 py-3 border text-left">NIP</th>
                        <th className="px-6 py-3 border text-left">Kelamin</th>
                        <th className="px-6 py-3 border text-left">Mata Pelajaran</th>
                        <th className="px-6 py-3 border text-left">Gambar</th>
                        <th className="px-6 py-3 border text-left">Aksi</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredUsers.map((user) => (
                        <tr key={user.id} className="border-b">
                          <td className="px-6 py-3">
                            <input
                              type="checkbox"
                              checked={selectedUsers.includes(user.id)}
                              onChange={() => handleCheckboxChange(user.id)}
                            />
                          </td>
                          <td className="px-6 py-3">{user.name}</td>
                          <td className="px-6 py-3">{user.nip}</td>
                          <td className="px-6 py-3">{user.kelamin}</td>
                          <td className="px-6 py-3">{user.mapel}</td>
                          <td className="px-6 py-3">
                            <img
                              src={user.image ? `/images/${user.image}` : "/images/default.jpeg"}
                              alt={user.name}
                              className="w-16 h-16 rounded-full object-cover"
                            />
                          </td>
                          <td className="px-6 py-3">
                            <button
                              onClick={() => handleAbsenceSingle(user.id)}
                              className="px-4 py-2 bg-green-500 text-white rounded-md mr-2"
                            >
                              Sakit
                            </button>
                            <button
                              onClick={() => handleAbsenceSingle(user.id)}
                              className="px-4 py-2 bg-blue-500 text-white rounded-md mr-2"
                            >
                              Ijin
                            </button>
                            <button
                              onClick={() => handleAbsenceSingle(user.id)}
                              className="px-4 py-2 bg-red-500 text-white rounded-md"
                            >
                              Alfa
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <p className="text-center mt-4 text-gray-500">
                    Tidak ada data untuk tanggal yang dipilih.
                  </p>
                )}
              </div>

              <button
                onClick={handleAbsenceBatch}
                className="px-6 py-2 bg-purple-500 text-white rounded mt-4"
              >
                Terapkan Absensi ke Semua
              </button>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default UsersAbsent;
