const express = require("express");
const router = express.Router();
const mobileController = require('../controller/mobileController');

router.get('/mobile/:id', mobileController.getAbsent);
router.post('/mobile/count/:id', mobileController.getCountByType);
router.get('/mobile/report/:id', mobileController.getReportDate);
router.get('/mobile/recap/:id', mobileController.getReportCount);

module.exports = router;