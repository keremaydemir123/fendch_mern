const Project = require("../models/ProjectModel");
const Challenge = require("../models/ChallengeModel");
const asyncHandler = require("express-async-handler");
const User = require("../models/UserModel");

exports.getAllProjects = asyncHandler(async (req, res) => {
  const projects = await Project.find();
  res.status(200).json(projects);
});

exports.getProjectsByUserId = asyncHandler(async (req, res) => {
  const projects = await Project.find({ userId: req.params.userId });

  res.status(200).json(projects);
});

exports.updateProject = asyncHandler(async (req, res) => {
  
})

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

  const projectExist = await Project.findOne({challengeId: req.params.challengeId, userId: req.body.userId})
  console.log('projectExist :>> ', projectExist);
  if (projectExist){
    res.status(400).send("You already have submitted a project to this challenge");
    throw new Error("You already have submitted a project to this challenge");
  }

  const challenge = await Challenge.findOne({ id: req.params.challengeId });
  const user = await User.findOne({ _id: req.body.userId });

  if (!challenge) {
    res.status(400).send("Error");
    throw new Error("Error");
  }

  const project = await Project.create({
    challengeId: challenge._id,
    git: req.body.git,
    description: req.body.description,
    userId: user._id,
  });

  user.projects.push(project);
  await user.save();

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

exports.getProjectById = asyncHandler(async (req, res) => {
  console.log("req.params: ", req.params);
  const project = await Project.findById(req.params.projectId);

  if (project) {
    res.status(200).json(project);
  } else {
    res.status(404);
    throw new Error("Project not found");
  }
});
