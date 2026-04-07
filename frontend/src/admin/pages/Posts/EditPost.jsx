import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../../services/api";

export default function EditPost() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [status, setStatus] = useState("draft");
  const [loading, setLoading] = useState(false);

  // 🔹 fetch single post
  const fetchPost = async () => {
    try {
      const res = await api.get(`/posts/${id}`);
      const post = res.data;

      setTitle(post.title);
      setContent(post.content);
      setStatus(post.status);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchPost();
  }, [id]);

  // 🔹 update post
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await api.put(`/api/posts/${id}`, {
        title,
        content,
        status,
      });

      alert("Post updated successfully ✅");
      navigate("/admin/posts");
    } catch (err) {
      console.error(err);
      alert("Error updating post ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Edit Post</h2>

      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          style={styles.input}
        />

        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Content"
          style={styles.textarea}
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
          {loading ? "Updating..." : "Update Post"}
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
  },
  textarea: {
    padding: "10px",
    minHeight: "120px",
  },
  button: {
    padding: "10px",
    cursor: "pointer",
  },
};