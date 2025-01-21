const userModel = require("../model/userModel");
const { successResponse, errorResponse } = require("../providers/response");
const upload = require("../middleware/multer");
const XLSX = require("xlsx");
const path = require("path");
const fs = require("fs");
const bcrypt = require("bcrypt");
const saltRounds = 10; // Jumlah salt untuk bcrypt hashing

const registerUser = (req, res) => {
  // Proses upload menggunakan multer
  upload(req, res, async (err) => {
    // Jika ada error saat upload file
    if (err) {
      console.error("Error upload image:", err.message); // Log error upload file
      return res.status(400).json({ message: err.message });
    }

    // Mengambil data dari request body
    const { rfid, name, kelamin, mapel, nip } = req.body;
    // Mengecek jika ada file yang diupload dan mengambil nama file
    const image = req.file ? req.file.filename : null;

    // Validasi bahwa data tidak kosong
    if (!rfid || !name || !kelamin || !mapel || !image || !nip) {
      return res.status(400).json({ message: "Data tidak boleh kosong" });
    }

    try {
      // Cek apakah RFID sudah terdaftar
      const rows = await userModel.getUserByID(rfid);
      if (rows.length > 0) {
        return res
          .status(400)
          .json({ message: "RFID sudah terdaftar, coba ID yang lain." });
      }

      // Ambil dua kata pertama dari name dan gabungkan tanpa spasi untuk username
      const nameParts = name.split(" ");
      const username = nameParts.slice(0, 2).join("").toLowerCase(); // Username = 2 kata pertama tanpa spasi dan lowercase

      // Password default adalah username + "123*"
      const rawPassword = username + "123*"; // Password format default

      // Hash password menggunakan bcrypt
      const hashedPassword = await bcrypt.hash(rawPassword, saltRounds);

      // Jika RFID belum terdaftar, simpan data pengguna baru
      const result = await userModel.insertUser(
        rfid,
        name,
        username,
        hashedPassword, // Menggunakan hashed password
        kelamin,
        mapel,
        image,
        nip
      );

      // Ambil semua pengguna untuk dikirimkan ke response
      const allUsers = await userModel.getAllUsers();

      // Kirimkan respon sukses
      return res.status(200).json({
        message: "DONE BOS KU",
        users: allUsers,
        userInserted: result,
      });
    } catch (error) {
      console.error("Error registering user:", error); // Log error proses registrasi
      return res.status(500).json({ message: error.message });
    }
  });
};

const loginUser = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Username and password are required" });
  }

  try {
    const rows = await userModel.getUserByUsername(username);

    if (rows.length === 0) {
      return res.status(401).json({ message: "Username or password is incorrect" });
    }

    const isPasswordValid = await bcrypt.compare(password, rows[0].password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Username or password is incorrect" });
    }

    const { password: _, ...user } = rows[0]; 
    return res.status(200).json({
      message: "Login successful",
      user: user, 
    });

  } catch (error) {
    console.error("Error logging in:", error); 
    return res.status(500).json({ message: error.message });
  }
};

const getUsers = async (req, res) => {
  try {
    const results = await userModel.getAllUsers();
    const response = successResponse({
      data: results,
      message: "Fetching all users success",
    });
    return res.status(200).json(response);
  } catch (error) {
    console.error("Error fetching users:", error); // Debug log
    const response = errorResponse({ message: error.message });
    return res.status(500).json(response);
  }
};

const checkUserNotAbsent = async (req, res) => {
  try {
    const { date } = req.query;

    const results = await userModel.checkUserNotAbsent(date);
    const response = successResponse({
      data: results,
      message: "Fetching user not absent success",
    });
    return res.status(200).json(response);
  } catch (error) {
    console.error("Error fetching users:", error); // Debug log
    const response = errorResponse({ message: error.message });
    return res.status(500).json(response);
  }
};

const getUserByID = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ message: "Id tidak boleh kosong" });
  }

  try {
    const user = await userModel.getUserByID(id);
    if (user.length === 0) {
      return res.status(404).json({ message: "User tidak ditemukan" });
    }

    return res.status(200).json({ message: "User ditemukan", user });
  } catch (error) {
    console.error("Error fetching user:", error);
    return res.status(500).json({ message: error.message });
  }
};

const getUsername = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ message: "Id tidak boleh kosong" });
  }

  try {
    const user = await userModel.checkUsername(id);
    if (user.length === 0) {
      return res.status(404).json({ message: "User tidak ditemukan" });
    }

    return res.status(200).json({ message: "User ditemukan", user });
  } catch (error) {
    console.error("Error fetching user:", error);
    return res.status(500).json({ message: error.message });
  }
};

const editUser = (req, res) => {
  const { id } = req.params;

  // Proses upload file jika ada
  upload(req, res, async (err) => {
    if (err) {
      console.error("Error upload image:", err.message);
      return res.status(400).json({ message: err.message });
    }

    // Ambil data dari request
    const { name, kelamin, mapel } = req.body;
    const image = req.file ? req.file.filename : null;

    // Validasi input
    if (!id) {
      return res.status(400).json({ message: "ID tidak boleh kosong" });
    }
    if (!name || !kelamin || !mapel) {
      return res.status(400).json({ message: "Data tidak boleh kosong" });
    }

    try {
      // Cek apakah pengguna ada di database
      const user = await userModel.getUserByID(id);
      if (user.length === 0) {
        return res.status(404).json({ message: "User tidak ditemukan" });
      }

      // Jika file gambar tidak diupload, gunakan gambar lama
      const imageToUpdate = image || user[0].image;

      // Update pengguna di database
      const result = await userModel.editUser(
        id,
        name,
        kelamin,
        mapel,
        imageToUpdate
      );
      return res.status(200).json({
        message: "User berhasil diubah",
        result,
      });
    } catch (error) {
      console.error("Error editing user:", error);
      return res.status(500).json({ message: error.message });
    }
  });
};

const editPassword = async (req, res) => {
  const { id } = req.params;
  const { password } = req.body;

  if (!id) {
    return res.status(400).json({ message: "ID tidak boleh kosong" });
  }

  if (!password) {
    return res.status(400).json({ message: "Password tidak boleh kosong" });
  }

  try {
    // Hash the password with bcrypt and the defined salt rounds
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Call the changePassword model function to update the password in the database
    const result = await userModel.changePassword(hashedPassword, id);

    // If no rows were affected, the user was not found or the password was not updated
    if (result.affectedRows === 0) {
      return res
        .status(404)
        .json({ message: "User not found or password not updated" });
    }

    // Successfully updated the password
    return res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    console.error("Error editing user:", error);
    return res.status(500).json({ message: error.message });
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ message: "Id tidak boleh kosong" });
  }

  try {
    const user = await userModel.getUserByID(id);
    if (user.length === 0) {
      return res.status(404).json({ message: "User tidak ditemukan" });
    }

    const result = await userModel.deleteUser(id);
    return res.status(200).json({ message: "User berhasil dihapus", result });
  } catch (error) {
    console.error("Error deleting user:", error);
    return res.status(500).json({ message: error.message });
  }
};

const uploadXlsx = async (req, res) => {
  // Mengecek jika file tidak ada dalam request
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  try {
    // Dapatkan path file yang diupload
    const filePath = path.join(__dirname, "../uploads", req.file.filename);

    // Baca file Excel menggunakan XLSX
    const workbook = XLSX.readFile(filePath);
    const sheetName = workbook.SheetNames[0]; // Ambil sheet pertama
    const sheet = workbook.Sheets[sheetName];

    // Konversi sheet menjadi data JSON
    const data = XLSX.utils.sheet_to_json(sheet);

    // Iterasi data dan masukkan ke database
    for (const user of data) {
      const { rfid, nip, name, kelamin, mapel } = user;
      // Insert setiap data user ke dalam database
      await userModel.insertUserXlsx(rfid, nip, name, kelamin, mapel);
    }

    // Menghapus file yang sudah diproses setelah masuk ke DB
    fs.unlinkSync(filePath);

    // Mengirimkan respons bahwa file berhasil diproses dan disimpan ke database
    return res.status(200).json({
      message:
        "Data from Excel has been uploaded and inserted into the database.",
    });
  } catch (error) {
    console.error(error);
    // Mengirimkan error jika ada kesalahan saat memproses file
    return res.status(500).json({ message: "Error processing the file" });
  }
};

module.exports = {
  registerUser,
  getUsers,
  editUser,
  deleteUser,
  getUserByID,
  uploadXlsx,
  checkUserNotAbsent,
  getUsername,
  editPassword,
  loginUser
};
