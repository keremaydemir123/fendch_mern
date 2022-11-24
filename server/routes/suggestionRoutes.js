const express = require("express");
const router = express.Router();
const communicationController = require("../controller/suggestionController");

router
  .route("/")
  .post(communicationController.createSuggestion)
  .get(communicationController.getSuggestions);

module.exports = router;
