const mongoose = require("mongoose");
const Project = require("./Project.js");
const Comment = require("./Comment.js");

const userSchema = mongoose.Schema(
  {
    username: { type: String, required: [true, "Please enter a username"] },
    projects: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      default: [],
    },
    comments: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
      default: [],
    },
    likedComments: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
      default: [],
    },
    ratedProjects: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      default: [],
    },
    //streak
    //points
    //totalProjects
    //totalLikes
    //totalComments
  },
  { timestamp: true }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
