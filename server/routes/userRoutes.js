const router = require("express").Router();
const asyncHandler = require("express-async-handler");
const userController = require("../controller/userController");

router.get("/", userController.getUsers);

router
  .route("/username/:username")
  .get(userController.getUserByUsername)
  .patch(userController.updateMe);

router.route("/:id").get(userController.getUserById);

router.route("/:userId/notifications").get(userController.getNotifications).post(userController.createNotification)
router.route("/:userId/notifications/:id").delete(userController.deleteNotification);

module.exports = router;
