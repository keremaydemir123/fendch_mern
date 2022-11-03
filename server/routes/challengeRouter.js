const express = require("express");
const {
  getAllChallenges,
  getChallenge,
  createChallenge,
} = require("../controller/challenge.js");

const router = express.Router();

router.route("/").get(getAllChallenges).post(createChallenge);

module.exports = router;
