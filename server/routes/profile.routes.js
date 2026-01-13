const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { getProfiles, requestAccess } = require("../controllers/profile.controller");

router.get("/dashboard/profile", auth, getProfiles);
router.post("/request-access", auth, requestAccess);

module.exports = router;
