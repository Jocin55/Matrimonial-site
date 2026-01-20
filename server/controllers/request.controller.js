const ProfileAccess = require("../models/ProfileAccess");
const User = require("../models/User");

exports.createRequest = async (req, res) => {
  try {
    const { targetUserId } = req.body;

    // check duplicate request
    const existingRequest = await ProfileAccess.findOne({
      requester: req.user.id,
      targetUser: targetUserId,
      approved: false,
    });

    if (existingRequest) {
      return res.status(400).json({ message: "Request already sent" });
    }

    await ProfileAccess.create({
      requester: req.user.id,
      targetUser: targetUserId,
    });

    res.status(200).json({ message: "Access request sent to admin" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.myRequests = async (req, res) => {
  try {
    const requests = await ProfileAccess.find({
      requester: req.user.id,
    })
      .populate("targetUser", "name age");

    res.status(200).json(requests);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
