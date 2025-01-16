const express = require('express');
const router = express.Router();
const reportController = require('../controller/reportController');

router.get('/laporan', reportController.getAllReport)
router.get('/laporan/date', reportController.getReportByDateRange);
router.get('/laporan/terlambat/guru', reportController.getLateScansTeacher);
router.get('/laporan/date/guru/:id', reportController.getScansByTeacherDateRange)
router.get('/laporan/recap', reportController.getRecapAbsen)

module.exports = router;
