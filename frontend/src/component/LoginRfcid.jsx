import { useState, useEffect } from "react";
import { loginUser } from "./api";

const LoginRfcid = () => {
  const [rfidOutput, setRfidOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [loginResponse, setLoginResponse] = useState(null);
  const [scanType, setScanType] = useState("");

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

          setTimeout(() => {
            window.location.reload();
          }, 2000);
        } catch (error) {
          setLoginError("Login failed! Please try again.");
        } finally {
          setLoading(false);
        }
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [rfidOutput]);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex flex-col items-center justify-center">
      <div className="w-full max-w-lg bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 space-y-6">
        <h1 className="text-3xl font-extrabold text-gray-800 dark:text-white text-center">
          RFID Scanner React
        </h1>

        {loading && (
          <div className="text-center text-blue-600 font-semibold">Logging in...</div>
        )}

        {loginError && (
          <div className="text-center text-red-600 font-semibold">{loginError}</div>
        )}

        {loginResponse && (
          <div className="text-center space-y-4">
            <h2 className="text-2xl text-green-600 font-semibold">Login Successful</h2>
            <p className="text-lg text-gray-700 dark:text-gray-200">Welcome, {loginResponse.name}</p>
            <p className="text-lg text-gray-500 dark:text-gray-400">Your RFID: {loginResponse.rfid}</p>
            <p className="text-lg text-gray-500 dark:text-gray-400">Scan status: {scanType === 'masuk' ? 'Masuk' : 'Keluar'}</p>
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
  );
};

export default LoginRfcid;
