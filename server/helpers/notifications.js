// function sendNotification(userId, message) {}

const sendNotification = async (userId, message) => {
  const notification = await Notification.create({
    message: `${userId.username} ${message}`,
    sender: user.username,
    receiver: req.body.receiverUsername,
  });
};

("/users/:userId/getnotifications/");
