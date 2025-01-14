const connectDB = require('../config/db'); 

const checkUserByRFID = async (rfid) => {
  const connection = await connectDB();
  const [rows] = await connection.execute(
    'SELECT * FROM users WHERE rfid = ?',
    [rfid]
  );
  await connection.end(); 
  return rows;
};

const insertUser = async (rfid, name, kelamin, mapel, image, nip) => {
  const connection = await connectDB();
  const [result] = await connection.execute(
    'INSERT INTO users (rfid, name, kelamin, mapel, image, nip) VALUES (?, ?, ?, ?, ?, ?)',
    [rfid, name, kelamin, mapel, image, nip]
  );
  await connection.end(); // Tutup koneksi setelah query selesai
  return result;
};

// Fungsi untuk mendapatkan user berdasarkan ID
const getUserByID = async (userID) => {
  const connection = await connectDB();
  const [rows] = await connection.execute(
    'SELECT * FROM users WHERE id = ?',
    [userID]
  );
  await connection.end(); // Tutup koneksi setelah query selesai
  return rows;
};

// Fungsi untuk mendapatkan jenis scan terakhir user berdasarkan userID
const getLastScan = async (userID) => {
  const connection = await connectDB();
  const [rows] = await connection.execute(
    'SELECT type FROM scans WHERE userID = ? ORDER BY timestamp DESC LIMIT 1',
    [userID]
  );
  await connection.end(); // Tutup koneksi setelah query selesai
  return rows;
};

// Fungsi untuk mencatat scan (masuk/keluar) user
const insertScan = async (userID, type) => {
  const connection = await connectDB();
  const [result] = await connection.execute(
    'INSERT INTO scans (userID, type, timestamp) VALUES (?, ?, NOW())',
    [userID, type]
  );
  await connection.end(); // Tutup koneksi setelah query selesai
  return result;
};

// Fungsi untuk mendapatkan semua user
const getAllUsers = async () => {
  const connection = await connectDB();
  const [results] = await connection.execute('SELECT * FROM users');
  await connection.end(); // Tutup koneksi setelah query selesai
  return results;
};

const UsersGetHurt = async (userID) => {
  const connection = await connectDB();
  const [result] = await connection.execute(
    'INSERT INTO scans (userID, type, timestamp) VALUES (?, "sakit", NOW())',
    [userID]
  );
  await connection.end();
  return result;
};

const UsersGetPermission = async (userID) => {
  const connection = await connectDB();
  const [result] = await connection.execute(
    'INSERT INTO scans (userID, type, timestamp) VALUES (?, "ijin", NOW())',
    [userID]
  );
  await connection.end();
  return result;
};

const checkEntryForToday = async (userID, type) => {
  const connection = await connectDB();
  const [rows] = await connection.execute(
    'SELECT * FROM scans WHERE userID = ? AND type = ? AND DATE(timestamp) = CURDATE()',
    [userID, type]
  );
  await connection.end();
  return rows;
};

// Ekspor semua fungsi
module.exports = {
  checkUserByRFID,
  insertUser,
  getUserByID,
  getLastScan,
  insertScan,
  getAllUsers,
  UsersGetHurt,
  UsersGetPermission,
  checkEntryForToday
};
