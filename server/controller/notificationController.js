const Notification = require("../models/NotificationModel");
const asyncHandler = require("express-async-handler");

exports.getNotifications = asyncHandler(async (req, res) => {
  const notifications = await Notification.find({
    receiver: req.params.username,
  }).sort({ createdAt: -1 });

  res.status(200).json(notifications);
});

exports.deleteNotification = asyncHandler(async (req, res) => {
  const notification = await Notification.findById(req.params.id);

  if (notification) {
    await notification.remove();
    res.json({ message: "Notification removed" });
  } else {
    res.status(404);
    throw new Error("Notification not found");
  }
});
