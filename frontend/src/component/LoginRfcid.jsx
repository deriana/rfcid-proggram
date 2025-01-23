import { useState, useEffect, useRef } from "react";
import { loginUser } from "./api"; // API untuk melakukan login dengan RFID
import Preloader from "./partial/Preloader";
import CameraAccess from "./CameraAccess"; // Komponen untuk akses kamera
import { formatDateTime } from "./utilis/formatDateTime"; // Utility untuk format waktu

const LoginRfcid = () => {
  const [rfidOutput, setRfidOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [infoMessage, setInfoMessage] = useState(""); // Pesan info atau error
  const [absenResponse, setAbsenResponse] = useState(null); // Respons dari server
  const cameraRef = useRef(null); // Referensi ke komponen kamera

  // Event listener untuk menangkap input RFID
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Hanya menerima angka
      if (!/^\d$/.test(e.key)) {
        e.preventDefault();
        return;
      }
      setRfidOutput((prev) => prev + e.key);
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  // Melakukan absen saat RFID selesai dipindai
  useEffect(() => {
    if (rfidOutput) {
      const timer = setTimeout(async () => {
        setLoading(true);
        setInfoMessage(""); // Reset pesan info

        try {
          const response = await loginUser(rfidOutput); // Panggil API
          setAbsenResponse(response);

          // Jika server memberikan pesan spesifik
          if (response.message) {
            setInfoMessage(response.message);
          }

          // Auto-capture foto jika absen berhasil
          if (cameraRef.current) {
            cameraRef.current.capturePhoto();
          }

        } catch (error) {
          setInfoMessage(error.message || "Terjadi kesalahan, coba lagi.");
        } finally {
          setLoading(false);
          // Pastikan halaman selalu di-refresh setelah pemindaian
          setTimeout(() => {
            window.location.reload(); // Refresh halaman
          }, 2000); // Tunggu 2 detik sebelum refresh
        }
      }, 500);

      return () => clearTimeout(timer); // Bersihkan timeout
    }
  }, [rfidOutput]);

  return (
    <div>
      <Preloader />
      <div className="flex h-screen overflow-hidden">
        <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden bg-gray-200">
          <main>
            <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex flex-col items-center justify-center">
              <div className="w-full max-w-lg bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 space-y-6">
                <CameraAccess ref={cameraRef} /> {/* Komponen Kamera */}
                <h1 className="text-3xl font-extrabold text-gray-800 dark:text-white text-center">
                  Zie Absensi
                </h1>

                {/* Loading State */}
                {loading && (
                  <div className="text-center text-blue-600 font-semibold">
                    Processing absen...
                  </div>
                )}

                {/* Pesan Info */}
                {infoMessage && (
                  <div className="text-center text-green-600 font-semibold bg-green-100 p-3 rounded">
                    {infoMessage}
                  </div>
                )}

                {/* Respons Absen */}
                {absenResponse && (
                  <div className="text-center space-y-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6">
                    <div className="flex justify-center">
                      <img
                        src={`/images/${absenResponse.image}`}
                        alt={`${absenResponse.name}'s profile`}
                        className="w-24 h-24 rounded-full shadow-md"
                      />
                    </div>
                    <p className="text-lg text-gray-700 dark:text-gray-200">
                      Nama:
                      <span className="font-medium">{absenResponse.name}</span>
                    </p>
                    <p className="text-lg text-gray-500 dark:text-gray-400">
                      Nip:
                      <span className="font-medium">{absenResponse.nip}</span>
                    </p>
                    <p className="text-lg text-gray-500 dark:text-gray-400">
                      Waktu:
                      <span className="font-semibold">
                        {formatDateTime(absenResponse.timestamp)}
                      </span>
                    </p>
                  </div>
                )}

                {/* Output RFID */}
                <div className="text-center mt-4">
                  <p className="text-xl font-medium text-gray-700 dark:text-gray-300">
                    Output RFID yang dipindai:
                  </p>
                  <div className="mt-2 p-3 text-xl font-semibold text-gray-900 dark:text-white bg-gray-200 dark:bg-gray-700 rounded-lg">
                    {rfidOutput || "Scan RFID untuk melihat output..."}
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default LoginRfcid;
