const express = require("express");
const projectController = require("../controller/projectController");

const router = express.Router();

router.route("/:challengeId/projects").post(projectController.createProject);

// router
//   .route("/:id")
//   .get(projectController.getProject)
//   .patch(projectController.updateProject)
//   .delete(projectController.deleteProject);

module.exports = router;
