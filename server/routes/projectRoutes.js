const express = require("express");
const projectController = require("../controller/projectController");

const router = express.Router();

router
  .route("/challenges/:challengeId/projects")
  .post(projectController.createProject);

router.route("/").get(projectController.getAllProjects);
router
  .route("/getProjectByUsername/:username")
  .get(projectController.getProjectsByUsername);

router
  .route("/getProjectById/:projectId")
  .get(projectController.getProjectById);

// router
//   .route("/:id")
//   .get(projectController.getProject)
//   .patch(projectController.updateProject)
//   .delete(projectController.deleteProject);

module.exports = router;
