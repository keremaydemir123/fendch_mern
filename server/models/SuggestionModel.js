const mongoose = require("mongoose");

const suggestionSchema = mongoose.Schema(
  {
    suggestion: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
  },
  { timestamp: true }
);

const Suggestion = mongoose.model("Suggestion", suggestionSchema);

module.exports = Suggestion;
