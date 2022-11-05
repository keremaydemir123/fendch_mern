const express = require("express");
const projectController = require("../controller/project");

const router = express.Router();

router
  .route("/top-10-projects")
  .get(projectController.aliasTopProjects, projectController.getAllProject);

router
  .route("/")
  .get(projectController.getAllProject)
  .post(
    projectController.increaseTotalSubmits,
    projectController.createProject
  );

router
  .route("/:id")
  .get(projectController.getProject)
  .patch(projectController.updateProject)
  .delete(projectController.deleteProject);

module.exports = router;
