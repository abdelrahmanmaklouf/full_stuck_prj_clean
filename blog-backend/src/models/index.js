const Post = require("./Post");
const Comment = require("./Comment");
const Category = require("./Category");
const Tag = require("./Tag");
const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

// العلاقات الحالية (Comments)
Post.hasMany(Comment, { foreignKey: "postId", onDelete: "CASCADE" });
Comment.belongsTo(Post, { foreignKey: "postId" });

/* =========================
   Categories (One-to-Many)
========================= */

Category.hasMany(Post, { foreignKey: "categoryId" });
Post.belongsTo(Category, { foreignKey: "categoryId" });

/* =========================
   Tags (Many-to-Many)
========================= */

// جدول وسيط
const PostTag = sequelize.define(
  "PostTag",
  {},
  { timestamps: false }
);

Post.belongsToMany(Tag, { through: PostTag });
Tag.belongsToMany(Post, { through: PostTag });

module.exports = {
  Post,
  Comment,
  Category,
  Tag,
};