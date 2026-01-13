require("dotenv").config();
const mongoose = require("mongoose");
const Admin = require("../models/Admin");

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error(err));

async function createAdmin() {
  const admin = new Admin({
    name: "Jocin",
    email: "jocin@admin.com",
    password: "Admin123!",
  });

  await admin.save();
  console.log("✅ Admin created successfully");
  process.exit();
}

createAdmin();
