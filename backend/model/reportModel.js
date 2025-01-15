const connectDB = require("../config/db");

const getAllReport = async () => {
  const connection = await connectDB();

  const query = `
    SELECT 
        s.id AS No,
        u.name AS Nama,
        u.rfid AS RFID,
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

const getScansByTeacher = async (id) => {
  const connection = await connectDB();

  const query = `
    SELECT 
        s.id AS No,
        u.name AS Nama,
        u.rfid AS RFID,
        u.kelamin AS Kelamin,
        u.mapel AS 'Mata Pelajaran',
        s.timestamp AS 'Waktu Absensi',
        s.type AS 'Jenis Absensi'
    FROM 
        scans s
    JOIN 
        users u ON s.userID = u.id
    WHERE 
        u.id = ?
        AND DAYOFWEEK(s.timestamp) NOT IN (1, 7)  -- Exclude Saturday and Sunday
    ORDER BY 
        s.timestamp DESC;
  `;

  const [rows] = await connection.execute(query, [id]);
  await connection.end();
  return rows;
};

const getReportByType = async (option) => {
  const connection = await connectDB();

  const query = `
    SELECT 
        u.name AS Nama,
        u.mapel AS 'Mata Pelajaran',
        s.timestamp AS 'Waktu Absensi',
        s.type AS 'Jenis Absensi'
    FROM 
        scans s
    JOIN 
        users u ON s.userID = u.id
    WHERE 
        s.type = ?
        AND DAYOFWEEK(s.timestamp) NOT IN (1, 7)  -- Exclude Saturday and Sunday
    ORDER BY 
        s.timestamp, s.type;
  `;

  const [rows] = await connection.execute(query, [option]);
  await connection.end();
  return rows;
};

const getScansByDateRange = async (startDate, endDate) => {
  const connection = await connectDB();

  const query = `
    SELECT 
        s.id AS No,
        u.name AS Nama,
        u.rfid AS RFID,
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

const getReportByDateRangeAndTimeCondition = async (
  startDate,
  endDate,
  timeCondition,
  timeValue
) => {
  const connection = await connectDB();

  const query = `
    SELECT 
        s.id AS No,
        u.name AS Nama,
        u.rfid AS RFID,
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
        AND s.type = 'masuk'
        AND TIME(s.timestamp) ${timeCondition} ?
    ORDER BY 
        s.timestamp DESC;
  `;

  const [rows] = await connection.execute(query, [
    startDate,
    endDate,
    timeValue,
  ]);
  await connection.end();
  return rows;
};

const getLateScans = async () => {
  const connection = await connectDB();

  const query = `
    SELECT 
        u.name AS Nama,
        u.mapel AS 'Mata Pelajaran',
        s.timestamp AS 'Waktu Masuk'
    FROM 
        scans s
    JOIN 
        users u ON s.userID = u.id
    WHERE 
        s.type = 'masuk'
        AND TIME(s.timestamp) > '08:00:00'
        AND DAYOFWEEK(s.timestamp) NOT IN (1, 7)  -- Exclude Saturday and Sunday
    ORDER BY 
        s.timestamp;
  `;

  const [rows] = await connection.execute(query);
  await connection.end();
  return rows;
};

const getLateScansTeacher = async (id) => {
  const connection = await connectDB();

  const query = `
    SELECT 
        u.name AS Nama,
        u.mapel AS 'Mata Pelajaran',
        s.timestamp AS 'Waktu Masuk'
    FROM 
        scans s
    JOIN 
        users u ON s.userID = u.id
    WHERE 
        s.type = 'masuk'
        AND TIME(s.timestamp) > '08:00:00'
        AND u.id = ?
        AND DAYOFWEEK(s.timestamp) NOT IN (1, 7)  -- Exclude Saturday and Sunday
    ORDER BY 
        s.timestamp;
  `;

  const [rows] = await connection.execute(query, [id]);
  await connection.end();
  return rows;
};

const getReportByTeacherDateRange = async (id, startDate, endDate) => {
  const connection = await connectDB();

  const query = `
    SELECT 
        u.name AS Nama,
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

const getReportForLateAndAbsentUsers = async () => {
  const connection = await connectDB();

  const query = `
WITH LateCounts AS (
    SELECT 
        u.id AS UserID,
        u.name AS Nama,
        u.rfid AS RFID,
        u.kelamin AS Kelamin,
        u.mapel AS 'Mata Pelajaran',
        COUNT(*) AS LateCount
    FROM 
        scans s
    JOIN 
        users u ON s.userID = u.id
    WHERE 
        s.type = 'masuk' 
        AND TIME(s.timestamp) > '08:00:00' 
        AND DAYOFWEEK(s.timestamp) NOT IN (1, 7)  -- Exclude Saturday and Sunday
    GROUP BY 
        u.id, u.name, u.rfid, u.kelamin, u.mapel
),
AbsentCounts AS (
    SELECT 
        u.id AS UserID,
        u.name AS Nama,
        u.rfid AS RFID,
        u.kelamin AS Kelamin,
        u.mapel AS 'Mata Pelajaran',
        (COUNT(DISTINCT DATE(s.timestamp)) - COUNT(DISTINCT CASE WHEN s.type = 'masuk' THEN DATE(s.timestamp) END)) AS TotalAbsences
    FROM 
        users u
    LEFT JOIN 
        scans s ON u.id = s.userID
    WHERE 
        DAYOFWEEK(s.timestamp) NOT IN (1, 7)  -- Exclude Saturday and Sunday
    GROUP BY 
        u.id, u.name, u.rfid, u.kelamin, u.mapel
)
SELECT 
    u.id AS UserID,
    u.name AS Nama,
    u.rfid AS RFID,
    u.kelamin AS Kelamin,
    u.mapel AS 'Mata Pelajaran',
    IFNULL(LateCounts.LateCount, 0) AS JumlahTerlambat,
    IFNULL(AbsentCounts.TotalAbsences, 0) AS JumlahTidakMasuk
FROM 
    users u
LEFT JOIN 
    LateCounts ON u.id = LateCounts.UserID
LEFT JOIN 
    AbsentCounts ON u.id = AbsentCounts.UserID
ORDER BY 
    JumlahTerlambat DESC, 
    JumlahTidakMasuk DESC;
  `;

  const [rows] = await connection.execute(query);
  await connection.end();
  return rows;
};

module.exports = {
  getAllReport,
  getScansByTeacher,
  getReportByType,
  getScansByDateRange,
  getReportByDateRangeAndTimeCondition,
  getLateScans,
  getLateScansTeacher, 
  getReportByTeacherDateRange,
  getReportForLateAndAbsentUsers,
};
