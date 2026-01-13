const express = require('express');
const adminController = require('../controllers/admin.controller'); // make sure you have this
const { getPendingUsers, approveUser, getAccessRequests, approveAccess } = require('../controllers/admin.controller');
const auth = require('../middleware/auth');

const router = express.Router();

// Admin login
router.post("/login", adminController.login);

// Get pending users for approval
router.get('/pending', auth, getPendingUsers);

// Approve a user
router.put('/approve/:id', auth, approveUser);

// Get pending access requests
router.get('/access-requests', auth, getAccessRequests);

// Approve a specific access request
router.put('/access-approve/:id', auth, approveAccess);

module.exports = router;
