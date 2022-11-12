const mongoose = require("mongoose");

const NotificationSchema = mongoose.Schema(
  {
    message: {
      type: String,
      required: true,
    },
    challenge: { type: mongoose.Schema.Types.ObjectId, ref: "Challenge" },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    project: { type: mongoose.Schema.Types.ObjectId, ref: "Notification" },
  },
  { timestamp: true }
);

const Notification = mongoose.model("Notification", NotificationSchema);

module.exports = Notification;
