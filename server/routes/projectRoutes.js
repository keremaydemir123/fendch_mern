const express = require("express");
const projectController = require("../controller/projectController");

const router = express.Router();

router
  .route("/challenges/:challengeId/projects")
  .post(projectController.createProject);

router.route("/").get(projectController.getAllProjects);
router
  .route("/getProjectByUserId/:userId")
  .get(projectController.getProjectsByUserId);

router
  .route("/:id")
  .get(projectController.getProjectById)
  .patch(projectController.updateProject);

// router
//   .route("/:id")
//   .get(projectController.getProject)
//   .patch(projectController.updateProject)
//   .delete(projectController.deleteProject);

module.exports = router;
