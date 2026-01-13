const User = require("../models/User");
const ProfileAccess = require("../models/ProfileAccess");

// GET profiles (minimal or full based on access)
exports.getProfiles = async (req, res) => {
  try {
    const currentUserId = req.user.id;

    const users = await User.find({
      _id: { $ne: currentUserId },
      approved: true,
    });

    const profiles = [];

    for (let user of users) {
      const access = await ProfileAccess.findOne({
        requester: currentUserId,
        targetUser: user._id,
        approved: true,
        expiresAt: { $gt: new Date() },
      });

      if (access) {
        // FULL PROFILE
        profiles.push({
          _id: user._id,
          name: user.name,
          age: user.age,
          city: user.city,
          photo: user.photo,
          email: user.email,
          phone: user.phone,
          bio: user.bio,
          fullAccess: true,
        });
      } else {
        // MINIMAL PROFILE
        profiles.push({
          _id: user._id,
          name: user.name,
          age: user.age,
          city: user.city,
          photo: user.photo,
          fullAccess: false,
        });
      }
    }

    res.json(profiles);
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
