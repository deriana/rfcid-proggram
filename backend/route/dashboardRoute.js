const express = require('express');
const router = express.Router();
const dashboardController = require("../controller/dashboardController");

router.post('/dashboard', dashboardController.getDashboardController);
router.get('/dashboard/hadir', dashboardController.getDashboardHadirController)
router.get('/dashboard/full/hadir', dashboardController.getDashboardFullHadirController)
router.get('/dashboard/full/terlambat', dashboardController.getDashboardFullTerlambatController)

module.exports = router;
