const mongoose = require("mongoose");
const User = require("./User.js");

const challengeSchema = mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please enter a challenge title"],
  },
  // creator: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   required: true,
  //   ref: "user",
  // },
  tech: {
    type: String,
    required: [true, "Please enter the techs that will be used"],
  },
  description: {
    type: String,
    required: [true, "Please enter a description"],
  },
  tags: {
    type: [String],
    default: [],
  },
  date: {
    type: Date,
    default: new Date(),
  },
  tasks: [String],
  totalSubmits: Number,
});

const Challenge = mongoose.model("challenge", challengeSchema);

module.exports = Challenge;