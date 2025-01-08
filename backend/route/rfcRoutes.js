const express = require('express');
const router = express.Router();
const rfcController = require('../controller/rfcController');  

router.post('/register', rfcController.registerUser);
router.post('/login', rfcController.loginUser);
router.get('/users', rfcController.getUsers);
router.post('/users/sakit', rfcController.UsersGetHurt)
router.post('/users/ijin', rfcController.UsersGetPermission)

module.exports = router;
