const Tag = require("../models/Tag");

// Create Tag
exports.createTag = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Name is required" });
    }

    const tag = await Tag.create({ name });

    res.status(201).json(tag);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Tags
exports.getTags = async (req, res) => {
  const tags = await Tag.findAll();
  res.json(tags);
};

// Delete Tag
exports.deleteTag = async (req, res) => {
  const { id } = req.params;

  const tag = await Tag.findByPk(id);

  if (!tag) {
    return res.status(404).json({ message: "Not found" });
  }

  await tag.destroy();

  res.json({ message: "Deleted" });
};