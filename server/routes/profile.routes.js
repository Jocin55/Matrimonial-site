const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { getProfiles, getProfile, requestAccess } = require("../controllers/profile.controller");



router.get("/", auth, getProfiles);
router.get("/:id", auth, getProfile);
router.post("/request-access",auth,requestAccess);

module.exports = router;
