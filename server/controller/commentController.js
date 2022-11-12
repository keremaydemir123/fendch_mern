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