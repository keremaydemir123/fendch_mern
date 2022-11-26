const Notification = require("../models/NotificationModel.js");

const sendNotification = async ({
  sender,
  receiver,
  message,
  project,
  comment,
  challenge,
}) => {
  await Notification.create({
    message,
    sender,
    receiver,
    project,
    comment,
    challenge,
  });
};

module.exports = sendNotification;
