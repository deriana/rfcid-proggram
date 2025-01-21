const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");
const verifyToken = require("../middleware/verifyToken");
const upload = require("../middleware/multerXlsx");

router.get("/user", userController.getUsers);
router.post("/user/register", userController.registerUser);
router.put("/user/:id", userController.deleteUser);
router.put("/user/:id", userController.editUser);
router.get("/user/:id", userController.getUserByID);
router.get("/checkabsent", userController.checkUserNotAbsent);
router.post("/upload-xlsx", upload.single("file"), userController.uploadXlsx);
router.get("/user/auth/:id", userController.getUsername);
router.put("/user/password/:id", userController.editPassword);
router.post("/user/login", userController.loginUser);

module.exports = router;
