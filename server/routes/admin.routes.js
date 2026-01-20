const express = require('express');
const adminController = require('../controllers/admin.controller'); // make sure you have this
const { getPendingUsers, approveUser, getAccessRequests, approveAccess, denyAccess } = require('../controllers/admin.controller');
const auth = require('../middleware/auth');
const role = require('../middleware/role');

const router = express.Router();

// Admin login
router.post("/login", adminController.login);

// Get pending users for approval
router.get('/pending', auth, role('admin'), getPendingUsers);

// Approve a user
router.put('/approve/:id', auth, role('admin'), approveUser);

// Get pending access requests
router.get('/access', auth, role('admin'), getAccessRequests);

// Approve a specific access request
router.put('/access-approve/:id', auth, role('admin'), approveAccess);

// Deny a specific access request
router.put('/deny-access/:id', auth, role('admin'), denyAccess);

module.exports = router;
