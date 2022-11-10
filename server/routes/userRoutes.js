const router = require("express").Router();
const asyncHandler = require("express-async-handler");
const userController = require("../controller/userController");

router.get("/", userController.getUsers);

router
  .route("/:username")
  .get(userController.getUserByUsername)
  .patch(userController.updateMe);

module.exports = router;
