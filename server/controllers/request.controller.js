const AccessRequest = require("../models/AccessRequest");

exports.createRequest = async (req, res) => {
  const { brideId } = req.body;

  await AccessRequest.create({
    groom: req.user.id,
    bride: brideId,
  });

  res.json({ message: "Access request sent to admin" });
};

exports.myRequests = async (req, res) => {
  const requests = await AccessRequest.find({ groom: req.user.id })
    .populate("bride", "name status");

  res.json(requests);
};
