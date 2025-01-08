const express = require('express');
const router = express.Router();
const reportController = require('../controller/testController');

router.get('/laporan/terlambat', reportController.getLateScans);
router.get('/test', reportController.getallReport)

module.exports = router;
