import React from "react";
import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";  // Import yang benar

const ProtectedRoute = ({ children }) => {
  // Ambil token dari localStorage
  const token = localStorage.getItem("authToken");

  // Jika token tidak ada, arahkan ke halaman login
  if (!token) {
    return <Navigate to="/login" />;
  }

  try {
    // Dekode token untuk memeriksa tanggal kadaluarsa
    const decodedToken = jwtDecode(token);

    // Cek apakah token kadaluarsa
    const isTokenExpired = decodedToken.exp * 1000 < Date.now();

    if (isTokenExpired) {
      localStorage.removeItem("authToken"); // Hapus token yang sudah kadaluarsa
      return <Navigate to="/login" />; // Arahkan ke halaman login
    }

    // Jika token valid, render children (halaman yang dilindungi)
    return children;
  } catch (error) {
    console.error("Token tidak valid:", error);
    localStorage.removeItem("authToken"); // Hapus token yang invalid
    return <Navigate to="/login" />; // Arahkan ke halaman login
  }
};

export default ProtectedRoute;
