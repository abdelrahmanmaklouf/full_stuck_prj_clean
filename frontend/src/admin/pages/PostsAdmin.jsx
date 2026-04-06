import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";


export default function CreatePost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [status, setStatus] = useState("draft");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await api.post("/api/posts", {
        title,
        content,
        status,
      });

      alert("Post created successfully ✅");
      navigate("/admin/posts");
    } catch (err) {
      console.error(err);
      alert("Error creating post ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Create Post</h2>

      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={styles.input}
          required
        />

        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          style={styles.textarea}
          required
        />

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          style={styles.input}
        >
          <option value="draft">Draft</option>
          <option value="published">Published</option>
        </select>

        <button type="submit" disabled={loading} style={styles.button}>
          {loading ? "Creating..." : "Create Post"}
        </button>
      </form>
    </div>
  );
}

const styles = {
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    maxWidth: "500px",
  },
  input: {
    padding: "10px",
    fontSize: "14px",
  },
  textarea: {
    padding: "10px",
    fontSize: "14px",
    minHeight: "120px",
  },
  button: {
    padding: "10px",
    cursor: "pointer",
  },
};