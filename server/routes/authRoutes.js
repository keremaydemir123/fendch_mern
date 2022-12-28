const router = require("express").Router();
const passport = require("passport");
const asyncHandler = require("express-async-handler");

const User = require("../models/UserModel.js");

const CLIENT_URL = process.env.CLIENT_URL;

router.get(
  "/github",
  passport.authenticate("github", { scope: ["profile", "user:email"] })
);

router.get(
  "/github/callback",
  passport.authenticate("github", {
    successRedirect: CLIENT_URL,
    failureRedirect: "/login/failure",
  })
);

router.get("/login/failure", (req, res) => {
  res.status(401).send("Login failed");
});

router.get(
  "/login/success",
  asyncHandler(async (req, res) => {
    if (req.user) {
      const user = await User.findOne({ githubId: req.user.id });
      if (user) {
        res.status(200).json(user);
      } else {
        const newUser = await User.create({
          githubId: req.user.id,
          repos_url: req.user._json.repos_url,
          username: req.user.username,
          avatar: req.user.photos[0].value,
          profileUrl: req.user.profileUrl,
          email: req.user.emails[0].value,
        });
        res.status(200).json(newUser);
      }
    }
  })
);

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect(CLIENT_URL);
});

module.exports = router;
