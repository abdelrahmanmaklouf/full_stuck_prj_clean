const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

const categoryRoutes = require("./routes/categoryRoutes");
const tagRoutes = require("./routes/tagRoutes");
const postRoutes = require("./routes/postRoutes");
const commentRoutes = require("./routes/commentRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();

// =======================
// ✅ Security Middlewares
// =======================
app.use(helmet());

// =======================
// ✅ CORS (Production Ready)
// =======================
app.use(
  cors({
    origin: process.env.CLIENT_URL || "*",
    credentials: true,
  })
);

// =======================
// ✅ Body Parser
// =======================
app.use(express.json());

// =======================
// ✅ Rate Limiting
// =======================
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 min
  max: 100,
  message: "Too many requests from this IP, please try again later.",
});

app.use("/api", limiter);

// =======================
// ✅ Routes
// =======================
app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/tags", tagRoutes);
app.use("/api/comments", commentRoutes);

// =======================
// ✅ Health Check
// =======================
app.get("/", (req, res) => {
  res.send("API is running...");
});

// =======================
// ✅ 404 Handler
// =======================
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// =======================
// ✅ Global Error Handler
// =======================
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: "Internal Server Error",
  });
});

module.exports = app;