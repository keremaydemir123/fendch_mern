const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const cookieSession = require("cookie-session");
const passport = require("passport");
const morgan = require("morgan");
const errorHandler = require("./middleware/errorHandler.js");

require("./passport");
require("./cronJobs");

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

app.use("/auth", require("./routes/authRoutes"));
app.use("/challenges", require("./routes/challengeRoutes"));
app.use("/projects", require("./routes/projectRoutes"));
app.use("/users", require("./routes/userRoutes"));
app.use("/suggestions", require("./routes/suggestionRoutes"));
app.all('*',(req,res,next)=> {
  const err= new Error(`Can't find ${req.originalUrl} on this server!`)
  err.status=404
  err.statusCode=404
 next(err)
})
app.use((err,req,res,next)=> {
  err.statusCode= err.statusCode || 500
  err.status= err.status || 'error'
  res.status(err.statusCode).json({
       status:err.status,
       message:err.message
  })
})

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
