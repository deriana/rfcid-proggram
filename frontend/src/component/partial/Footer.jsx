import React from "react";
import { FaLinkedinIn, FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-white text-black py-8">
      <div className="container mx-auto text-center">
        <h2 className="text-2xl font-bold mb-4">Present Zie</h2>
        <div className="flex justify-center items-center space-x-4 mb-4">
          <img src="/logo.png" alt="Smakzie Logo" className="h-10" />
          <img src="/logo-tefa.png" alt="Zielabs Logo" className="h-10" />
        </div>
        <p className="mb-4">
          Aplikasi Present Zie adalah alat yang memudahkan pencatatan kehadiran
          guru. Dengan aplikasi ini, guru bisa melakukan absensi melalui
          perangkat IdCard merka sendiri, mengurangi penggunaan kertas dan
          meningkatkan akurasi data kehadiran.
        </p>
  
        <p className="text-sm">
          Senior Programmer: Yaqub Hadi Permana S.pd <br />
          Junior Programmer: Deryana Maruf
        </p>
        <p className="text-sm">&copy; 2025 Made&Design By - Deryana</p>
        <div className="flex justify-center space-x-4 mt-2">
          <a href="https://github.com/deriana">
            <FaGithub className="text-black text-2xl hover:text-gray-700 transition duration-300 ease-in-out" />
          </a>
          <a href="https://www.linkedin.com/in/deryana-ma-ruf-00b926292/">
            <FaLinkedinIn className="text-black text-2xl hover:text-blue-500 transition duration-300 ease-in-out" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
