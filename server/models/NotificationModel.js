const mongoose = require("mongoose");

const notificationSchema = mongoose.Schema(
  {
    message: {
      type: String,
      required: true,
    },
    challengeId: { type: mongoose.Schema.Types.ObjectId, ref: "Challenge" },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    projectId: { type: mongoose.Schema.Types.ObjectId, ref: "Notification" },
  },
  { timestamp: true }
);

const Notification = mongoose.model("Notification", notificationSchema);

module.exports = Notification;
