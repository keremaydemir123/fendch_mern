const express = require("express");
const asyncHandler = require("express-async-handler");

const Challenge = require("../models/Challenge.js");

const router = express.Router();

exports.getAllChallenges = asyncHandler(async (req, res) => {
  const challenge = await Challenge.find();
  res.status(200).json(challenge);
});

exports.getChallenge = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const challenge = await Challenge.findById(id);

  res.status(200).json(challenge);
});

//Create a new challenge
exports.createChallenge = asyncHandler(async (req, res) => {

  if (!req.body.title || !req.body.tech || !req.body.description) {
    res
      .status(400)
      .send("Don't forget to enter a title, techs and description");
    throw new Error("Don't forget to enter a title, techs and description");
  }
  const challenge = await Challenge.create({
    title: req.body.title,
    tech: req.body.tech,
    description: req.body.description,
  });

  res.status(200).json(challenge);
});
