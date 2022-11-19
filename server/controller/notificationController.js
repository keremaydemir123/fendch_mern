const Notification = require("../models/NotificationModel.js");
const User = require("../models/UserModel.js");

const asyncHandler = require("express-async-handler");

exports.getNotifications = asyncHandler(async (req, res) => {
  const notifications = await User.findById(req.params.userId)
    .populate("notifications")
    .select("notifications");
  res.status(200).json(notifications.notifications);
});

exports.createFollowNotification = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.userId);

  console.log("req.body", req.body);

  const notification = await Notification.create({
    message: `${user.username} has followed you`,
    sender: user.username,
    receiver: req.body.receiverUsername,
  });

  const receiverUser = await User.findOne({
    username: req.body.receiverUsername,
  });

  console.log(receiverUser);

  receiverUser.notifications.push(notification);
  await receiverUser.save();

  res.status(200).json({
    message: notification.message,
    sender: notification.sender,
    receiver: notification.receiver,
  });
});

exports.deleteNotification = asyncHandler(async (req, res) => {
  const user = await User.findOne({ _id: req.params.userId });

  const notifications = await user.notifications;

  if (!notifications) {
    res.status(400);
    throw new Error("Notification not found");
  }
  const userNotifications = notifications.filter(
    (string) => !string.toString().includes(req.params.notificationId)
  );

  user.notifications = userNotifications;
  await user.save();

  await Notification.findByIdAndDelete(req.params.notificationId);

  res
    .status(204)
    .json({ message: req.params.notificationId + "of Notification deleted" });
});