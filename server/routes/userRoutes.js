const router = require("express").Router();
const asyncHandler = require("express-async-handler");
const userController = require("../controller/userController");
const notificationController = require("../controller/notificationController");

router.get("/", userController.getUsers);

router
  .route("/username/:username")
  .get(userController.getUserByUsername)
  .patch(userController.updateMe);

router.route("/:id").get(userController.getUserById);

//Notification
router
  .route("/:userId/notifications")
  .get(notificationController.getNotifications)
  .post(notificationController.createLikeNotification);
  
router
  .route("/:userId/notifications/:notificationId")
  .delete(notificationController.deleteNotification);

module.exports = router;
