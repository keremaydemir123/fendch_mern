const router = require("express").Router();
const passport = require("passport");

const CLIENT_URL = process.env.CLIENT_URL;

router.get("/login/failure", (req, res) => {
  res.status(401).send("Login failed");
});

router.get("/login/success", (req, res) => {
  if (req.user) {
    res.status(200).json({
      success: true,
      message: "user has successfully authenticated",
      user: req.user,
      // cookies: req.cookies,
    });
  }
});

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect(CLIENT_URL);
});

router.get("/github", passport.authenticate("github", { scope: ["profile"] }));

router.get(
  "/github/callback",
  passport.authenticate("github", {
    successRedirect: CLIENT_URL,
    failureRedirect: "/login/failure",
  })
);

module.exports = router;
