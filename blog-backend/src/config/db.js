const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres",
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
  logging: false,
});

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Neon PostgreSQL connected successfully");
  } catch (error) {
    console.error("❌ DB connection failed:", error);
    process.exit(1); // مهم في production
  }
};

module.exports = { sequelize, connectDB };