const express = require("express");
const router = express.Router();

const auth = require("../middlewares/authMiddleware");
const admin = require("../middlewares/adminMiddleware");


const {
  createPost,
  getPosts,
  getPostById,
  updatePost,
  deletePost,
  likePost,
} = require("../controllers/postController");

// 📌 Public routes
router.get("/", getPosts);
router.get("/:id", getPostById);

// ❤️ Like
router.post("/:id/like", likePost);

// 🔒 Protected routes (Admin/User auth)
router.post("/", auth, createPost);
router.put("/:id", auth, updatePost);
router.delete("/:id", auth, admin, deletePost);

module.exports = router;