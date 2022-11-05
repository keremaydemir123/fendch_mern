const express = require("express");
const {
  getAllChallenges,
  getChallenge,
  createChallenge,
} = require("../controller/challenge.js");

const router = express.Router();

router.route("/").get(getAllChallenges).post(createChallenge);

router.route("/:id").get(getChallenge);

module.exports = router;
