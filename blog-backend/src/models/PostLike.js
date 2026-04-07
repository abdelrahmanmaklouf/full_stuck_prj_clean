const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const PostLike = sequelize.define(
  "PostLike",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    postId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "post_likes",
    timestamps: true,
  }
);

module.exports = PostLike; 