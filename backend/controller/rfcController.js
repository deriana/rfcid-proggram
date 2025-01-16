const rfcModel = require("../model/rfcModel"); // Mengimpor model untuk akses database

// Fungsi untuk registrasi user
const registerUser = async (req, res) => {
  const { rfid, name, kelamin, mapel, image, nip } = req.body;

  // Validasi input
  if (!rfid || !name || !kelamin || !mapel || !image || !nip) {
    return res.status(400).json({ message: "RFID dan nama harus diisi" });
  }

  try {
    // Mengecek apakah RFID sudah terdaftar
    const rows = await rfcModel.checkUserByRFID(rfid);
    if (rows.length > 0) {
      return res.status(400).json({ message: "RFID sudah terdaftar" });
    }

    // Jika RFID belum terdaftar, insert user baru
    await rfcModel.insertUser(rfid, name, kelamin, mapel, image, nip);
    res.json({ message: "Registrasi berhasil!" });
  } catch (err) {
    console.error("Error registering user:", err);
    res
      .status(500)
      .json({ message: "Terjadi kesalahan dalam registrasi user." });
  }
};

// Fungsi untuk login user (scan RFID)
const loginUser = async (req, res) => {
  const { rfid } = req.body;

  // Validasi input
  if (!rfid) {
    return res.status(400).json({ message: "RFID harus diisi" });
  }

  try {
    // Mengecek apakah RFID terdaftar
    const rows = await rfcModel.checkUserByRFID(rfid);
    if (rows.length > 0) {
      const userID = rows[0].id;
      const name = rows[0].name;
      const image = rows[0].image;
      const nip = rows[0].nip;

      // Mendapatkan tanggal dan waktu saat ini
      const now = new Date();
      const currentTime = now.toTimeString().split(" ")[0]; // Format HH:MM:SS

      // Menentukan jenis scan berdasarkan waktu
      let scanType = "masuk"; // Default type

      // **Validasi scan di atas jam 8 - Terlambat**
      if (currentTime > "08:00:00" && currentTime <= "12:00:00") {
        scanType = "terlambat"; // Terlambat jika di atas jam 08:00 pagi
      }

      // **Validasi scan di atas jam 12 - Keluar**
      if (currentTime > "12:00:00") {
        const lastScanRows = await rfcModel.getLastScan(userID);
        if (lastScanRows.length > 0 && lastScanRows[0].type === "masuk") {
          scanType = "keluar"; // Scan keluar jika sudah ada scan masuk
        } else {
          // Jika belum ada scan masuk, default ke "masuk"
          scanType = "masuk";
        }
      }

      // Menyimpan scan terbaru
      await rfcModel.insertScan(userID, scanType);

      // Pesan berdasarkan status scan
      const message = `Status ${
        scanType === "terlambat"
          ? "terlambat"
          : scanType === "keluar"
          ? "berhasil keluar"
          : "berhasil masuk"
      }! Selamat ${scanType === "keluar" ? "jalan" : "datang"}, ${name}`;

      // Mengirim informasi tambahan (RFID dan scan status)
      res.json({
        message,
        name,
        nip,
        image,
        timestamp: now, // Menggunakan waktu saat ini
        rfid,
        scanType,
      });
    } else {
      res.status(400).json({ message: "RFID tidak terdaftar" });
    }
  } catch (err) {
    console.error("Error during user login:", err);
    res.status(500).json({ message: "Terjadi kesalahan dalam proses login." });
  }
};

// Fungsi untuk mendapatkan semua user
const getUsers = async (req, res) => {
  try {
    // Mendapatkan daftar user
    const results = await rfcModel.getAllUsers();

    if (results.length === 0) {
      return res.status(404).json({ message: "Tidak ada data pengguna" });
    }

    res.json(results);
  } catch (err) {
    console.error("Error fetching users:", err);
    res
      .status(500)
      .json({ message: "Terjadi kesalahan dalam mengambil data pengguna." });
  }
};

const UsersGetHurt = async (req, res) => {
  const { userID, date } = req.body; // Ambil userID dan date dari request body

  // Validasi input
  if (!userID || !date) {
    return res
      .status(400)
      .json({ message: "User ID dan tanggal harus diisi." });
  }

  try {
    const today = new Date().toISOString().split("T")[0]; // Tanggal hari ini
    const inputDate = new Date(date).toISOString().split("T")[0]; // Tanggal dari input

    // Validasi apakah tanggal input ≤ hari ini
    if (inputDate > today) {
      return res.status(400).json({
        message:
          "Tanggal yang dipilih tidak valid. Tidak dapat mencatat kondisi di masa depan.",
      });
    }
    const result = await rfcModel.UsersGetHurt(userID, inputDate);

    // Kirim respons sukses
    res.json({
      message: "Kondisi 'sakit' berhasil dicatat.",
      affectedRows: result.affectedRows,
    });
  } catch (err) {
    console.error("Error recording user 'sakit':", err);
    res.status(500).json({
      message: "Terjadi kesalahan dalam mencatat kondisi 'sakit'.",
    });
  }
};

const UsersGetPermission = async (req, res) => {
  const { userID, date } = req.body; // Ambil userID dari request body

  // Validasi input
  if (!userID || !date) {
    return res.status(400).json({ message: "User ID harus diisi" });
  }

  try {
    const today = new Date().toISOString().split("T")[0]; // Tanggal hari ini
    const inputDate = new Date(date).toISOString().split("T")[0]; // Tanggal dari input

    if (inputDate > today) {
      return res.status(400).json({
        message:
          "Tanggal yang dipilih tidak valid. Tidak dapat mencatat kondisi di masa depan.",
      });
    }
    const result = await rfcModel.UsersGetPermission(userID, date);

    // Kirim respons sukses
    res.json({
      message: "Kondisi 'ijin' berhasil dicatat.",
      affectedRows: result.affectedRows,
    });
  } catch (err) {
    console.error("Error recording user 'ijin':", err);
    res.status(500).json({
      message: "Terjadi kesalahan dalam mencatat kondisi 'ijin'.",
    });
  }
};

const UsersGetAlfa = async (req, res) => {
  const { userID, date } = req.body; // Ambil userID dari request body

  // Validasi input
  if (!userID || !date) {
    return res.status(400).json({ message: "User ID harus diisi" });
  }

  try {
    const today = new Date().toISOString().split("T")[0]; // Tanggal hari ini
    const inputDate = new Date(date).toISOString().split("T")[0]; // Tanggal dari input

    if (inputDate > today) {
      return res.status(400).json({
        message:
          "Tanggal yang dipilih tidak valid. Tidak dapat mencatat kondisi di masa depan.",
      });
    }
    const result = await rfcModel.UsersGetAlfa(userID, date);

    // Kirim respons sukses
    res.json({
      message: "Kondisi 'alfa' berhasil dicatat.",
      affectedRows: result.affectedRows,
    });
  } catch (err) {
    console.error("Error recording user 'alfa':", err);
    res.status(500).json({
      message: "Terjadi kesalahan dalam mencatat kondisi 'ijin'.",
    });
  }
};

// Mengekspor fungsi controller
module.exports = {
  registerUser,
  loginUser,
  getUsers,
  UsersGetHurt,
  UsersGetPermission,
  UsersGetAlfa,
};
