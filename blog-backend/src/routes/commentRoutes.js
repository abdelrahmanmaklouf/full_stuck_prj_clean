const express = require("express");
const router = express.Router();
const rateLimit = require("express-rate-limit");

const commentLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 5, // 5 comments per minute per IP
});

const {
  addComment,
  approveComment,
  deleteComment,
} = require("../controllers/commentController");

// Public: add comment (with rate limit)
router.post("/", commentLimiter, addComment);

// Admin: approve comment
router.put("/:id/approve", approveComment);

// Admin: delete comment
router.delete("/:id", deleteComment);

module.exports = router;