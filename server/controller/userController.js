const asyncHandler = require("express-async-handler");

const User = require("../models/UserModel.js");

exports.getUsers = asyncHandler(async (req, res) => {
  const users = await User.find();

  res.status(200).json(users);
});

exports.getUserByUsername = asyncHandler(async (req, res) => {
  const user = await User.findOne({ username: req.params.username })
    .populate({
      path: "projects",
      populate: [
        { path: "user", select: "username", model: "User" },
        {
          path: "challenge",
          select: "week tech objective",
          model: "Challenge",
        },
      ],
    })
    .select("-notifications -_id -__v");

  if (user) {
    res.status(200).json(user);
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
  const user = await User.findById(req.params.id);

  if (user) {
    if (user.followers.includes(req.body.followerId)) {
      res.status(400);
      throw new Error("You already follow this user");
    }

    user.followers.push(req.body.followerId);
    await user.save();

    res.status(200).json({ message: "User followed" });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});
