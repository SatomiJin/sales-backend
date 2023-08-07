const express = require("express");
const router = express.Router();
const userController = require("../controllers/UserController");
const { authMiddleware, authUserMiddleware } = require("../middleware/authMiddleware");

router.post("/sign-up", userController.createUser);
router.post("/sign-in", userController.loginUser);
router.post("/log-out", userController.logOutUser);
router.put("/update-user/:id", userController.updateUser);
router.delete("/delete-user/:id", userController.deleteUser);
router.delete("/delete-multiple-user", userController.deleteMultiple);
router.get("/get-all-users", authMiddleware, userController.getAllUsers);
router.get("/get-detail-user/:id", userController.getDetailsUser);
router.post("/refresh-token", userController.refreshToken);

module.exports = router;
