module.exports = (req, res, next) => {
  try {
    // 🔒 لازم يكون فيه user
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // 👑 تحقق إنه admin
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied (Admin only)" });
    }

    next();

  } catch (err) {
    return res.status(500).json({ message: "Server error" });
  }
};