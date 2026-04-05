const { body } = require("express-validator");

exports.validatePost = [
  body("title")
    .notEmpty()
    .withMessage("Title is required")
    .isLength({ min: 3 })
    .withMessage("Title must be at least 3 characters"),

  body("content")
    .notEmpty()
    .withMessage("Content is required"),

  body("status")
    .optional()
    .isIn(["draft", "published"])
    .withMessage("Invalid status"),
];