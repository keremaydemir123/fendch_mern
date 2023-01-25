const express = require("express");
const challengeController = require("../controller/challengeController.js");

const router = express.Router();

// Secret challenges
router.route("/secret").get(challengeController.getSecretChallenges);

// Active challenges
router.route("/active").get(challengeController.getActiveChallenges);

// Old challenges
router.route("/old").get(challengeController.getOldChallenges);
router.route("/old/names").get(challengeController.getOldChallengesNames);

// Actions for all challenges
router.route("/").post(challengeController.createChallenge);

router
  .route("/:id")
  .get(challengeController.getChallenge)
  .patch(challengeController.updateChallenge)
  .delete(challengeController.deleteChallenge);

router
  .route("/:id/comments")
  .get(challengeController.getComments)
  .post(challengeController.createComment);

router
  .route("/:id/comments/:commentId")
  .patch(challengeController.updateComment)
  .delete(challengeController.deleteComment);

router
  .route("/:id/comments/:commentId/like")
  .post(challengeController.likeComment);
router
  .route("/:id/comments/:commentId/dislike")
  .post(challengeController.dislikeComment);

router
  .route("/:id/comments/:commentId/reply")
  .post(challengeController.createComment);

module.exports = router;
