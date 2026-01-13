const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth");
const requestController = require("../controllers/request.controller");

router.post("/", authMiddleware, requestController.createRequest);
router.get("/my", authMiddleware, requestController.myRequests);

module.exports = router;
