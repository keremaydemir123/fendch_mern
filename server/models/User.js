const mongoose = require('mongoose');
const Project = require("./Project.js");
const Comment = require("./Comment.js");


const userSchema = mongoose.Schema(
  {
    username: { type: String, required: [true, "Please enter a username"] },
    password: { type: String, required: [true, "Please enter a password"] },
    projects: [String], //
    comments: [String], //
    likedComments: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      default: [],
    },
    ratedProjects: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "project",
      default: [],
    },
  },
  { timestamp: true }
);

const User = mongoose.model("user", userSchema);
module.exports = User;
