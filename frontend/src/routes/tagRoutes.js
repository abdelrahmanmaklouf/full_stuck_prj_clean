const express = require("express");
const router = express.Router();

const {
  createTag,
  getTags,
  deleteTag,
} = require("../controllers/tagController");

router.post("/", createTag);
router.get("/", getTags);
router.delete("/:id", deleteTag);

module.exports = router;