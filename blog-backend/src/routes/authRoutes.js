const express = require("express");
const router = express.Router();

const { login, register, getMe } = require("../controllers/authController");
const authMiddleware = require("../middlewares/authMiddleware");



// register
router.post("/register", register);

// login
router.post("/login", login);

// get current user
router.get("/me", authMiddleware, getMe);

module.exports = router; // ده authRoutes.js 