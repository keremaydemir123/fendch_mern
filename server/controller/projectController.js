const Project = require("../models/ProjectModel");
const Challenge = require("../models/ChallengeModel");
const asyncHandler = require("express-async-handler");

//! HANDLERS

// exports.createProject = async (req, res) => {
//   try {
//     const newProject = await Project.create(req.body);
//     res.status(201).json({
//       status: "success",
//       data: {
//         project: newProject,
//       },
//     });
//   } catch (err) {
//     res.status(400).json({
//       status: "fail",
//       message: err,
//     });
//   }
// };

exports.createProject = asyncHandler(async (req, res) => {
  console.log("body: ", req.body);
  console.log("params: ", req.params);

  if (
    !req.params.challengeId ||
    !req.body.git ||
    !req.body.description ||
    !req.body.userId
  ) {
    res.status(400).send("Error");
    throw new Error("Error");
  }

  const challenge = await Challenge.findOne({ id: req.params.challengeId });
  console.log("challenge:", challenge);

  if (!challenge) {
    res.status(400).send("Error");
    throw new Error("Error");
  }

  const project = await Project.create({
    challengeId: req.params.challengeId,
    git: req.body.git,
    description: req.body.description,
    userId: req.body.githubId,
  });

  challenge.projects.push(project);
  await challenge.save();

  if (project) {
    res.status(201).json({
      status: "success",
      data: {
        project,
      },
    });
  }

  console.log("project added: ", challenge);
});
