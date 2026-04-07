import { useEffect, useState } from "react";
import api from "../../services/api";

export default function Comments({ postId }) {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchComments();
  }, [postId]);

  const fetchComments = async () => {
    try {
      setLoading(true);

      // ✅ ربط الكومنتات بالبوست
      const res = await api.get(`/comments?postId=${postId}`);

      // ✅ عرض approved فقط
      const approved = res.data.filter(
        (c) => c.status === "approved"
      );

      setComments(approved);

    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const approveComment = async (id) => {
    await api.put(`/comments/${id}/approve`);
    fetchComments();
  };

  const deleteComment = async (id) => {
    await api.delete(`/comments/${id}`);
    fetchComments();
  };

  if (loading) return <p>Loading comments...</p>;

  return (
    <div>
      <h2>Comments ({comments.length})</h2>

      {comments.length === 0 && <p>No comments yet</p>}

      {comments.map((c) => (
        <div
          key={c.id}
          style={{
            border: "1px solid #ccc",
            margin: 10,
            padding: 10,
            borderRadius: "8px",
          }}
        >
          <p><b>{c.name}</b></p>
          <p>{c.content}</p>
          <p>Status: {c.status}</p>

          {c.status !== "approved" && (
            <button onClick={() => approveComment(c.id)}>
              Approve
            </button>
          )}

          <button onClick={() => deleteComment(c.id)}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}