const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const cookieSession = require("cookie-session");
const passport = require("passport");
const morgan = require("morgan");

const challengeRouter = require("./routes/challengeRouter.js");
const authRouter = require("./routes/authRouter");
require("./passport");

const connectDB = require("./config/db.js");

connectDB();

const app = express();

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

app.use(morgan("dev"));
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));

app.use(
  cookieSession({
    name: "session",
    keys: ["key"],
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/auth", authRouter);
app.use("/challenges", challengeRouter);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
