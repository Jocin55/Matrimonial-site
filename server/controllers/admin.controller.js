const Admin = require('../models/Admin');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require("../models/User");
const ProfileAccess = require("../models/ProfileAccess");
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
  try {
    const requests = await ProfileAccess.find({ approved: false })
      .populate("requester", "name email")
      .populate("targetUser", "name email");

    res.json(requests);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Approve access request
exports.approveAccess = async (req, res) => {
  try {
    const request = await ProfileAccess.findById(req.params.id);

    if (!request) {
      return res.status(404).json({ message: "Request not found" });
    }

    request.approved = true;
    request.expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);
    await request.save();

    await Session.create({
      viewer: request.requester,
      profileOwner: request.targetUser,
      expiresAt: request.expiresAt,
    });

    res.json({ message: "Access approved for 24 hours" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};


// Deny access request
exports.denyAccess = async (req, res) => {
  try {
    await ProfileAccess.findByIdAndDelete(req.params.id);
    res.json({ message: "Access request denied" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
