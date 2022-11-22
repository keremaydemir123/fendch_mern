const asyncHandler = require("express-async-handler");

const User = require("../models/UserModel.js");
const Comment = require("../models/CommentModel.js");
const Challenge = require("../models/ChallengeModel.js");

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
<<<<<<< HEAD
    user: user,
    message: req.body.message,
    parent: parentComment
  })
  
  if (parentComment) {
    parentComment.childs.push(comment)
    await parentComment.save()
  }

  user.comments.push(comment)
  await user.save()
  challenge.comments.push(comment) //just like will be in project
=======
    username: user.username,
    message: req.body.message,
    parentId: req.body.parentId,
  });

  user.comments.push(comment._id);
  await user.save();
  challenge.comments.push(comment._id); //just like will be in project
>>>>>>> 94df2606c41794f3ac30d648429ef0fb0f8b68f2
  await challenge.save();

  res.status(200).json(comment);
});

<<<<<<< HEAD
=======
exports.createChildComment = asyncHandler(async (req, res) => {});

>>>>>>> 94df2606c41794f3ac30d648429ef0fb0f8b68f2
/* body: { commentId: "123", message: "hello" } */
exports.updateComment = asyncHandler(async (req, res) => {});

/* body: { commentId: "123" } */
// when a user deletes a comment, all of its children comments are deleted
exports.deleteComment = asyncHandler(async (req, res) => {});


exports.likeComment = asyncHandler(async (req, res) => {
  const user = await User.findById(req.body.userId);
  const comment = await User.findById(req.params.commentId);

  const notification = await Notification.create({
    message: `${user.username} has followed you`,
    sender: user.username,
    receiver: req.body.receiverUsername,
  });

  
})