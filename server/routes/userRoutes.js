const router = require("express").Router();
const asyncHandler = require("express-async-handler");
const userController = require("../controller/userController");

router.get("/", userController.getUsers);

module.exports = router;
