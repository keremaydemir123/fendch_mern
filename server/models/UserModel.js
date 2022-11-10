const mongoose = require("mongoose");
const Project = require("./ProjectModel.js");
const Comment = require("./CommentModel.js");

const userSchema = mongoose.Schema(
  {
    githubId: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    avatar: { type: String, required: true },
    profileUrl: { type: String, required: true },
    bio: { type: String, default: "" },
    role: {
      type: String,
      required: true,
      default: "user",
      enum: ["user", "admin"],
    },
    joinedAt: { type: Date, default: Date.now },
    projects: [{ type: mongoose.Schema.Types.ObjectId, ref: "Project" }],
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
    notifications: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Notification" },
    ],

    // likedComments: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "Comment",
    //   default: [],
    // },
    // ratedProjects: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "Project",
    //   default: [],
    // },

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
