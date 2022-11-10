const asyncHandler = require("express-async-handler");

const User = require("../models/UserModel.js");
const Notification = require("../models/NotificationModel.js");

exports.getUsers = asyncHandler(async (req, res) => {
  const users = await User.find();

  res.status(200).json(users);
});

exports.getUserByUsername = asyncHandler(async (req, res) => {
  const user = await User.findOne({ username: req.params.username });

  if (user) {
    res.status(200).json(user);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

exports.updateMe = asyncHandler(async (req, res) => {
  const user = await User.findOne({ username: req.params.username });

  if (user) {
    console.log(user);
    console.log(req.body);
    user.bio = req.body.data.bio || user.bio;

    const updatedUser = await user.save();

    res.status(200).json(updatedUser);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

exports.getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    res.status(200).json(user);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

exports.getNotifications = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.userId);

  res.status(200).json(user.notifications);
});

exports.createNotification = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.userId);

  console.log("user", user);

  const notification = await Notification.create({
    message: req.body.message,
  });

  await notification.save();

  user.notifications.push(notification);

  await user.save();

  res.status(200).json(notification);
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
