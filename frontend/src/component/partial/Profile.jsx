import React, { useEffect, useState } from "react";

const Profile = () => {
  const [admin, setAdmin] = useState(null);

  useEffect(() => {
    const adminData = localStorage.getItem("adminData"); // Mengambil data admin dari localStorage
    if (adminData) {
      const parsedAdmin = JSON.parse(adminData); // Parse data ke objek JavaScript
      setAdmin(parsedAdmin); // Simpan data admin ke state
    }
  }, []);

  return (
    <div className="bg-gray-200 flex items-center justify-start p-1 rounded shadow-md w-full max-w-sm mx-auto">
      {/* Gambar profil dinamis berdasarkan role */}
      <img
        src={
          admin?.role === "admin"
            ? "/images/admin.jpg" // Gambar untuk admin
            : admin?.role === "operator"
            ? "/images/operator.jpg" // Gambar untuk operator
            : "/images/default.jpeg" // Gambar default
        }
        alt="Profile"
        className="w-15 h-15 rounded-full mr-6"
      />

      <div className="flex flex-col">
        {/* Nama dan Role Admin */}
        <h1 className="text-md font-semibold text-gray-800">
          {admin?.username || "Guest"} {/* Tampilkan username atau 'Guest' */}
        </h1>
        <p className="text-0.5 text-gray-600 mt-2">
          {admin?.role ? `Role: ${admin.role}` : "Role tidak ditemukan"}
        </p>
      </div>
    </div>
  );
};

export default Profile;
