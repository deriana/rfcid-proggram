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

export const getUsername = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/user/auth/${id}`);
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching user by id:",
      error.response.data || error.message
    );
    throw error.response ? error.response.data : error;
  }
};

export const registerUser = async (data) => {
  try {
    // Menyusun FormData untuk mengirimkan data termasuk image
    const formData = new FormData();

    // Menambahkan data lain ke dalam FormData
    formData.append("rfid", data.rfid);
    formData.append("name", data.name);
    formData.append("kelamin", data.kelamin);
    formData.append("mapel", data.mapel);
    formData.append("nip", data.nip);

    // Jika ada file, tambahkan ke formData
    if (data.image) {
      formData.append("image", data.image); // 'image' adalah nama input file
    }

    // Mengirim data dengan method POST
    const response = await axios.post(
      `${API_BASE_URL}/user/register`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data", // Penting agar bisa upload file
        },
      }
    );

    // Mengembalikan data dari server
    return response.data;
  } catch (error) {
    console.error(
      "Error during registration:",
      error.response?.data || error.message
    );
    throw error.response ? error.response.data : error;
  }
};

// Fungsi untuk edit user
export const editUser = async (id, updatedUser, imageFile) => {
  const formData = new FormData();

  formData.append("name", updatedUser.name);
  formData.append("kelamin", updatedUser.kelamin);
  formData.append("mapel", updatedUser.mapel);

  if (imageFile) {
    formData.append("image", imageFile); // Add image file only if it exists
  }

  try {
    const response = await axios.put(`${API_BASE_URL}/user/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data; // Return response data when the user is successfully updated
  } catch (error) {
    console.error("Error editing user:", error.response?.data || error.message);
    throw error.response ? error.response.data : error; // Return detailed error if it occurs
  }
};

export const editPassword = async (id, updatedPassword) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/user/password/${id}`, updatedPassword)
    return response.data
  } catch (error) {
    console.error("Error editing user password:", error.response.data || error.message);
    throw error.response ? error.response.data : error;
  }
}

// Fungsi untuk menghapus user
export const deleteUser = async (id) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/user/${id}`);
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

    // Simpan token ke localStorage jika login berhasil
    const { token } = response.data; // Pastikan response API memberikan token
    if (token) {
      localStorage.setItem("authToken", token); // Simpan token di localStorage
    } else {
      console.warn("Token tidak ditemukan dalam respons.");
    }

    return response.data; // Kembalikan data lainnya jika ada
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
    ); 
    return response.data;
  } catch (error) {
    console.error("Error editing admin:", error.response.data || error.message);
    throw error.response ? error.response.data : error;
  }
};

// Fungsi untuk menghapus admin
export const deleteAdmin = async (id) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/admin/delete/${id}`);
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
export const getUsersAlfa = async (payload) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/users/alfa`, payload);
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
      return []; // Mengembalikan null jika data kosong
    }
    return response.data.data;
  } catch (error) {
    console.error("Error fetching all reports:", error);
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

// Fungsi untuk mengambil laporan terlambat untuk guru
export const getLateScansTeacher = async (startDate, endDate) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/laporan/terlambat/guru`, {
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

export const getRecapAbsen = async (startDate, endDate) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/laporan/recap`, {
      params: { startDate, endDate },
    });
    if (!response.data.data || response.data.data.length === 0) {
      return null;
    }
    return response.data.data;
  } catch (error) {
    console.error("Error fetching scans for teacher by date range:", error);
    return null;
  }
};

export const uploadXlsx = async (formData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/upload-xlsx`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error uploading file:", error.response || error.message);
    throw error;
  }
};

export const checkUserAbsent = async (date = null) => {
  try {
    const params = new URLSearchParams();
    if (date) params.append("date", date);

    const response = await axios.get(
      `${API_BASE_URL}/checkabsent?${params.toString()}`
    );
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching users:",
      error.response?.data || error.message
    );
    throw error.response ? error.response.data : error;
  }
};

export const getDashboard = async (type) => {
  try {
    const response = await fetch(`${API_BASE_URL}/dashboard`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ type }),
    });

    const result = await response.json();

    if (response.ok) {
      return result.data;
    } else {
      throw new Error(result.message || "Terjadi kesalahan saat memuat data.");
    }
  } catch (error) {
    console.error("Error fetching dashboard data", error);
    throw new Error(error.message);
  }
};

export const getDashboardHadir = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/dashboard/hadir`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result = await response.json();

    if (response.ok) {
      return result.data; 
    } else {
      throw new Error(result.message || "Terjadi kesalahan saat memuat data.");
    }
  } catch (error) {
    console.error("Error fetching dashboard hadir data", error);
    throw new Error(error.message);
  }
};
export const getDashboardFullHadir = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/dashboard/full/hadir`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result = await response.json();

    if (response.ok) {
      return result.data; 
    } else {
      throw new Error(result.message || "Terjadi kesalahan saat memuat data.");
    }
  } catch (error) {
    console.error("Error fetching dashboard hadir data", error);
    throw new Error(error.message);
  }
};
export const getDashboardFullTerlambat = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/dashboard/full/terlambat`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result = await response.json();

    if (response.ok) {
      return result.data; 
    } else {
      throw new Error(result.message || "Terjadi kesalahan saat memuat data.");
    }
  } catch (error) {
    console.error("Error fetching dashboard hadir data", error);
    throw new Error(error.message);
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
  getUsersAlfa,
  getAllReport,
  getReportByDateRange,
  getLateScansTeacher,
  getScansByTeacherDateRange,
  uploadXlsx,
  checkUserAbsent,
  getRecapAbsen,
  getDashboard,
  getDashboardHadir,
  getDashboardFullHadir,
  getDashboardFullTerlambat,
  getUsername,
  editPassword
};
