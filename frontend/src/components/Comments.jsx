import { useEffect, useState } from "react";
import { getComments, addComment } from "../services/commentService";

export default function Comments({ postId }) {
  const [comments, setComments] = useState([]);

  const [name, setName] = useState("");
  const [content, setContent] = useState("");

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (postId) {
      fetchComments();
    }
  }, [postId]);

  const fetchComments = async () => {
    try {
      console.log("Fetching comments for post:", postId);

      const res = await getComments(postId);

      console.log("API COMMENTS:", res.data);

      // ✅ التعامل مع أكثر من شكل للـ response
      const commentsData = Array.isArray(res.data)
        ? res.data
        : res.data?.comments || [];

      // ✅ فلترة المقبول فقط
      const approved = commentsData.filter(
        (c) => c.status === "approved"
      );

      setComments(approved);

    } catch (err) {
      console.error(err);
      setComments([]); // fallback آمن
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await addComment({
        name,
        content,
        postId,
      });

      alert("Comment sent for approval ✅");

      setName("");
      setContent("");

      // refresh comments
      await fetchComments();

    } catch (err) {
      console.error(err);
      alert("Error adding comment");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h3 style={styles.title}>
        💬 Comments ({comments.length})
      </h3>

      {/* Comments List */}
      <div style={styles.list}>
        {comments.length === 0 && (
          <p style={styles.empty}>No comments yet</p>
        )}

        {Array.isArray(comments) &&
          comments.map((c) => (
            <div key={c._id || c.id} style={styles.commentCard}>
              <strong style={styles.name}>{c.name}</strong>
              <p style={styles.content}>{c.content}</p>
            </div>
          ))}
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={styles.input}
          required
        />

        <textarea
          placeholder="Write your comment..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          style={styles.textarea}
          required
        />

        <button type="submit" disabled={loading} style={styles.button}>
          {loading ? "Sending..." : "Add Comment"}
        </button>
      </form>
    </div>
  );
}

const styles = {
  container: {
    marginTop: "30px",
  },
  title: {
    marginBottom: "15px",
  },
  list: {
    marginBottom: "20px",
  },
  commentCard: {
    background: "#fff",
    padding: "10px 15px",
    borderRadius: "8px",
    marginBottom: "10px",
    boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
  },
  name: {
    display: "block",
    marginBottom: "5px",
    fontSize: "14px",
  },
  content: {
    margin: 0,
    color: "#444",
  },
  empty: {
    color: "#777",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    background: "#fff",
    padding: "15px",
    borderRadius: "8px",
    boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
  },
  input: {
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #ccc",
  },
  textarea: {
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    minHeight: "80px",
    resize: "vertical",
  },
  button: {
    padding: "10px",
    borderRadius: "6px",
    border: "none",
    background: "#111",
    color: "#fff",
    cursor: "pointer",
  },
};