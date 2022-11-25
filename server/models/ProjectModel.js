const mongoose = require("mongoose");

const projectSchema = mongoose.Schema(
  {
    title: String,
    git: {
      type: String,
      required: [true, "Please enter repository URL"],
    },
    challenge: { type: mongoose.Schema.Types.ObjectId, ref: "Challenge" },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User", default: [] }],
    likeCount: { type: Number, default: 0 },
    likedByMe: { type: Boolean, default: false },
    comments: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Comment", default: [] },
    ],
    description: {
      type: String,
      required: [true, "Please enter a description"],
    },
    tags: [String],
    selectedFile: String,
    public: Boolean,
    submittedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamp: true }
);

const Project = mongoose.model("Project", projectSchema);

module.exports = Project;
