const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    githubId: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    avatar: { type: String, required: true },
    profileUrl: { type: String, required: true },
    bio: { type: String, default: "" },
    linkedin: { type: String, default: "" },
    twitter: { type: String, default: "" },
    job: { type: String, default: "" },
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
    followers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    following: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    likedComments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
    likedProjects: [{ type: mongoose.Schema.Types.ObjectId, ref: "Project" }],
  },
  { timestamp: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
