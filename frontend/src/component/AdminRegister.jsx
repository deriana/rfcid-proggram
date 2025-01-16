// RegisterAdmin.js

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerAdmin } from "./api";

const RegisterAdmin = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    role: "",
    password: "",
  });
  const [formError, setFormError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError("");

    if (
      !formData.username ||
      !formData.email ||
      !formData.password ||
      !formData.role
    ) {
      setFormError("Semua kolom harus diisi.");
      return;
    }

    setLoading(true);
    try {
      await registerAdmin(formData);
      navigate("/admin");
    } catch (err) {
      setFormError(err.message || "Terjadi kesalahan dalam registrasi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">
          Registrasi Admin Baru
        </h2>

        {formError && <p className="text-red-500 mb-4">{formError}</p>}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-600 mb-1">Username:</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-600 mb-1">Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-600 mb-1">Role:</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded"
              required
            >
              <option value="" disabled>
                Select a role
              </option>
              <option value="admin">Admin</option>
              <option value="operator">Operator</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-600 mb-1">Password:</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded"
              required
            />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className={`px-4 py-2 text-white rounded ${
                loading ? "bg-gray-500" : "bg-blue-500 hover:bg-blue-600"
              }`}
              disabled={loading}
            >
              {loading ? "Proses..." : "Registrasi"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterAdmin;
