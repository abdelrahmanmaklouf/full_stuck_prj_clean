const Category = require("../models/Category");

// Create Category
exports.createCategory = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Name is required" });
    }

    const category = await Category.create({ name });

    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get All Categories
exports.getCategories = async (req, res) => {
  const categories = await Category.findAll();
  res.json(categories);
};

// Delete Category
exports.deleteCategory = async (req, res) => {
  const { id } = req.params;

  const category = await Category.findByPk(id);

  if (!category) {
    return res.status(404).json({ message: "Not found" });
  }

  await category.destroy();

  res.json({ message: "Deleted" });
};