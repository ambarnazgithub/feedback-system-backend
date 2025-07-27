import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";

import feedbackRoutes from "./routes/feedbackRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.get("/", (req, res) => {
  res.send("API is working ✅");
});


// Routes
app.use("/api/feedback", feedbackRoutes);
app.use("/api/admin", adminRoutes);

// MongoDB Connect
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(5000, () => console.log("Server running on port 5000"));
  })
  .catch(err => console.error(err));
