const router = require("express").Router();
const userController = require("../controller/userController");
const notificationController = require("../controller/notificationController");

router.get("/", userController.getUsers);

router.get("/usernames", userController.getUsernames);

router
  .route("/username/:username")
  .get(userController.getUserByUsername)
  .patch(userController.updateMe);

router.route("/:id").get(userController.getUserById);

//Notification

router
  .route("/:username/notifications")
  .get(notificationController.getNotifications);

router.route("/:username/follow").post(userController.followUser);
router.route("/:username/unfollow").post(userController.unfollowUser);

router
  .route("/:userId/notifications/:id")
  .delete(notificationController.deleteNotification);

module.exports = router;
