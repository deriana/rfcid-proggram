const express = require("express");
const router = express.Router();
const adminController = require('../controller/adminController');
const verifyToken = require("../middleware/verifyToken")

router.get('/admin', adminController.getAllAdmin);
router.get('/admin/:id', adminController.getAdminById);
router.post('/admin/register', adminController.insertAdmin);
router.post('/admin/login', adminController.loginAdmin);
router.put('/admin/edit/:id', adminController.editAdmin);
router.delete('/admin/delete/:id', adminController.deleteAdmin);
module.exports = router;
    