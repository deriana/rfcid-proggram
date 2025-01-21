const connectDB = require("../config/db");

const getAbsent = async (id) => {
  const connection = await connectDB();
  const query = "SELECT id, userID, TIME(timestamp) AS TIME, type FROM scans WHERE userID = ? AND DATE(timestamp) = DATE(NOW())";
  const [result] = await connection.execute(query, [id]);
  await connection.end();
  return result;
};

const getCountByType = async (id, type) => {
  const connection = await connectDB();
  const query = `
  SELECT COUNT(*) AS count 
  FROM scans 
  WHERE userID = ? 
    AND type = ? 
    AND DATE(timestamp) >= DATE_SUB(NOW(), INTERVAL 30 DAY)
`;
  const [results] = await connection.execute(query, [id, type]);
  await connection.end();
  return results;
};

const getReportDate = async (id, startDate, endDate) => {
  const connection = await connectDB();
  const query = `SELECT 
        DATE(s.timestamp) AS Tanggal,
        u.name AS Nama,
        s.type AS Status
    FROM 
        scans s
    JOIN 
        users u ON s.userID = u.id
    WHERE
        s.userID = ?
        AND DATE(s.timestamp) BETWEEN ? AND ? 
        AND DAYOFWEEK(s.timestamp) NOT IN (1, 7)
    ORDER BY 
        s.timestamp DESC;
    `;
    const [result] = await connection.execute(query, [id, startDate, endDate]);
    await connection.end();
    return result;
};

const getReportCount = async (id, startDate, endDate) => {
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
        s.userID = ?
        AND DATE(s.timestamp) BETWEEN ? AND ?
        AND DAYOFWEEK(s.timestamp) NOT IN (1, 7)  -- Exclude Saturday and Sunday
    GROUP BY 
        u.id, u.name, u.mapel
    ORDER BY 
        'Hadir' DESC;`
    const [result] = await connection.execute(query, [id, startDate, endDate]);
    await connection.end();
    return result;
}

module.exports = {
  getAbsent,
  getCountByType,
  getReportDate,
  getReportCount,
}
