const Project = require("../models/ProjectModel");
const Challenge = require("../models/ChallengeModel");
const User = require("../models/UserModel");
const Comment = require("../models/CommentModel");
const sendNotification = require("../helpers/notifications.js");

const asyncHandler = require("express-async-handler");

//! error here
exports.getAllProjects = asyncHandler(async (req, res) => {
  //! returns 3 documents
  req.query.limit = "3";

  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 10;
  const skip = (page - 1) * limit;

  let techs;
  if (req.query.tech.includes(",")) techs = req.query.tech.split(",");
  else techs = [req.query.tech];

  let projects = await Project.find().populate("challenge").populate("user");

  projects = projects.filter((project) => {
    if (techs.includes("All")) return project;

    for (let i = 0; i < techs.length; i++) {
      if (project.challenge.tech.includes(techs[i])) {
        return project;
      }
    }
  });

  totalProjects = projects.length;

  projects = projects.slice(skip, skip + limit);

  res.status(200).json({
    totalProjects,
    projects,
    limit,
  });
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
  });

  res.status(200).json(newProject);
});

exports.createProject = asyncHandler(async (req, res) => {
  if (
    !req.params.challengeId ||
    !req.body.git ||
    !req.body.markdown ||
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
    markdown: req.body.markdown,
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

exports.updateProjectMarkdown = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id);

  if (!project) {
    res.status(404).send(`No project with id: ${id}`);
    throw new Error("Project not found");
  }

  const newProject = await Project.findByIdAndUpdate(
    req.params.id,
    { markdown: req.body.markdown },
    { new: true }
  );

  res.status(200).json(newProject);
});

exports.getProjectById = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id).populate("comments");

  if (project) {
    res.status(200).json(project);
  } else {
    res.status(404);
    throw new Error("Project not found");
  }
});

exports.deleteProject = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id);

  if (project) {
    await project.remove();
    res.json({ message: "Project removed" });
  } else {
    res.status(404);
    throw new Error("Project not found");
  }
});

exports.likeProject = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id);
  const projectUser = await User.findById(project.user);

  if (!project) {
    res.status(404).send(`No project with id: ${project._id}`);
    throw new Error("Project not found");
  }

  const userLiked = await User.findOne({
    _id: req.body.userId,
  });

  if (!project.likes.includes(userLiked._id)) {
    project.likes.push(userLiked._id);
    project.likeCount += 1;
    if (projectUser.username != userLiked.username) {
      await sendNotification({
        sender: userLiked.username,
        receiver: projectUser.username,
        message: `${userLiked.username} liked your project`,
      });
    }
  }

  await project.save();

  res.status(200).json(project.likes);
});

exports.dislikeProject = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id);

  if (!project) {
    res.status(404).send(`No project with id: ${project._id}`);
    throw new Error("Project not found");
  }

  const userDisliked = await User.findOne({
    _id: req.body.userId,
  });

  if (project.likes.includes(userDisliked._id)) {
    project.likes.remove(userDisliked._id);
    project.likeCount -= 1;
  }
  await project.save();

  res.status(200).json(project.likes);
});

exports.getComments = asyncHandler(async (req, res) => {
  const { comments } = await Challenge.findById(req.params.id)
    .populate("comments")
    .select("comments");

  res.status(200).json(comments);
});

exports.getCommentsByUserId = asyncHandler(async (req, res) => {
  const comments = await User.find();

  res.status(200).json(comments);
});

exports.createComment = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id);
  const user = await User.findById(req.body.userId);
  const projectUser = await User.findById(project.user);

  if (!req.body.message) {
    res.status(400).json("Please provide a message");
    throw new Error("Please provide a message");
  }

  if (!project) {
    res.status(400).json("Project not found");
    throw new Error("Project not found");
  }

  const comment = await Comment.create({
    username: user.username,
    message: req.body.message,
    parentId: req.body.parentId,
    avatar: user.avatar,
  });

  user.comments.push(comment._id);
  await user.save();
  project.comments.push(comment._id);
  await project.save();

  if (comment.username !== projectUser.username) {
    await sendNotification({
      message: `${user.username} commented on your project`,
      sender: user.username,
      receiver: projectUser.username,
      project: project._id,
    });
  }

  res.status(200).json(comment);
});

exports.updateComment = asyncHandler(async (req, res) => {
  const comment = await Comment.findById(req.params.commentId);

  if (!comment) {
    res.status(400).json("Comment not found");
    throw new Error("Comment not found");
  }

  if (req.body.message) {
    comment.message = req.body.message;
  }

  await comment.save();

  res.status(200).json(comment);
});

exports.deleteComment = asyncHandler(async (req, res) => {
  const comment = await Comment.findById(req.params.commentId);
  const childrenComments = await Comment.find({ parentId: comment._id });

  if (!comment) {
    res.status(400).json("Comment not found");
    throw new Error("Comment not found");
  }

  await comment.remove();
  // remove all children comments
  childrenComments.forEach(async (comment) => {
    await comment.remove();
  });

  res.status(200).json("Comment deleted");
});

exports.likeComment = asyncHandler(async (req, res) => {
  const comment = await Comment.findById(req.params.commentId);
  const project = await Project.findById(req.params.id);

  if (!comment) {
    res.status(404).send(`No comment with id: ${comment._id}`);
    throw new Error("Comment not found");
  }
  if (!project) {
    res.status(400).json("Challenge not found");
    throw new Error("Challenge not found");
  }

  const userLiked = await User.findOne({
    _id: req.body.userId,
  });

  if (comment.likes.includes(userLiked._id)) {
    comment.likes.remove(userLiked._id);
  } else {
    comment.likes.push(userLiked._id);
    if (comment.username !== userLiked.username) {
      await sendNotification({
        message: `${userLiked.username} has liked your "${comment.message}" comment`,
        sender: userLiked.username,
        receiver: comment.username,
      });
    }
  }
  await comment.save();

  res.status(200).json(comment);
});

exports.dislikeComment = asyncHandler(async (req, res) => {});
