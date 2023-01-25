const express = require("express");
const dotenv = require("dotenv");
dotenv.config();

const http = require("http");
const socketio = require("socket.io");
const cors = require("cors");
const cookieSession = require("cookie-session");
const passport = require("passport");
const morgan = require("morgan");
const errorHandler = require("./middleware/errorHandler.js");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const connectDB = require("./config/db.js");
connectDB();

const notificationHandler = require("./socket/notificationHandler");
require("./passport");
require("./cronJobs");

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

io.on("connection", (socket) => {
  // Define socket actions in the actionHandlers file

  // connect user to the socket
  socket.on("connect_user", (userId) => {
    console.log(userId);
  });

  // disconnect user from the socket
  socket.on("disconnect", (userId) => {
    socket.leave(userId);
  });

  socket.on("notifications", (data) => {
    let newData = { ...data, socketId: socket.id };
    notificationHandler.handleNotification(newData);
  });
});

global.io = io;

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

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
