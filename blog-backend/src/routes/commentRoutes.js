const express = require("express");
const router = express.Router();

const {
  addComment,
  getComments,
  approveComment,
  deleteComment,
} = require("../controllers/commentController");

const auth = require("../middleware/auth");

// Public
router.get("/comments", getComments);

// Protected
router.post("/comments", auth, addComment);

// Admin
router.patch("/:id/approve", auth, admin, approveComment);
router.delete("/:id", auth, admin, deleteComment);

module.exports = router;