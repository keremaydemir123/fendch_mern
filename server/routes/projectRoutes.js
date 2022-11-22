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

router.route("/:id/toggleLike")
  .patch(projectController.likeProject);

router
  .route("/:id")
  .get(projectController.getProjectById)
  .patch(projectController.updateProject)
  .delete(projectController.deleteProject);

router.route("/:id/comments")
  .get(projectController.getComments)
  .post(projectController.createComment);

router.route("/:id/comments/:commentId/toggleLike")
  .post(projectController.likeComment)

module.exports = router;
