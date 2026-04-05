import { useEffect, useState } from "react";
import api from "../../services/api";

export default function Comments() {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = async () => {
    try {
      setLoading(true);
      const res = await api.get("/comments");
      setComments(res.data);
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
      <h2>Comments</h2>

      {comments.map((c) => (
        <div key={c.id} style={{ border: "1px solid #ccc", margin: 10, padding: 10 }}>
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