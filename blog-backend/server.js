require("dotenv").config();

const app = require("./src/app");
const { connectDB, sequelize } = require("./src/config/db");
const commentRoutes = require("./src/routes/commentRoutes");
// ✅ مهم جدًا: تحميل المودلز والعلاقات
require("./src/models");

const PORT = process.env.PORT || 5000;


app.use("/api", commentRoutes);

const startServer = async () => {
  try {
    // Connect to DB
    await connectDB();

    // Sync models (use cautiously in production)
    await sequelize.sync();

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });

  } catch (error) {
    console.error("❌ Failed to start server:", error);
    process.exit(1);
  }
};

startServer();