const asyncHandler = require("express-async-handler");

const User = require("../models/UserModel.js");
const Comment = require("../models/CommentModel.js");
const Challenge = require("../models/ChallengeModel.js");
const Notification = require("../models/NotificationModel.js");

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

/* body: { userId: "123", message: "hello", challengeId: "123",
projectId: "123" | null, parentId: "123" | null } */

/* put the comment in the user's comments array */
/* put the comment in the challenge's comments array */
/* if the comment is for project! put the comment in the project's comments array */
exports.createComment = asyncHandler(async (req, res) => {
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
  });

  user.comments.push(comment._id);
  await user.save();
  challenge.comments.push(comment._id);
  await challenge.save();

  res.status(200).json(comment);
});

/* body: { commentId: "123", message: "hello" } */
exports.updateComment = asyncHandler(async (req, res) => {});

/* body: { commentId: "123" } */
// when a user deletes a comment, all of its children comments are deleted
exports.deleteComment = asyncHandler(async (req, res) => {});


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

  const notification = await Notification.create({
    message: `${userLiked.username} has liked your "${comment.message}" comment`,
    sender: userLiked.username,
    receiver: req.body.receiverUsername,
  });

  if (comment.likes.includes(userLiked._id)) {
    comment.likes.remove(userLiked._id)
  } else {
    comment.likes.push(userLiked._id);
  }
  await comment.save();

  res.status(200).json(notification);
  
})