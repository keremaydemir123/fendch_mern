const router = require("express").Router();
const passport = require("passport");
const asyncHandler = require("express-async-handler");

const User = require("../models/UserModel.js");

const CLIENT_URL = process.env.CLIENT_URL;

router.get("/github", passport.authenticate("github", { scope: ["profile"] }));

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
    console.log("req.user >> ", req.user);

    const userExist = await User.find({ username: req.user.username });

    if (userExist) {
      res.status(200).json({
        success: true,
        message: "user has successfully authenticated",
        user: userExist,
        // cookies: req.cookies,
      });
    } else {
      if (req.user) {
        const user = await User.create({
          username: req.user.username,
          photo: req.user.photos[0].value,
          profileUrl: req.user.profileUrl,
        });
        res.status(200).json({
          success: true,
          message: "user has successfully authenticated",
          user: user,
          // cookies: req.cookies,
        });
      }
    }
  })
);

router.get(
  "/all",
  asyncHandler(async (req, res) => {
    const users = await User.find();

    res.status(200).json(users);
  })
);

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect(CLIENT_URL);
});

module.exports = router;
