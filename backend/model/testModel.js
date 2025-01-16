const connectDB = require("../config/db");

const getLateScans = async () => {
  const connection = await connectDB();

  const [rows] = await connection.execute(
    `SELECT 
          users.name,
          users.mapel,
          scans.timestamp AS waktu_masuk
      FROM 
          scans
      JOIN 
          users ON scans.userID = users.id
      WHERE 
          scans.type = 'masuk' 
          AND TIME(scans.timestamp) > '08:00:00'
      ORDER BY 
          scans.timestamp`
  );

  await connection.end(); // Tutup koneksi setelah query selesai
  return rows; // Mengembalikan hasil query
};

const getAllReport = async () => {
    const connection = await connectDB();
  
    const [rows] = await connection.execute(
      `SELECT 
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
  ORDER BY 
      s.timestamp DESC;
    `
    );
  
    await connection.end();
    return rows;
  };

module.exports = { 
    getLateScans,
    getAllReport
}