const mongoose = require("mongoose");

const notificationSchema = mongoose.Schema(
  {
    message: {
      type: String,
      required: true,
    },
    challenge: { type: mongoose.Schema.Types.ObjectId, ref: "Challenge" },
    sender: String,
    receiver: String,
    project: { type: mongoose.Schema.Types.ObjectId, ref: "Notification" },
  },
  { timestamp: true }
);

const Notification = mongoose.model("Notification", notificationSchema);

module.exports = Notification;
