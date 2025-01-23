import React, { useState, useEffect, useRef } from "react";
import { loginUser } from "./api";
import CameraAccess from "./CameraAccess";
import { formatDateTime } from "./utilis/formatDateTime";
import Card from "../../public/cardScan.json";
import Lottie from "lottie-react";

const LoginRfcid = () => {
  const [rfidOutput, setRfidOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [infoMessage, setInfoMessage] = useState(""); 
  const [absenResponse, setAbsenResponse] = useState(null);
  const cameraRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
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

  useEffect(() => {
    if (rfidOutput) {
      const timer = setTimeout(async () => {
        setLoading(true);
        setInfoMessage("");

        try {
          const response = await loginUser(rfidOutput);
          setAbsenResponse(response);

          if (response.message) {
            setInfoMessage(response.message);
          }

          if (cameraRef.current) {
            cameraRef.current.capturePhoto(); // Capture foto otomatis
          }
        } catch (error) {
          setInfoMessage(error.message || "Terjadi kesalahan, coba lagi.");
        } finally {
          setLoading(false);

          // Refresh halaman setelah 2 detik
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        }
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [rfidOutput]);

  return (
    <div className="w-full h-screen bg-white dark:bg-gray-800 rounded-none shadow-none p-10 flex flex-col items-center space-y-10">
      <div className="flex items-center">
        <img src="/icon.png" alt="Icon" className="w-20 h-20" />
        <h1 className="text-2xl font-extrabold text-orange-500 dark:text-white">
          Present Zie
        </h1>
      </div>

      <div className="w-full flex space-x-16">
        <div className="w-1/2 flex items-center justify-center relative">
          {/* Camera tetap utuh saat ada loading atau absenResponse */}
          <CameraAccess ref={cameraRef} />

          {loading && (
            <div className="absolute top-0 right-0">
              <Lottie animationData={Card} loop={true} autoplay={true} />
            </div>
          )}
        </div>

        <div className="w-1/2 flex flex-col items-center space-y-10">
          {/* Standby state with animation */}
          {!loading && !absenResponse && (
            <div className="w-full flex justify-center">
              <div className="absolute flex flex-col items-center justify-center">
                <Lottie animationData={Card} loop={true} autoplay={true} style={{ width: "400px", height: "400px" }} />
                <div className="text-center text-orang-500 text-xl mt-4">Scan Kartu</div>
              </div>
            </div>
          )}

          {infoMessage && (
            <div className="text-center text-green-600 font-semibold bg-green-100 p-5 rounded">
              {infoMessage}
            </div>
          )}

          {absenResponse && !loading && (
            <div className="text-center space-y-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6">
              <div className="flex justify-center">
                <img
                  src={`/images/${absenResponse.image}`}
                  alt={`${absenResponse.name}'s profile`}
                  className="w-32 h-32 rounded-full shadow-md"
                />
              </div>
              <p className="text-xl text-gray-700 dark:text-gray-200">
                Nama: <span className="font-medium">{absenResponse.name}</span>
              </p>
              <p className="text-xl text-gray-500 dark:text-gray-400">
                Nip: <span className="font-medium">{absenResponse.nip}</span>
              </p>
              <p className="text-xl text-gray-500 dark:text-gray-400">
                Waktu: <span className="font-semibold">{formatDateTime(absenResponse.timestamp)}</span>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginRfcid;
