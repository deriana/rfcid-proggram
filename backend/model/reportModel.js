const connectDB = require("../config/db");
const { connect } = require("../route/reportRoutes");

const getAllReport = async () => {
  const connection = await connectDB();

  const query = `
    SELECT 
        s.id AS No,
        u.name AS Nama,
        u.nip AS nip,
        u.kelamin AS Kelamin,
        u.mapel AS 'Mata Pelajaran',
        s.timestamp AS 'Waktu Absensi',
        s.type AS 'Jenis Absensi'
    FROM 
        scans s
    JOIN 
        users u ON s.userID = u.id
    WHERE 
        s.timestamp BETWEEN DATE(NOW()) AND NOW()
        AND DAYOFWEEK(s.timestamp) NOT IN (1, 7)  -- Exclude Saturday and Sunday
    ORDER BY 
        s.timestamp DESC;
  `;

  const [rows] = await connection.execute(query);
  await connection.end();
  return rows;
};

const getScansByDateRange = async (startDate, endDate) => {
  const connection = await connectDB();

  const query = `
    SELECT 
        s.id AS No,
        u.name AS Nama,
        u.nip AS nip,
        u.kelamin AS Kelamin,
        u.mapel AS 'Mata Pelajaran',
        s.timestamp AS 'Waktu Absensi',
        s.type AS 'Jenis Absensi'
    FROM 
        scans s
    JOIN 
        users u ON s.userID = u.id
    WHERE 
        DATE(s.timestamp) BETWEEN ? AND ? 
        AND DAYOFWEEK(s.timestamp) NOT IN (1, 7)  -- Exclude Saturday and Sunday
    ORDER BY 
        s.timestamp DESC;
  `;

  const [rows] = await connection.execute(query, [startDate, endDate]);
  await connection.end();
  return rows;
};

const getLateScansTeacher = async (startDate, endDate) => {
  const connection = await connectDB();

  const query = `
      SELECT 
        s.id AS No,
        u.name AS Nama,
        u.nip AS nip,
        u.kelamin AS Kelamin,
        u.mapel AS 'Mata Pelajaran',
        s.timestamp AS 'Waktu Absensi',
        s.type AS 'Jenis Absensi'
    FROM 
        scans s
    JOIN 
        users u ON s.userID = u.id
    WHERE
        s.type = 'terlambat'  -- Filter for 'terlambat' absences
        AND DATE(s.timestamp) BETWEEN ? AND ? 
        AND DAYOFWEEK(s.timestamp) NOT IN (1, 7)  -- Exclude Saturday and Sunday
    ORDER BY 
        s.timestamp DESC;
    `;

  const [rows] = await connection.execute(query, [startDate, endDate]);
  await connection.end();
  return rows;
};

const getReportByTeacherDateRange = async (id, startDate, endDate) => {
  const connection = await connectDB();

  const query = `
    SELECT 
        u.name AS Nama,
        u.nip AS nip,
        u.mapel AS 'Mata Pelajaran',
        s.timestamp AS 'Waktu Absensi',
        s.type AS 'Jenis Absensi'
    FROM 
        scans s
    JOIN 
        users u ON s.userID = u.id
    WHERE 
        u.id = ?
        AND DATE(s.timestamp) BETWEEN ? AND ?
        AND DAYOFWEEK(s.timestamp) NOT IN (1, 7)  -- Exclude Saturday and Sunday
    ORDER BY 
        s.timestamp DESC;
  `;

  const [rows] = await connection.execute(query, [id, startDate, endDate]);
  await connection.end();
  return rows;
};

const getRecapAbsen = async (startDate, endDate) => {
  const connection = await connectDB();

  const query = `SELECT 
    u.name AS Nama,
    u.nip AS nip,
    u.mapel AS 'Mata Pelajaran',
    COUNT(CASE WHEN s.type = 'masuk' THEN 1 END) AS 'Hadir',
    COUNT(CASE WHEN s.type = 'terlambat' THEN 1 END) AS 'Terlambat',
    COUNT(CASE WHEN s.type = 'ijin' THEN 1 END) AS 'Ijin',
    COUNT(CASE WHEN s.type = 'alfa' THEN 1 END) AS 'Alfa'
    FROM 
        scans s
    JOIN 
        users u ON s.userID = u.id
    WHERE 
        DATE(s.timestamp) BETWEEN ? AND ?
        AND DAYOFWEEK(s.timestamp) NOT IN (1, 7)  -- Exclude Saturday and Sunday
    GROUP BY 
        u.id, u.name, u.mapel
    ORDER BY 
        'Hadir' DESC;  
    `;
  const [rows] = await connection.execute(query, [startDate, endDate]);
  await connection.end();
  return rows;
};

module.exports = {
  getAllReport,
  getScansByDateRange,
  getLateScansTeacher,
  getReportByTeacherDateRange,
  getRecapAbsen,
};
