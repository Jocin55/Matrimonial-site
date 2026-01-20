const User = require("../models/User");
const Session = require("../models/Session");
const ProfileAccess = require("../models/ProfileAccess");

// GET profiles list
exports.getProfiles = async (req, res) => {
  try {
    const currentUserId = req.user.id;
    const currentUser = await User.findById(currentUserId);

    if (!currentUser) {
      return res.status(404).json({ message: "User not found" });
    }

    const oppositeGender =
      currentUser.gender === "male" ? "female" : "male";

    const users = await User.find({
      _id: { $ne: currentUserId },
      approved: true,
      gender: oppositeGender,
    });

    const profiles = [];

    for (let user of users) {
      const session = await Session.findOne({
        viewer: currentUserId,
        profileOwner: user._id,
        expiresAt: { $gt: new Date() },
      });

      profiles.push({
        _id: user._id,
        name: user.name,
        age: user.age,
        address: user.address,
        photo: user.photo || "https://via.placeholder.com/150",
        fullAccess: !!session,
      });
    }

    res.json(profiles);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// GET single profile
exports.getProfile = async (req, res) => {
  try {
    const currentUserId = req.user.id;
    const profileId = req.params.id;

    const user = await User.findById(profileId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const access = await ProfileAccess.findOne({
      requester: currentUserId,
      targetUser: profileId,
      approved: true,
      expiresAt: { $gt: new Date() },
    });

    if (access) {
      // FULL PROFILE
      res.json({
        _id: user._id,
        name: user.name,
        age: user.age,
        address: user.address,
        photo: user.photo || 'https://via.placeholder.com/150',
        email: user.email,
        phone: user.phone,
        work: user.work,
        salary: user.salary,
        married: user.married,
        horoscope: user.horoscope,
        gender: user.gender,
        religion: user.religion,
        fullAccess: true,
      });
    } else {
      // MINIMAL PROFILE
      res.json({
        _id: user._id,
        name: user.name,
        age: user.age,
        address: user.address,
        photo: user.photo || 'https://via.placeholder.com/150',
        fullAccess: false,
      });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// REQUEST ACCESS
exports.requestAccess = async (req, res) => {
  try {
    const { targetUserId } = req.body;

    const existing = await ProfileAccess.findOne({
      requester: req.user.id,
      targetUser: targetUserId,
    });

    if (existing) {
      return res.status(400).json({ message: "Access already requested" });
    }

    await ProfileAccess.create({
      requester: req.user.id,
      targetUser: targetUserId,
    });

    res.json({ message: "Access request sent" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
