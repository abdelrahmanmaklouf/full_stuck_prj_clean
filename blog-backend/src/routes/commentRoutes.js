const express = require("express");
const router = express.Router();

const {
  getComments,
  addComment,
  approveComment,
  deleteComment,
} = require("../controllers/commentController");

// Public
router.get("/", getComments);
router.post("/", addComment);

// Admin
router.put("/:id/approve", approveComment);
router.delete("/:id", deleteComment);

module.exports = router;