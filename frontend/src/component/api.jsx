import axios from "axios";

const API_BASE_URL = "http://localhost:3000/api"; // Ganti sesuai dengan URL backend Anda

// Fungsi untuk login user
export const loginUser = async (rfid) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/login`, { rfid });
    return response.data; // Data dari server
  } catch (error) {
    console.error("Error during login:", error.response?.data || error.message);
    throw error.response ? error.response.data : error;
  }
};

// Fungsi untuk mendapatkan semua users
export const getUsers = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/users`);
    return response.data; // Data dari server
  } catch (error) {
    console.error(
      "Error fetching users:",
      error.response?.data || error.message
    );
    throw error.response ? error.response.data : error;
  }
};

// Fungsi untuk mendapatkan user berdasarkan ID
export const getUsersById = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/user/${id}`);
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching user by id:",
      error.response.data || error.message
    );
    throw error.response ? error.response.data : error;
  }
};

// Fungsi untuk registrasi user
export const registerUser = async (data) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/register`, data);
    return response.data; // Data dari server
  } catch (error) {
    console.error(
      "Error during registration:",
      error.response?.data || error.message
    );
    throw error.response ? error.response.data : error;
  }
};

// Fungsi untuk edit user
export const editUser = async (id, updatedUser) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/user/${id}`, updatedUser);
    return response.data;
  } catch (error) {
    console.error("Error editing user:", error.response.data || error.message);
    throw error.response ? error.response.data : error;
  }
};

// Fungsi untuk menghapus user
export const deleteUser = async (id) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/user/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting user:", error.response.data || error.message);
    throw error.response ? error.response.data : error;
  }
};

// Fungsi untuk login admin
export const loginAdmin = async (usernameOrEmail, password) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/admin/login`, {
      usernameOrEmail,
      password,
    });
    return response.data; // Data dari server
  } catch (error) {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("authToken");
      alert("Your session has expired, please login again.");
      window.location.href = "/login";
    } else {
      console.error(
        "Error during admin login:",
        error.response?.data || error.message
      );
      throw error.response ? error.response.data : error;
    }
  }
};

// Fungsi untuk mendapatkan semua admin
export const getAdmins = async (token) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/admin`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data; // Data dari server
  } catch (error) {
    console.error(
      "Error fetching admins:",
      error.response?.data || error.message
    );
    throw error.response ? error.response.data : error;
  }
};

// Fungsi untuk registrasi admin
export const registerAdmin = async (data) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/admin/register`, data);
    return response.data; // Data dari server
  } catch (error) {
    console.error(
      "Error during admin registration:",
      error.response?.data || error.message
    );
    throw error.response ? error.response.data : error;
  }
};

// Fungsi untuk mendapatkan admin berdasarkan ID
export const getAdminById = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/admin/${id}`); // Ambil data admin tanpa token
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching admin by id:",
      error.response.data || error.message
    );
    throw error.response ? error.response.data : error;
  }
};

// Fungsi untuk mengedit admin
export const editAdmin = async (id, updatedAdmin) => {
  try {
    const response = await axios.put(
      `${API_BASE_URL}/admin/edit/${id}`,
      updatedAdmin
    ); // Edit admin tanpa token
    return response.data;
  } catch (error) {
    console.error("Error editing admin:", error.response.data || error.message);
    throw error.response ? error.response.data : error;
  }
};

// Fungsi untuk menghapus admin
export const deleteAdmin = async (id) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/admin/delete/${id}`); // Menghapus admin tanpa token
    return response.data;
  } catch (error) {
    console.error(
      "Error deleting admin:",
      error.response.data || error.message
    );
    throw error.response ? error.response.data : error;
  }
};

export const getUsersHurt = async (payload) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/users/sakit`, payload);
    return response.data;
  } catch (error) {
    console.error(
      "Error during get users hurt:",
      error.response?.data || error.message
    );
    throw error.response ? error.response.data : error;
  }
};
export const getUsersPermission = async (payload) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/users/ijin`, payload);
    return response.data;
  } catch (error) {
    console.error(
      "Error during get users permission:",
      error.response?.data || error.message
    );
    throw error.response ? error.response.data : error;
  }
};

// Fungsi untuk mengambil semua laporan
export const getAllReport = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/laporan`);
    if (!response.data.data || response.data.data.length === 0) {
      return null; // Mengembalikan null jika data kosong
    }
    return response.data.data;
  } catch (error) {
    console.error("Error fetching all reports:", error);
    return null; // Return null ketika terjadi error
  }
};

// Fungsi untuk mengambil laporan terlambat
export const getLateScans = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/laporan/terlambat`);
    if (!response.data.data || response.data.data.length === 0) {
      return null; // Mengembalikan null jika data kosong
    }
    return response.data.data;
  } catch (error) {
    console.error("Error fetching late scans:", error);
    return null; // Return null ketika terjadi error
  }
};

// Fungsi untuk mengambil laporan berdasarkan rentang tanggal
export const getReportByDateRange = async (startDate, endDate) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/laporan/date`, {
      params: { startDate, endDate },
    });
    if (!response.data.data || response.data.data.length === 0) {
      return null; // Mengembalikan null jika data kosong
    }
    return response.data.data;
  } catch (error) {
    console.error("Error fetching report by date range:", error);
    return null; // Return null ketika terjadi error
  }
};

// Fungsi untuk mengambil laporan berdasarkan guru
export const getReportByTeacher = async (teacherId) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/laporan/guru/${teacherId}`
    );
    if (!response.data.data || response.data.data.length === 0) {
      return null; // Mengembalikan null jika data kosong
    }
    return response.data.data;
  } catch (error) {
    console.error("Error fetching report by teacher:", error);
    return null; // Return null ketika terjadi error
  }
};

// Fungsi untuk mengambil laporan berdasarkan tipe
export const getReportByType = async (option) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/laporan/tipe/${option}`);
    if (!response.data.data || response.data.data.length === 0) {
      return null; // Mengembalikan null jika data kosong
    }
    return response.data.data;
  } catch (error) {
    console.error("Error fetching report by type:", error);
    return null; // Return null ketika terjadi error
  }
};

// Fungsi untuk mengambil laporan rentang tanggal dan kondisi waktu tertentu
export const getReportByDateRangeAndTimeCondition = async (
  startDate,
  endDate
) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/laporan/date`, {
      params: { startDate, endDate },
    });
    if (!response.data.data || response.data.data.length === 0) {
      return null; // Mengembalikan null jika data kosong
    }
    return response.data.data;
  } catch (error) {
    console.error(
      "Error fetching report by date range with time condition:",
      error
    );
    return null; // Return null ketika terjadi error
  }
};

// Fungsi untuk mengambil laporan terlambat untuk guru tertentu
export const getLateScansTeacher = async (teacherId) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/laporan/terlambat/guru/${teacherId}`
    );
    if (!response.data.data || response.data.data.length === 0) {
      return null; // Mengembalikan null jika data kosong
    }
    return response.data.data;
  } catch (error) {
    console.error("Error fetching late scans for teacher:", error);
    return null; // Return null ketika terjadi error
  }
};

// Fungsi untuk mengambil laporan berdasarkan rentang tanggal untuk guru tertentu
export const getScansByTeacherDateRange = async (
  teacherId,
  startDate,
  endDate
) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/laporan/date/guru/${teacherId}`,
      {
        params: { startDate, endDate },
      }
    );
    if (!response.data.data || response.data.data.length === 0) {
      return null; // Mengembalikan null jika data kosong
    }
    return response.data.data;
  } catch (error) {
    console.error("Error fetching scans for teacher by date range:", error);
    return null; // Return null ketika terjadi error
  }
};

// Fungsi untuk mengambil laporan yang mencakup terlambat dan absen
export const getReportForLateAndAbsentUsers = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/laporan/terlambat&absen`);
    if (!response.data.data || response.data.data.length === 0) {
      return null; // Mengembalikan null jika data kosong
    }
    return response.data.data;
  } catch (error) {
    console.error("Error fetching report for late and absent users:", error);
    return null; // Return null ketika terjadi error
  }
};

export default {
  loginUser,
  getUsers,
  registerUser,
  loginAdmin,
  getAdmins,
  registerAdmin,
  getAdminById,
  editAdmin,
  deleteAdmin,
  editUser,
  deleteUser,
  getUsersById,
  getUsersHurt,
  getUsersPermission,
  getAllReport,
  getLateScans,
  getReportByDateRange,
  getReportByTeacher,
  getReportByDateRangeAndTimeCondition,
  getLateScansTeacher,
  getScansByTeacherDateRange,
  getReportForLateAndAbsentUsers,
};