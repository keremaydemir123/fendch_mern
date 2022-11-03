const express = require("express");
const dotenv = require("dotenv");
const authRoutes = require("./routes/authRouter");

dotenv.config();

const app = express();

app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
