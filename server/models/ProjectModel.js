const mongoose = require("mongoose");

const projectSchema = mongoose.Schema(
  {
    projectTitle: {
      type: String,
      required: [true, "Please enter a project title"],
    },
    repository: {
      type: String,
      required: [true, "Please enter repository URL"],
    },
    description: {
      type: String,
      required: [true, "Please enter a description"],
    },
    tags: [String],
    selectedFile: String,
    public: Boolean,
  },
  { timestamp: true }
);

const Project = mongoose.model("Project", projectSchema);

module.exports = Project;
