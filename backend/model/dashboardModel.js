const connectDB = require("../config/db");

const getDashboard = async (type) => {
  const connection = await connectDB();
  const query =
    "SELECT COUNT(DISTINCT userID) AS hasil FROM scans WHERE type = ? AND DATE(timestamp) = CURDATE();";
  const [results] = await connection.execute(query, [type]);
  await connection.end();
  return results;
};

const getDashboardHadir = async () => {
  const connection = await connectDB();
  const query = `SELECT COUNT(DISTINCT userID) AS hasil
              FROM scans
              WHERE type = 'masuk' AND DATE(timestamp) = CURDATE();
              `;
  const [results] = await connection.execute(query);
  return results;
};

const getDashboardFullHadir = async () => {
  const connection = await connectDB();
  const query = "SELECT COUNT(*) as hasil FROM scans WHERE type = 'masuk'";
  const [results] = await connection.execute(query);
  return results;
};
const getDashboardFullTerlambat = async () => {
  const connection = await connectDB();
  const query = "SELECT COUNT(*) as hasil FROM scans WHERE type = 'terlambat'";
  const [results] = await connection.execute(query);
  return results;
};

module.exports = {
  getDashboard,
  getDashboardHadir,
  getDashboardFullHadir,
  getDashboardFullTerlambat
};
