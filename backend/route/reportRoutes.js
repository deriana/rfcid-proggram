const express = require('express');
const router = express.Router();
const reportController = require('../controller/reportController');
const verifyToken = require('../middleware/verifyToken');

router.get('/laporan', reportController.getAllReport)
router.get('/laporan/terlambat', reportController.getLateScans);
router.get('/laporan/date', reportController.getReportByDateRange);
router.get('/laporan/guru/:id', reportController.getReportByTeacher); 
router.get('/laporan/tipe/:option', reportController.getReportByType);
router.get('/laporan/date', reportController.getReportByDateRangeAndTimeCondition);
router.get('/laporan/terlambat/guru/:id', reportController.getLateScansTeacher);
router.get('/laporan/date/guru/:id', reportController.getScansByTeacherDateRange)
router.get('/laporan/terlambat&absen', reportController.getReportForLateAndAbsentUsers)

module.exports = router;
