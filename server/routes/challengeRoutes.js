const express = require("express");
const challengeController = require("../controller/challengeController.js");
const commentController = require("../controller/commentController.js");

const router = express.Router();

//! Secret Challenges (upcoming)
//! Active Challenges
//! Old Challenges

//! on GET request, push current challenges to all challenges, delete current challenges, filter secret challenges and push to current challenges
//! get Current Challenges

// Secret challenges
router.route("/secret").get(challengeController.getSecretChallenges);

// Active challenges
router.route("/active").get(challengeController.getActiveChallenges);

// Old challenges
router.route("/old").get(challengeController.getOldChallenges);

// Actions for all challenges
router.route("/").post(challengeController.createChallenge);
router
  .route("/:id")
  .get(challengeController.getChallenge)
  .patch(challengeController.updateChallenge)
  .delete(challengeController.deleteChallenge);

router.route("/:id/comments").get(commentController.getComments).post(commentController.createComment)

router.route("/:id/comments/:commentId/toggleLike")

module.exports = router;
