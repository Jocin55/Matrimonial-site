require("dotenv").config();
const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");
const authRoutes = require("./routes/auth.routes");
const adminRoutes = require("./routes/admin.routes");
const profileRoutes = require("./routes/profile.routes");
const requestRoutes = require("./routes/request.routes");

const app = express();

app.use(cors({ origin: "http://localhost:5173", credentials: false }));

app.use(express.json());

// Connect to MongoDB
connectDB();

// ROUTES
app.use("/auth", authRoutes);       // auth routes
app.use("/admin", adminRoutes);     // admin routes

app.get("/", (req, res) => {
  res.send("Welcome to the API");
});

app.use("/profiles", profileRoutes); // profile routes

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
