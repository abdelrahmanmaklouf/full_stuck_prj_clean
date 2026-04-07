const Post = require("./Post");
const Comment = require("./Comment");
const Category = require("./Category");
const Tag = require("./Tag");
const PostLike = require("./PostLike");
const User = require("./User");
const { sequelize } = require("../config/db");



/* =========================
   User ↔ Comment
========================= */
Comment.belongsTo(User, { foreignKey: "userId" });
User.hasMany(Comment, { foreignKey: "userId" });

/* =========================
   Comments ↔ Post
========================= */
Post.hasMany(Comment, {
  foreignKey: "postId",
  onDelete: "CASCADE",
});

Comment.belongsTo(Post, {
  foreignKey: "postId",
});

/* =========================
   Likes
========================= */
Post.hasMany(PostLike, {
  foreignKey: "postId",
  onDelete: "CASCADE",
});

PostLike.belongsTo(Post, {
  foreignKey: "postId",
});

/* =========================
   Categories
========================= */
Category.hasMany(Post, {
  foreignKey: "categoryId",
});

Post.belongsTo(Category, {
  foreignKey: "categoryId",
});

/* =========================
   Tags (Many-to-Many)
========================= */

const PostTag = sequelize.define(
  "PostTag",
  {},
  { timestamps: false }
);

Post.belongsToMany(Tag, {
  through: PostTag,
});

Tag.belongsToMany(Post, {
  through: PostTag,
});

/* =========================
   Export
========================= */
module.exports = {
  Post,
  Comment,
  Category,
  Tag,
  PostTag,
  PostLike,
  User, // ✅ مهم
};