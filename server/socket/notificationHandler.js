function handleNotification(data) {
  switch (data.type) {
    case "likeNotification":
      likeNotification(data);
      break;
    default:
      break;
  }
}

function likeNotification(data) {
  // Do something with the data received from the client
  console.log("data.clientId: ", data.socketId);
  // Send a message back to the client
  io.to(data.socketId).emit("receive_notification", "Hello from the server");
}

module.exports = {
  handleNotification,
};
