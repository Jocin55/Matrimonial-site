const User = require("../models/User");
const Session = require("../models/Session");

exports.getMyProfile = async (req, res) => {
  const user = await User.findById(req.user.id).select("-password");
  res.json(user);
};

exports.getUserProfile = async (req, res) => {
  const { id } = req.params;

  const session = await Session.findOne({
    viewer: req.user.id,
    profileOwner: id,
    expiresAt: { $gt: new Date() },
  });

  if (!session) {
    const limited = await User.findById(id).select("name age");
    return res.json({ limited: true, data: limited });
  }

  const full = await User.findById(id).select("-password");
  res.json({ limited: false, data: full });
};
