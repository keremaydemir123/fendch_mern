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
  // creator: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   required: true,
  //   ref: "user",
  // },

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
  tasks: [String],
  totalSubmits: {
    type: Number,
    default: 0,
  },
  images: [String],
  logos: [String],
  isSecret: {
    type: Boolean,
    default: true,
  },
  isActive: {
    type: Boolean,
    default: false,
  },
  week: {
    type: Number,
    required: true,
  },
  liveExample: {
    type: String,
    required: true,
  },
});

const Challenge = mongoose.model("Challenge", challengeSchema);

//! Secret Challenge
//! client will make a request on Sunday 00.00 to GET /challenges

module.exports = Challenge;
