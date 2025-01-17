import { useState, useEffect, useRef } from "react";
import { loginUser } from "./api";
import Preloader from "./partial/Preloader";
import Sidebar from "./partial/Sidebar";
import CameraAccess from "./CameraAccess";
import { formatDateTime } from "./utilis/formatDateTime";
import Header from "./partial/Header";

const LoginRfcid = () => {
  const [rfidOutput, setRfidOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [loginResponse, setLoginResponse] = useState(null);
  const [scanType, setScanType] = useState("");
  const [capturedImage, setCapturedImage] = useState(null); // Store captured image
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
        setLoginError("");

        try {
          const response = await loginUser(rfidOutput);
          setLoginResponse(response);
          setScanType(response.scanType);
          setRfidOutput("");

          // Auto capture image after successful login
          if (cameraRef.current) {
            cameraRef.current.capturePhoto();
            const captured = cameraRef.current.capturedImage;
            setCapturedImage(captured);
          }

          // Cek jika respons berisi error terkait validasi backend
          if (response.error) {
            setLoginError(response.error); // Tampilkan pesan error ke pengguna
          } else {
            setTimeout(() => {
              window.location.reload();
            }, 2000);
          }
        } catch (error) {
          setLoginError("Login failed! Please try again.");
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        } finally {
          setLoading(false);
        }
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [rfidOutput]);

  return (
    <div>
      <Preloader />
      <div className="flex h-screen overflow-hidden">
        <Sidebar />
        <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden bg-gray-200">
          <Header />
          <main>
            <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex flex-col items-center justify-center">
              <div className="w-full max-w-lg bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 space-y-6">
                <CameraAccess ref={cameraRef} />
                <h1 className="text-3xl font-extrabold text-gray-800 dark:text-white text-center">
                  Zie Absensi
                </h1>

                {loading && (
                  <div className="text-center text-blue-600 font-semibold">
                    Logging in...
                  </div>
                )}

                {loginError && (
                  <div className="text-center text-red-600 font-semibold">
                    {loginError}
                  </div>
                )}

                {loginResponse && !loginError && (
                  <div className="text-center space-y-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6">
                    <h2 className="text-2xl text-green-600 font-bold">
                      {scanType === "keluar"
                        ? "Logout Successful"
                        : "Login Successful"}
                    </h2>
                    <p className="text-lg text-gray-700 dark:text-gray-200">
                      Welcome,{" "}
                      <span className="font-medium">{loginResponse.name}</span>
                    </p>
                    <p className="text-lg text-gray-500 dark:text-gray-400">
                      Your Nip:{" "}
                      <span className="font-semibold">{loginResponse.nip}</span>
                    </p>
                    <div className="flex justify-center">
                      <img
                        src={`/images/${loginResponse.image}`}
                        alt={`${loginResponse.name}'s profile`}
                        className="w-24 h-24 rounded-full shadow-md"
                      />
                    </div>
                    <p className="text-lg text-gray-500 dark:text-gray-400">
                      Your Time:{" "}
                      <span className="font-semibold">
                        {formatDateTime(loginResponse.timestamp)}
                      </span>
                    </p>
                    <p className="text-lg text-gray-500 dark:text-gray-400">
                      Scan status:{" "}
                      <span className="font-medium">
                        {scanType === "masuk"
                          ? "Masuk"
                          : scanType === "terlambat"
                          ? "Terlambat"
                          : "Keluar"}
                      </span>
                    </p>
                  </div>
                )}

                {capturedImage && (
                  <div className="text-center mt-6">
                    <h2 className="text-xl font-medium text-gray-700 dark:text-gray-300">
                      Captured Image:
                    </h2>
                    <img
                      src={capturedImage}
                      alt="Captured Photo"
                      className="mt-4 w-64 h-64 rounded-lg border-2 shadow-md"
                    />
                  </div>
                )}

                <div className="text-center mt-4">
                  <p className="text-xl font-medium text-gray-700 dark:text-gray-300">
                    Output RFID yang dipindai:
                  </p>
                  <div className="mt-2 p-3 text-xl font-semibold text-gray-900 dark:text-white bg-gray-200 dark:bg-gray-700 rounded-lg">
                    {rfidOutput || "Scan RFID to display output..."}
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
