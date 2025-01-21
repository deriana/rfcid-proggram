const connectDB = require("../config/db");

const insertUser = async (
  rfid,
  name,
  username,
  password,
  kelamin,
  mapel,
  image,
  nip
) => {
  const connection = await connectDB();

  const query =
    "INSERT INTO users (rfid, name, username, password, kelamin, mapel, image, nip) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
  const [result] = await connection.execute(query, [
    rfid,
    name,
    username,
    password,
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
  const query = "SELECT * FROM users WHERE status = 'On'";
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
  const query = "UPDATE users SET status = ? WHERE id = ?";
  const [result] = await connection.execute(query, ["Of", id]);

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
                WHERE scans.userID IS NULL AND status = 'On';
                `;

  const [result] = await connection.execute(query, [date]);
  await connection.end();
  return result;
};

const checkUsername = async (id) => {
  const connection = await connectDB();

  const query = "SELECT username FROM users WHERE id = ?";

  const [result] = await connection.execute(query, [id]);
  await connection.end();
  return result;
};

const changePassword = async (password, id) => {
  const connection = await connectDB();

  const query = "UPDATE users SET password = ? WHERE id = ?";

  const [result] = await connection.execute(query, [password, id]);
  await connection.end()
  return result
};

const getUserByUsername = async (username) => {
  const connection = await connectDB();
  const query = 'SELECT * FROM users WHERE username = ?';
  const [result] = await connection.execute(query, [username]);
  await connection.end()
  return result
};

module.exports = {
  insertUser,
  getAllUsers,
  getUserByID,
  editUser,
  deleteUser,
  insertUserXlsx,
  checkUserNotAbsent,
  checkUsername,
  changePassword,
  getUserByUsername
};
