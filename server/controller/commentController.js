const asyncHandler = require("express-async-handler");

const User = require("../models/UserModel.js");
const Comment = require("../models/CommentModel.js");

exports.getComments = asyncHandler(async (req, res) => {
  const comments = await User.find();

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
exports.createComment = asyncHandler(async (req, res) => {});

/* body: { commentId: "123", message: "hello" } */
exports.updateComment = asyncHandler(async (req, res) => {});

/* body: { commentId: "123" } */
// when a user deletes a comment, all of its children comments are deleted
exports.deleteComment = asyncHandler(async (req, res) => {});
