const mongoose = require("mongoose");
const User = require("./UserModel.js");

const challengeSchema = mongoose.Schema({
  tech: {
    type: String,
    required: [true, "Please enter the techs that will be used"],
  },
  objective: {
    type: String,
    required: [true, "Please enter a challenge objective"],
  },
  projects: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Project", default: [] },
  ],
  comments: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Comment", default: [] },
  ],
  description: {
    type: String,
    required: [true, "Please enter a description"],
  },
  tags: {
    type: [String],
    default: [],
  },
  startDate: {
    type: Date,
    default: new Date(),
  },
  tasks: String,
  totalSubmits: {
    type: Number,
    default: 0,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  week: {
    type: Number,
    required: true,
  },
  liveExample: {
    type: String,
    required: true,
  },
  thumbnail: {
    type: String,
    required: true,
  },
  solutionVideo: {
    type: String,
    required: true,
  },
  tasksVideo: {
    type: String,
    required: true,
  },
  solutionMd: {
    type: String,
    required: true,
  },
  tasksMd: {
    type: String,
    required: true,
  },
});

const Challenge = mongoose.model("Challenge", challengeSchema);

//! Secret Challenge
//! client will make a request on Sunday 00.00 to GET /challenges

module.exports = Challenge;
