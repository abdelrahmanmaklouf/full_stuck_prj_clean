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
router.put("/comments/:id/approve", auth, approveComment);
router.delete("/comments/:id", auth, deleteComment);

module.exports = router;