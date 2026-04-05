const { body } = require("express-validator");

exports.validateComment = [
  body("name")
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ min: 2 }),

  body("content")
    .notEmpty()
    .withMessage("Content is required")
    .isLength({ max: 500 })
    .withMessage("Comment too long"),

  body("postId")
    .notEmpty()
    .withMessage("postId is required")
    .isInt(),
];