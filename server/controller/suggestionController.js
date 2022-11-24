const asyncHandler = require("express-async-handler");
const Suggestion = require("../models/SuggestionModel.js");

exports.createSuggestion = asyncHandler(async (req, res) => {
  const { suggestion } = req.body;
  const newSuggestion = await Suggestion.create({
    suggestion,
  });
  res.status(201).json({
    success: true,
    data: newSuggestion,
  });
});

exports.getSuggestions = asyncHandler(async (req, res) => {
  const suggestions = await Suggestion.find();
  res.status(200).json(suggestions);
});
