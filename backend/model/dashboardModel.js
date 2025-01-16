const connectDB = require("../config/db");

const totalTeachersPresentToday = async () => {
  const connection = await connectDB();
  const [rows] = await connection.execute(
    `SELECT COUNT(DISTINCT userID) AS total_teachers_present
     FROM scans
     WHERE type = 'masuk' 
       AND timestamp >= CURDATE() 
       AND timestamp < CURDATE() + INTERVAL 1 DAY;`
  );
  await connection.end();
  return rows[0];
};

const totalTeachersAbsentToday = async () => {
  const connection = await connectDB();
  const [rows] = await connection.execute(
    `SELECT COUNT(DISTINCT u.id) AS total_teachers_absent
       FROM users u
       LEFT JOIN scans s ON u.id = s.userID AND s.timestamp >= CURDATE() AND s.timestamp < CURDATE() + INTERVAL 1 DAY
       WHERE s.userID IS NULL;`
  );
  await connection.end();
  return rows[0];
};

const totalTeachersOnSickLeaveToday = async () => {
  const connection = await connectDB();
  const [rows] = await connection.execute(
    `SELECT COUNT(DISTINCT userID) AS total_teachers_sick_leave
     FROM scans
     WHERE type = 'sakit' 
       AND timestamp >= CURDATE() 
       AND timestamp < CURDATE() + INTERVAL 1 DAY;`
  );
  await connection.end();
  return rows[0];
};

const totalTeachersAbsentInDateRange = async () => {
  const connection = await connectDB();
  const [rows] = await connection.execute(
    `SELECT COUNT(DISTINCT userID) AS total_teachers_absent
     FROM users u
     LEFT JOIN scans s ON u.id = s.userID 
       AND s.timestamp >= ? 
       AND s.timestamp <= ?
     WHERE s.userID IS NULL;`
  );
  await connection.end();
  return rows[0];
};

const teachersPresentPerMonth = async () => {
  const connection = await connectDB();
  const [rows] = await connection.execute(
    `SELECT MONTH(timestamp) AS month,
              COUNT(DISTINCT userID) AS total_present
       FROM scans
       WHERE type = 'masuk'
       GROUP BY MONTH(timestamp)
       ORDER BY month;`
  );
  await connection.end();
  return rows;
};

const totalTeachersArrivedLateToday = async () => {
  const connection = await connectDB();
  const [rows] = await connection.execute(
    `SELECT COUNT(DISTINCT userID) AS total_teachers_late
FROM scans
WHERE type = 'masuk'
  AND timestamp > CONCAT(CURDATE(), ' 08:00:00')
  AND timestamp <= CURDATE() + INTERVAL 1 DAY;
`
  );
  await connection.end();
  return rows[0];
};

const totalAttendancePerTeacherLast30Days = async () => {
  const connection = await connectDB();
  const [rows] = await connection.execute(
    `SELECT userID, COUNT(*) AS total_present
       FROM scans
       WHERE type = 'masuk' 
         AND timestamp >= CURDATE() - INTERVAL 30 DAY
       GROUP BY userID
       ORDER BY total_present DESC;`
  );
  await connection.end();
  return rows;
};

const teachersAbsentLast30Days = async () => {
  const connection = await connectDB();
  const [rows] = await connection.execute(
    `SELECT u.id, u.name
       FROM users u
       LEFT JOIN scans s ON u.id = s.userID 
           AND s.timestamp >= CURDATE() - INTERVAL 30 DAY
      `
  );
  await connection.end();
  return rows;
};

const teachersPresentPerWeek = async () => {
  const connection = await connectDB();
  const [rows] = await connection.execute(
    `SELECT YEAR(timestamp) AS year, 
              WEEK(timestamp) AS week,
              COUNT(DISTINCT userID) AS total_present
       FROM scans
       WHERE type = 'masuk'
       GROUP BY YEAR(timestamp), WEEK(timestamp)
       ORDER BY year, week;`
  );
  await connection.end();
  return rows;
};

const averageMonthlyAttendance = async () => {
  const connection = await connectDB();
  const [rows] = await connection.execute(
    `SELECT AVG(monthly_present) AS average_monthly_attendance
       FROM (
           SELECT MONTH(timestamp) AS month, 
                  COUNT(DISTINCT userID) AS monthly_present
           FROM scans
           WHERE type = 'masuk'
           GROUP BY MONTH(timestamp)
       ) AS monthly_attendance;`
  );
  await connection.end();
  return rows[0];
};

module.exports = {
  averageMonthlyAttendance,
  teachersAbsentLast30Days,
  teachersPresentPerMonth,
  teachersPresentPerWeek,
  totalAttendancePerTeacherLast30Days,
  totalTeachersAbsentInDateRange,
  totalTeachersAbsentToday,
  totalTeachersArrivedLateToday,
  totalTeachersOnSickLeaveToday,
  totalTeachersPresentToday,
};
