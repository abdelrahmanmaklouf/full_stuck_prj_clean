const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// 🔥 بدل Admin بس → نستخدم User
const User = require("../models/User");

const JWT_SECRET = process.env.JWT_SECRET || "mysecretkey";

// ==========================
// ✅ REGISTER (User Only)
// ==========================
exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // check if user exists
    const existingUser = await User.findOne({ where: { email } });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 🔥 create user (FORCE role = user)
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: "user", // 🔒 مهم جدًا
    });

    // generate token
    const token = jwt.sign(
      { id: user.id, role: user.role },
      JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(201).json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ==========================
// ✅ LOGIN (User أو Admin)
// ==========================
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // generate token
    const token = jwt.sign(
      { id: user.id, role: user.role }, // 🔥 role من DB
      JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ==========================
// ✅ GET CURRENT USER
// ==========================
exports.getMe = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};