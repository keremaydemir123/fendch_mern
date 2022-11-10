const Project = require("../models/ProjectModel");
const Challenge = require("../models/ChallengeModel");
const asyncHandler = require("express-async-handler");
const User = require("../models/UserModel");

exports.getAllProjects = asyncHandler(async (req, res) => {
  const projects = await Project.find();
  res.status(200).json(projects);
});

exports.getProjectsByUsername = asyncHandler(async (req, res) => {
  const user = await User.findOne({ username: req.params.username });

  res.status(200).json(user.projects);
});

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

  const user = await User.findOne({ githubId: req.body.userId });

  if (!challenge) {
    res.status(400).send("Error");
    throw new Error("Error");
  }

  const project = await Project.create({
    challenge,
    user,
    git: req.body.git,
    description: req.body.description,
    userId: req.body.githubId,
  });
  console.log('user :>> ', user); 
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
