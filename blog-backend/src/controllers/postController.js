const Post = require("../models/Post");
const { Category, Tag } = require("../models");
const { Op } = require("sequelize");

// =========================
// Create Post
// =========================
exports.createPost = async (req, res) => {
  try {
    const { title, content, status, categoryId, tagIds } = req.body;

    const post = await Post.create({
      title,
      content,
      status,
      categoryId,
      likes: 0,
    });

    // Tags (many-to-many)
    if (tagIds && tagIds.length > 0) {
      await post.setTags(tagIds);
    }

    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// =========================
// Get All Posts (Advanced)
// =========================
exports.getPosts = async (req, res) => {
  try {
    const {
      search,
      page = 1,
      limit = 5,
      category,
      tag,
      sort = "latest",
    } = req.query;

    const where = {};

    // 🔍 Search
    if (search) {
      where.title = {
        [Op.iLike]: `%${search}%`,
      };
    }

    // 🏷 Category filter
    if (category) {
      where.categoryId = category;
    }

    // 📦 Include relations
    const include = [
      { model: Category },
      {
        model: Tag,
        required: tag ? true : false,
        where: tag ? { id: tag } : undefined,
      },
    ];

    // 📄 Pagination
    const offset = (page - 1) * limit;

    // 🔃 Sorting
    let order = [["createdAt", "DESC"]];
    if (sort === "likes") {
      order = [["likes", "DESC"]];
    }

    const { count, rows } = await Post.findAndCountAll({
      where,
      include,
      limit: parseInt(limit),
      offset: parseInt(offset),
      order,
      distinct: true,
    });

    res.json({
      total: count,
      page: parseInt(page),
      pages: Math.ceil(count / limit),
      posts: rows,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// =========================
// Get Single Post
// =========================
exports.getPostById = async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id, {
      include: [
        { model: Category },
        { model: Tag },
      ],
    });

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// =========================
// Update Post
// =========================
exports.updatePost = async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const { tagIds, ...otherData } = req.body;

    await post.update(otherData);

    // Update tags if provided
    if (tagIds) {
      await post.setTags(tagIds);
    }

    res.json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// =========================
// Delete Post
// =========================
exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    await post.destroy();

    res.json({ message: "Post deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// =========================
// ❤️ Like Post
// =========================
exports.likePost = async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    post.likes += 1;
    await post.save();

    res.json({ likes: post.likes });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};