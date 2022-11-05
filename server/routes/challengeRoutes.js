const express = require("express");
const challengeController = require("../controller/challenge.js");

const router = express.Router();

//! Current Challenges
//! All Challenges
//! Secrent Challenges

//! on GET request, push current challenges to all challenges, delete current challenges, filter secret challenges and push to current challenges
//! get Current Challenges

router
  .route("/")
  .get(challengeController.getAllChallenges)
  .post(challengeController.createChallenge);

router.route("/:id").get(challengeController.getChallenge);

module.exports = router;
