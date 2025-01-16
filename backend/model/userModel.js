const connectDB = require("../config/db");

const insertUser = async (rfid, name, kelamin, mapel, image, nip) => {
  const connection = await connectDB();

  const query =
    "INSERT INTO users (rfid, name, kelamin, mapel, image, nip) VALUES (?, ?, ?, ?, ?, ?)";
  const [result] = await connection.execute(query, [
    rfid,
    name,
    kelamin,
    mapel,
    image,
    nip,
  ]);

  await connection.end();
  return result;
};

const insertUserXlsx = async (rfid, nip, name, kelamin, mapel) => {
  const connection = await connectDB();

  const query =
    "INSERT INTO users (rfid,nip, name, kelamin, mapel) VALUES(?,?,?,?,?)";
  const [result] = await connection.execute(query, [
    rfid,
    nip,
    name,
    kelamin,
    mapel,
  ]);

  await connection.end();
  return result;
};

const getAllUsers = async () => {
  const connection = await connectDB();
  const query = "SELECT * FROM users";
  const [results] = await connection.execute(query);
  await connection.end();
  return results;
};

const getUserByID = async (id) => {
  const connection = await connectDB();

  const query = "SELECT * FROM users WHERE id = ?";
  const [rows] = await connection.execute(query, [id]);

  await connection.end();
  return rows;
};

const editUser = async (id, name, kelamin, mapel, image) => {
  const connection = await connectDB();

  const query = `
        UPDATE users 
        SET name = ?, kelamin = ?, mapel = ?, image = ?
        WHERE id = ?`;
  const [result] = await connection.execute(query, [
    name,
    kelamin,
    mapel,
    image,
    id,
  ]);

  await connection.end();
  return result;
};

const deleteUser = async (id) => {
  const connection = await connectDB();

  const query = "DELETE FROM users WHERE id = ?";
  const [result] = await connection.execute(query, [id]);

  await connection.end();
  return result;
};

const checkUserNotAbsent = async (date = null) => {
  const connection = await connectDB();

  if (!date) date = new Date().toISOString().split("T")[0];

  const query = `SELECT users.*, scans.timestamp
                FROM users
                LEFT JOIN scans ON users.id = scans.userID
                AND DATE(scans.timestamp) = ?
                WHERE scans.userID IS NULL;
                `;

  const [result] = await connection.execute(query, [date]);
  await connection.end();
  return result;
};

module.exports = {
  insertUser,
  getAllUsers,
  getUserByID,
  editUser,
  deleteUser,
  insertUserXlsx,
  checkUserNotAbsent,
};
