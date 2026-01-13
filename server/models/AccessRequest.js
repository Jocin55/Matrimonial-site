const mongoose = require("mongoose");

const accessRequestSchema = new mongoose.Schema(
  {
    groom: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    bride: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
    expiresAt: Date,
  },
  { timestamps: true }
);

module.exports = mongoose.model("AccessRequest", accessRequestSchema);
