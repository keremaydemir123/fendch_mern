const asyncHandler = require("express-async-handler");
const APIFeatures = require("../utils/apiFeatures");

const Challenge = require("../models/ChallengeModel.js");
const User = require("../models/UserModel.js");
const Comment = require("../models/CommentModel.js");
const Notification = require("../models/NotificationModel.js");
const sendNotification = require("../helpers/notifications");

// Active Challenges
// @route GET /api/active/
// @access public
exports.getActiveChallenges = asyncHandler(async (req, res) => {
  const challenge = await Challenge.find().select("-projects -__v");

  filteredChallenge = challenge.filter(
    (secretChallenge) =>
      secretChallenge.isSecret != true && secretChallenge.isActive == true
  );

  res.status(200).json(filteredChallenge);
});

// get all available challenges including active and old ones
// @route GET /api/
// @access public
exports.getOldChallenges = asyncHandler(async (req, res) => {
  const features = new APIFeatures(
    Challenge.find().select("-comments -projects"),
    req.query
  )
    .filter()
    .sort()
    .limitFields()
    .paginate();
  const challenges = await features.query;

  filteredChallenge = challenges.filter(
    (secretChallenge) =>
      secretChallenge.isSecret != true && secretChallenge.isActive != true
  );

  res.status(200).json(filteredChallenge);
});

// Get Challenge
// @route GET /api/active/
// @access public
exports.getChallenge = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const challenge = await Challenge.findById(id).select(
    "-__v -comments -projects -totalSubmits -isSecret -isActive"
  );

  res.status(200).json(challenge);
});

// Create a new challenge
// @route POST /api/
// @access private
exports.createChallenge = asyncHandler(async (req, res) => {
  console.log(req.body);
  if (
    !req.body.tech ||
    !req.body.objective ||
    !req.body.tasksMd ||
    !req.body.tasksVideo ||
    !req.body.solutionMd ||
    !req.body.solutionVideo ||
    !req.body.week ||
    !req.body.thumbnail ||
    !req.body.description ||
    !req.body.liveExample
  ) {
    res
      .status(400)
      .send(
        "Don't forget to enter a tech, objective, description, tasksMd, soltionMd, tasksVideo, solutionVideo, liveExample, thumbnail, week"
      );
    throw new Error("Insufficent data");
  }

  const objectiveExist = await Challenge.find({
    objective: req.body.objective,
    tech: req.body.tech,
  });
  if (objectiveExist.length > 0) {
    res
      .status(400)
      .send(
        "Same challenge with same objective and tech stack is already exist"
      );
    throw new Error(
      "Same challenge with same objective and tech stack is already exist"
    );
  }

  const challenge = await Challenge.create(req.body);

  res.status(200).json(challenge);
});

//Only admins allowed
exports.getSecretChallenges = asyncHandler(async (req, res) => {
  //check if user name equals to admins' username function will be added here
  const challenge = await Challenge.find();

  filteredChallenge = challenge.filter(
    (secretChallenge) => secretChallenge.isSecret == true
  );

  res.status(200).json(filteredChallenge);
});

//update challenge status from admin panel. If challenge isActive => show in client else {false}

// @route DELETE /api/challenges/:id
// @access private
exports.deleteChallenge = asyncHandler(async (req, res) => {
  const challenge = await Challenge.findById(req.params.id);

  if (!challenge) {
    res.status(400);
    throw new Error("Challenge not found");
  }
  await challenge.remove();
  res
    .status(200)
    .json({ id: req.params.id, message: "Challenge deleted successfully" });
});

// @route PATCH /api/challenges/:id
// @access private
exports.updateChallenge = asyncHandler(async (req, res) => {
  const updatedChallenge = await Challenge.findByIdAndUpdate(
    req.params.id,
    req.body
  );

  if (!updatedChallenge) {
    res.status(400);
    throw new Error("Challenge not found");
  }
  res.status(200).json(updatedChallenge);
});

exports.getComments = asyncHandler(async (req, res) => {
  const { comments } = await Challenge.findById(req.params.id)
    .sort({ createdAt: -1 })
    .populate("comments")
    .select("comments");

  res.status(200).json(comments);
});

exports.getCommentsByUserId = asyncHandler(async (req, res) => {
  const comments = await User.find();

  res.status(200).json(comments);
});

exports.createComment = asyncHandler(async (req, res, next) => {
  const challenge = await Challenge.findById(req.params.id);
  const user = await User.findById(req.body.userId);

  if (!req.body.message) {
    res.status(400).json("Please provide a message");
    throw new Error("Please provide a message");
  }

  if (!challenge) {
    res.status(400).json("Challenge not found");
    throw new Error("Challenge not found");
  }

  const comment = await Comment.create({
    username: user.username,
    message: req.body.message,
    parentId: req.body.parentId,
    avatar: user.avatar,
  });

  user.comments.push(comment._id);
  await user.save();
  challenge.comments.push(comment._id);
  await challenge.save();

  if (req.originalUrl.endsWith("reply")) {
    let parentComment = await Comment.findById(req.body.parentId);
    if (parentComment.username !== user.username) {
      await sendNotification({
        sender: user._id,
        receiver: parentComment.username,
        message: `${user.username} has replied to your comment`,
      });
    }
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
  const challenge = await Challenge.findById(req.params.id);
  const comment = await Comment.findById(req.params.commentId);
  const childrenComments = await Comment.find({ parentId: comment._id });

  const user = await User.findOne({ username: comment.username });

  if (!comment) {
    res.status(400).json("Comment not found");
    throw new Error("Comment not found");
  }

  challenge.comments.remove(comment._id);
  user.comments.remove(comment._id);

  await comment.delete(comment._id);
  // remove all children comments
  childrenComments.forEach(async (comment) => {
    comment.remove();
    user.comments.pull(comment._id);
    challenge.comments.remove(comment._id);
  });

  await challenge.save();
  await user.save();

  res.status(200).json(comment);
});

exports.likeComment = asyncHandler(async (req, res) => {
  const comment = await Comment.findById(req.params.commentId);
  const challenge = await Challenge.findById(req.params.id);

  if (!comment) {
    res.status(404).send(`No comment with id: ${comment._id}`);
    throw new Error("Comment not found");
  }
  if (!challenge) {
    res.status(400).json("Challenge not found");
    throw new Error("Challenge not found");
  }

  const userLiked = await User.findOne({
    _id: req.body.userId,
  });

  if (!comment.likes.includes(userLiked._id)) {
    comment.likes.push(userLiked._id);
    if (comment.username !== userLiked.username) {
      await sendNotification({
        sender: userLiked.username,
        receiver: comment.username,
        message: `${userLiked.username} liked your comment`,
        comment: comment._id,
      });
    }
  }
  await comment.save();

  res.status(200).json(comment);
});

exports.dislikeComment = asyncHandler(async (req, res) => {
  const comment = await Comment.findById(req.params.commentId);
  const challenge = await Challenge.findById(req.params.id);

  if (!comment) {
    res.status(404).send(`No comment with id: ${comment._id}`);
    throw new Error("Comment not found");
  }
  if (!challenge) {
    res.status(400).json("Challenge not found");
    throw new Error("Challenge not found");
  }

  const userDisliked = await User.findOne({
    _id: req.body.userId,
  });

  if (comment.likes.includes(userDisliked._id)) {
    comment.likes.remove(userDisliked._id);
  }
  await comment.save();

  res.status(200).json(comment);
});
