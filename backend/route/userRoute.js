const express = require("express");
const router = express.Router();
const userController = require('../controller/userController');
const verifyToken = require("../middleware/verifyToken");

router.get('/user', userController.getUsers);
router.post('/user/register', userController.registerUser);
router.delete('/user/:id', userController.deleteUser);
router.put('/user/:id', userController.editUser);
router.get('/user/:id', userController.getUserByID);

module.exports = router;
