const express = require("express");
const projectController = require("../controller/projectController");

const router = express.Router();

router
  .route("/challenges/:challengeId/projects")
  .post(projectController.createProject);

router.route("/").get(projectController.getAllProjects);

router
  .route("/getProjectsByUserId/:userId")
  .get(projectController.getProjectsByUserId);

router
  .route("/:id")
  .get(projectController.getProjectById)
  .patch(projectController.updateProject)
  .delete(projectController.deleteProject);

router
  .route("/:id/updateMarkdown")
  .patch(projectController.updateProjectMarkdown);

router.route("/:id/like").patch(projectController.likeProject);
router.route("/:id/dislike").patch(projectController.dislikeProject);

router
  .route("/:id/comments")
  .get(projectController.getComments)
  .post(projectController.createComment);

router
  .route("/:id/comments/:commentId")
  .patch(projectController.updateComment)
  .delete(projectController.deleteComment);

router
  .route("/:id/comments/:commentId/like")
  .post(projectController.likeComment);
router
  .route("/:id/comments/:commentId/dislike")
  .post(projectController.dislikeComment);

router
  .route("/:id/comments/:commentId/reply")
  .post(projectController.createComment);

module.exports = router;
