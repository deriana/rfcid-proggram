import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate(); // Untuk mengarahkan pengguna ke halaman login

  useEffect(() => {
    // Menghapus token dari localStorage
    localStorage.removeItem("authToken");
    localStorage.removeItem("adminData");

    // Setelah menghapus token, arahkan pengguna ke halaman login
    navigate("/login");
  }, [navigate]);

  return null; // Komponen ini tidak perlu render apa-apa
};

export default Logout;
