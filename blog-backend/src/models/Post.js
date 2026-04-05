const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const Post = sequelize.define(
  "Post",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    categoryId: {
  type: DataTypes.INTEGER,
  allowNull: true,
},
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    likes: {
  type: DataTypes.INTEGER,
  defaultValue: 0,
},
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("draft", "published"),
      defaultValue: "draft",
    },
  },
  {
    tableName: "posts",
    timestamps: true,
  }
);

module.exports = Post;