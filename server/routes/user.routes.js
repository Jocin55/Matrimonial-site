const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth");
const userController = require("../controllers/user.controller");

router.get("/me", authMiddleware, userController.getMyProfile);
router.get("/profile/:id", authMiddleware, userController.getUserProfile);

module.exports = router;
