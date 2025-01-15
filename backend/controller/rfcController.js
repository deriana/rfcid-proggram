const rfcModel = require("../model/rfcModel"); // Mengimpor model untuk akses database

// Fungsi untuk registrasi user
const registerUser = async (req, res) => {
  const { rfid, name, kelamin, mapel, image, nip} = req.body;

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
      const image = rows[0].image
      const nip = rows[0].nip
      const timestamp = rows[0].timestamp

      // Mengecek status scan terakhir user
      const lastScanRows = await rfcModel.getLastScan(userID);
      let scanType = "masuk";

      // Menentukan jenis scan (masuk/keluar)
      if (lastScanRows.length > 0 && lastScanRows[0].type === "masuk") {
        scanType = "keluar";
      }

      // Menyimpan scan terbaru (masuk/keluar)
      await rfcModel.insertScan(userID, scanType);

      // Mengirimkan response yang lebih informatif ke client
      const message = `Status ${
        scanType === "masuk" ? "berhasil masuk" : "berhasil keluar"
      }! Selamat datang, ${name}`;

      // Mengirim informasi tambahan (RFID dan scan status)
      res.json({
        message,
        name,
        nip,
        image,
        timestamp,
        rfid, // Menambahkan RFID dalam respons
        scanType, // Menambahkan jenis scan dalam respons
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
    const { userID } = req.body; // Ambil userID dari request body
  
    // Validasi input
    if (!userID) {
      return res.status(400).json({ message: "User ID harus diisi" });
    }
  
    try {
      // Periksa apakah sudah ada entri 'sakit' untuk hari ini
      const existingEntries = await rfcModel.checkEntryForToday(userID, "sakit");
  
      if (existingEntries.length > 0) {
        return res.status(400).json({
          message: "Anda sudah mencatat kondisi 'sakit' hari ini.",
        });
      }
  
      // Jika belum, tambahkan entri baru
      const result = await rfcModel.UsersGetHurt(userID);
  
      // Kirimkan respons sukses
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
  const { userID } = req.body; // Ambil userID dari request body

  // Validasi input
  if (!userID) {
    return res.status(400).json({ message: "User ID harus diisi" });
  }

  try {
    // Periksa apakah sudah ada entri 'ijin' untuk hari ini
    const today = new Date().toISOString().split("T")[0]; // Format tanggal "YYYY-MM-DD"
    const existingEntries = await rfcModel.checkScanForToday(
      userID,
      "ijin",
      today
    );

    if (existingEntries.length > 0) {
      return res.status(400).json({
        message: "Anda sudah mencatat kondisi 'ijin' hari ini.",
      });
    }

    // Jika belum, buat entri baru
    const result = await rfcModel.UsersGetPermission(userID);

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

// Mengekspor fungsi controller
module.exports = {
  registerUser,
  loginUser,
  getUsers,
  UsersGetHurt,
  UsersGetPermission,
};
