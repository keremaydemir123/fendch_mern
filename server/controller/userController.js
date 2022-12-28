const asyncHandler = require("express-async-handler");

const User = require("../models/UserModel.js");
const Project = require("../models/ProjectModel.js");

exports.getUsers = asyncHandler(async (req, res) => {
  const users = await User.find();

  res.status(200).json(users);
});

exports.getUserByUsername = asyncHandler(async (req, res) => {
  const user = await User.findOne({ username: req.params.username }).select(
    "-__v -email -displayName -likedComments -likedProjects -notifications -repos"
  );

  const projects = await Project.find({ user: user._id })
    .populate({ path: "user", select: { username: 1, avatar: 1, _id: 0 } })
    .populate({
      path: "challenge",
      select: { tech: 1, objective: 1, week: 1, _id: 1 },
    })
    .select("-__v -markdown -comments -likeCount -likedByMe");

  console.log(projects);

  if (user) {
    res.status(200).json({ user, projects });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

exports.updateMe = asyncHandler(async (req, res) => {
  const user = await User.findOne({ username: req.params.username });

  if (user) {
    user.bio = req.body.bio || user.bio;
    user.linkedin = req.body.linkedin || user.linkedin;
    user.job = req.body.job || user.job;

    const updatedUser = await user.save();

    res.status(200).json(updatedUser);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

exports.getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    res.status(200).json(user);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

exports.followUser = asyncHandler(async (req, res) => {
  const followedUser = await User.findOne({ username: req.params.username });
  const followingUser = await User.findById(req.body.followerId);

  if (followedUser) {
    if (followedUser.followers.includes(req.body.followerId)) {
      res.status(400);
      throw new Error("You already follow this user");
    }

    followedUser.followers.push(req.body.followerId);
    await followedUser.save();

    followingUser.following.push(followedUser._id);
    await followingUser.save();

    res.status(200).json({ message: "User followed" });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

exports.unfollowUser = asyncHandler(async (req, res) => {
  const followedUser = await User.findOne({ username: req.params.username });
  const followingUser = await User.findById(req.body.followerId);

  if (followedUser) {
    if (!followedUser.followers.includes(req.body.followerId)) {
      res.status(400);
      throw new Error("You don't follow this user");
    }

    followedUser.followers.pull(req.body.followerId);
    await followedUser.save();

    followingUser.following.pull(followedUser._id);
    await followingUser.save();

    res.status(200).json({ message: "User unfollowed" });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});
