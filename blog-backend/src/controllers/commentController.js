const Comment = require("../models/Comment");
const User = require("../models/User");

// =========================
// Get Comments (by postId)
// =========================
exports.getComments = async (req, res) => {
  try {
    const { postId } = req.query;

    let where = {};

    if (postId) {
      where.postId = postId;
    }

    const comments = await Comment.findAll({
      where,
      include: [
        {
          model: User,
          attributes: ["id", "name"], // 👈 نجيب اسم اليوزر
        },
      ],
      order: [["createdAt", "DESC"]],
    });

    res.json(comments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// =========================
// Create Comment (AUTH REQUIRED)
// =========================
exports.addComment = async (req, res) => {
  try {
    const { content, postId } = req.body;

    const userId = req.user.id; // 👈 من الـ JWT

    const comment = await Comment.create({
      content,
      postId,
      userId, // 👈 مرتبط باليوزر
      status: "pending",
    });

    res.status(201).json(comment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// =========================
// Approve Comment (Admin)
// =========================
exports.approveComment = async (req, res) => {
  try {
    const comment = await Comment.findByPk(req.params.id);

    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    comment.status = "approved";
    await comment.save();

    res.json(comment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// =========================
// Delete Comment (Admin)
// =========================
exports.deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findByPk(req.params.id);

    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    await comment.destroy();

    res.json({ message: "Comment deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};