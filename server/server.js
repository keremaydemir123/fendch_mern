const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const authRoutes = require("./routes/authRouter");
const cookieSession = require("cookie-session");
const passport = require("passport");

const passportSetup = require("./passport");

const CLIENT_URL = process.env.CLIENT_URL;

const app = express();

app.use(
  cors({
    origin: CLIENT_URL,
    credentials: true,
  })
);

//!!!!
app.use(
  cookieSession({
    name: "session",
    keys: ["key"],
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/auth", authRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
