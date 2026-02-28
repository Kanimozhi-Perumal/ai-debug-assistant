import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import debugRoute from "./routes/debugRoute.js";
import authRoute from "./routes/authRoute.js";
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoute);
// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.log("❌ MongoDB Error:", err));

// Routes
app.use("/api/debug", debugRoute);

// Use environment port OR fallback
const PORT = process.env.PORT || 5000;

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});