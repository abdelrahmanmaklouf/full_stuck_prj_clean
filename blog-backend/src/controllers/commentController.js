const Comment = require("../models/Comment");

// ✅ Get Comments (by postId)
exports.getComments = async (req, res) => {
  try {
    const { postId } = req.query;

    let where = {};

    if (postId) {
      where.postId = postId;
    }

    const comments = await Comment.findAll({
      where,
      order: [["createdAt", "DESC"]],
    });

    res.json(comments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Create Comment (Public)
exports.addComment = async (req, res) => {
  try {
    const { name, content, postId } = req.body;

    const existing = await Comment.findOne({
      where: { content },
    });

    if (existing) {
      return res.status(400).json({ message: "Duplicate comment detected" });
    }

    const comment = await Comment.create({
      name,
      content,
      postId,
      status: "pending", // أو "approved" لو عايز يظهر فورًا
    });

    res.status(201).json(comment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Approve Comment (Admin)
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

// ✅ Delete Comment (Admin)
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