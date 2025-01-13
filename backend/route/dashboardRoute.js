const express = require('express');
const router = express.Router();
const dashboardController = require("../controller/dashboardController");

router.get("/dashboard/teachers-present-today", dashboardController.totalTeachersPresentToday);
router.get("/dashboard/teachers-absent-today", dashboardController.totalTeachersAbsentToday);
router.get("/dashboard/teachers-sick-leave-today", dashboardController.totalTeachersOnSickLeaveToday);
router.get("/dashboard/teachers-present-per-month", dashboardController.teachersPresentPerMonth);
router.get("/dashboard/teachers-arrived-late-today", dashboardController.totalTeachersArrivedLateToday);
router.get("/dashboard/attendance-per-teacher-last-30-days", dashboardController.totalAttendancePerTeacherLast30Days);
router.get("/dashboard/teachers-absent-last-30-days", dashboardController.teachersAbsentLast30Days);
router.get("/dashboard/teachers-present-per-week", dashboardController.teachersPresentPerWeek);
router.get("/dashboard/average-monthly-attendance", dashboardController.averageMonthlyAttendance);

module.exports = router;
