const Admin = require('../models/Admin');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require("../models/User");
const AccessRequest = require("../models/AccessRequest");
const Session = require("../models/Session");

// Admin login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("email from req:",email);
    const admin = await Admin.findOne({ email });
    if (!admin) return res.status(400).json({ message: "Admin not found" });

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid password" });

    const token = jwt.sign({ id: admin._id, role: "admin" }, process.env.JWT_SECRET, { expiresIn: "1d" });
    res.json({ message: "Login successful", token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Get pending users
exports.getPendingUsers = async (req, res) => {
  const users = await User.find({ approved: false });
  res.json(users);
};

// Approve user
exports.approveUser = async (req, res) => {
  await User.findByIdAndUpdate(req.params.id, { approved: true });
  res.json({ message: "User approved successfully" });
};

// Get pending access requests
exports.getAccessRequests = async (req, res) => {
  const requests = await AccessRequest.find({ status: "pending" })
    .populate("groom", "name")
    .populate("bride", "name");

  res.json(requests);
};

// Approve access request
exports.approveAccess = async (req, res) => {
  const request = await AccessRequest.findById(req.params.id);
  request.status = "approved";
  request.expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours
  await request.save();

  await Session.create({
    viewer: request.groom,
    profileOwner: request.bride,
    expiresAt: request.expiresAt,
  });

  res.json({ message: "Access granted for 24 hours" });
};
