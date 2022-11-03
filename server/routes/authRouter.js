const router = require("express").Router();

router.get("/auth/github", (req, res) => {
  res.send("You made it to the auth route!");
});

module.exports = router;
