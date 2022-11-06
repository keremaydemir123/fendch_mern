const asyncHandler = require("express-async-handler");

const Challenge = require("../models/ChallengeModel.js");

// Active Challenges
// @route GET /api/active/
// @access public
exports.getActiveChallenges = asyncHandler(async (req, res) => {
  const challenge = await Challenge.find();

  filteredChallenge = challenge.filter(
    (secretChallenge) =>
      secretChallenge.isSecret != true && secretChallenge.isActive == true
  );

  res.status(200).json(filteredChallenge);
});

// get all available challenges including active and old ones
// @route GET /api/
// @access public
exports.getOldChallenges = asyncHandler(async (req, res) => {
  const challenge = await Challenge.find();

  filteredChallenge = challenge.filter(
    (secretChallenge) =>
      secretChallenge.isSecret != true && secretChallenge.isActive != true
  );

  res.status(200).json(filteredChallenge);
});

// Get Challenge
// @route GET /api/active/
// @access public
exports.getChallenge = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const challenge = await Challenge.findById(id);

  res.status(200).json(challenge);
});

// Create a new challenge
// @route POST /api/
// @access private
exports.createChallenge = asyncHandler(async (req, res) => {
  if (!req.body.objective || !req.body.tech || !req.body.description || !req.body.week) {
    res
      .status(400)
      .send("Don't forget to enter a title, techs and description");
    throw new Error("Don't forget to enter a title, techs and description");
  }

  const objectiveExist = await Challenge.find({objective: req.body.objective, tech: req.body.tech})
  if (objectiveExist) {
    res
      .status(400)
      .send("Same challenge with same objective and tech stack is already exist");
    throw new Error("Same challenge with same objective and tech stack is already exist");
  }
  
  const challenge = await Challenge.create(req.body);

  res.status(200).json(challenge);
});

//Only admins allowed
exports.getSecretChallenges = asyncHandler(async (req, res) => {
  //check if user name equals to admins' username function will be added here
  const challenge = await Challenge.find();

  filteredChallenge = challenge.filter(
    (secretChallenge) => secretChallenge.isSecret == true
  );

  res.status(200).json(filteredChallenge);
});

//update challenge status from admin panel. If challenge isActive => show in client else {false}

// @route DELETE /api/challenges/:id
// @access private
exports.deleteChallenge = asyncHandler(async (req, res) => {
  const challenge = await Challenge.findById(req.params.id);

  if (!challenge) {
    res.status(400);
    throw new Error("Challenge not found");
  }
  await challenge.remove();
  res
    .status(200)
    .json({ id: req.params.id, message: "Challenge deleted successfully" });
});
