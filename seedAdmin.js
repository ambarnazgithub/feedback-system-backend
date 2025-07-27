import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import Admin from "./models/Admin.js";

dotenv.config();

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("🌐 MongoDB connected");

    const hashedPassword = await bcrypt.hash("admin123", 10); // 🔑 default password

    const admin = new Admin({
      username: "admin",
      password: hashedPassword,
    });

    await admin.save();
    console.log("✅ Admin user created successfully!");
    mongoose.disconnect();
  })
  .catch((err) => {
    console.error("❌ Error:", err);
  });
