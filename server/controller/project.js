const Project = require("../models/Project");
const APIFeatures = require("../utils/APIFeatures");

//! MIDLEWARES
exports.aliasTopProjects = (req, res, next) => {
  req.query.limit = "5";
  req.query.sort = "-ratingsAverage";
  req.query.fields = "ratingsAverage,git";
  next();
};

//! HANDLERS
exports.getAllProject = async (req, res) => {
  try {
    const features = new APIFeatures(Project.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();

    const projects = await features.query;

    res.status(200).json({
      status: "success",
      requestedAt: req.requestTime,
      data: {
        projects,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: err,
    });
  }
};

exports.getProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    res.status(200).json({
      status: "success",
      data: {
        project,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: err,
    });
  }
};

exports.createProject = async (req, res) => {
  try {
    const newProject = await Project.create(req.body);
    res.status(201).json({
      status: "success",
      data: {
        project: newProject,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};

exports.updateProject = async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: "success",
      data: {
        project,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: err,
    });
  }
};

exports.deleteProject = async (req, res) => {
  try {
    await Project.findByIdAndDelete(req.params.id);
    res.status(200).json({
      status: "success",
      data: null,
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: err,
    });
  }
};
