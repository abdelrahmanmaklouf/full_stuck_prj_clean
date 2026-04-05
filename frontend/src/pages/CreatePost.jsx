import { useState } from "react";
import { createPost } from "../services/postService";

export default function CreatePost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [categoryId, setCategoryId] = useState(""); // ✅ مهم

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError(null);

      await createPost({
        title,
        content,
        categoryId: Number(categoryId), // ✅ مهم
      });

      alert("Created!");
    } catch (err) {
  console.error(err.response?.data || err.message); // 👈 مهم
  setError(err.response?.data?.message || "Failed to create");
}
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        placeholder="content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      <input
        type="number"
        placeholder="category id"
        value={categoryId}
        onChange={(e) => setCategoryId(e.target.value)}
      />

      <button disabled={loading}>
        {loading ? "Loading..." : "Create"}
      </button>

      {error && <p>{error}</p>}
    </form>
  );
}