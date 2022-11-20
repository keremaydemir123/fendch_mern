const Project = require("../models/ProjectModel");
const Challenge = require("../models/ChallengeModel");
const asyncHandler = require("express-async-handler");
const User = require("../models/UserModel");

exports.getAllProjects = asyncHandler(async (req, res) => {
  const projects = await Project.find()
    .populate("challenge", { objective: 1, week: 1, tech: 1 })
    .populate("user", { username: 1 });
  res.status(200).json(projects);
});

exports.getProjectsByUserId = asyncHandler(async (req, res) => {
  const projects = await Project.find({ userId: req.params.userId });

  res.status(200).json(projects);
});

exports.updateProject = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id);

  if (!project) {
    res.status(404).send(`No project with id: ${id}`);
    throw new Error("Project not found");
  }

  const newProject = await Project.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  })

  res.status(200).json(newProject);
});

exports.createProject = asyncHandler(async (req, res) => {
  if (
    !req.params.challengeId ||
    !req.body.git ||
    !req.body.description ||
    !req.body.userId
  ) {
    res.status(400).send("Error");
    throw new Error("Error");
  }

  const challenge = await Challenge.findById(req.params.challengeId);
  const user = await User.findById(req.body.userId);

  const projectExist = await Project.findOne({
    challenge: challenge,
    user: user,
  });

  if (projectExist) {
    res
      .status(400)
      .send("You already have submitted a project to this challenge");
    throw new Error("You already have submitted a project to this challenge");
  }

  const project = await Project.create({
    challenge: challenge,
    git: req.body.git,
    description: req.body.description,
    user: user,
  });

  user.projects.push(project._id);
  await user.save();

  challenge.projects.push(project._id);
  await challenge.save();

  if (project) {
    res.status(201).json({
      project,
    });
  }
});

exports.getProjectById = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id);

  if (project) {
    res.status(200).json(project);
  } else {
    res.status(404);
    throw new Error("Project not found");
  }
});
