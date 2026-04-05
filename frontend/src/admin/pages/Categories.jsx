import { useEffect, useState } from "react";
import api from "../../services/api";

export default function CategoriesAdmin() {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchCategories = async () => {
    try {
      const res = await api.get("/categories");
      setCategories(res.data);
    } catch (err) {
      console.error("Error fetching categories", err);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const addCategory = async () => {
    if (!name.trim()) {
      alert("Category name is required");
      return;
    }

    try {
      setLoading(true);

      await api.post("/categories", { name: name.trim() });

      setName("");
      fetchCategories();
    } catch (err) {
      console.error("Error adding category", err);
      alert("Failed to add category");
    } finally {
      setLoading(false);
    }
  };

  const deleteCategory = async (id) => {
    try {
      await api.delete(`/categories/${id}`);
      fetchCategories();
    } catch (err) {
      console.error("Error deleting category", err);
      alert("Failed to delete category");
    }
  };

  return (
    <div>
      <h2>Categories</h2>

      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Category name"
      />

      <button onClick={addCategory} disabled={loading}>
        {loading ? "Adding..." : "Add"}
      </button>

      {categories.length === 0 && <p>No categories</p>}

      {categories.map((c) => (
        <div key={c.id}>
          {c.name}
          <button onClick={() => deleteCategory(c.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}