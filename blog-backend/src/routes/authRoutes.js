const express = require("express");
const router = express.Router();

const { login, getMe } = require("../controllers/authController");
const authMiddleware = require("../middlewares/authMiddleware");

// login
router.post("/login", login);

// get current user
router.get("/me", authMiddleware, getMe);

module.exports = router;