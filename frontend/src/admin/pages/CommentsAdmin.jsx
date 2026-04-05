import { useEffect, useState } from "react";
import api from "../../services/api";

export default function CommentsAdmin() {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = async () => {
    const res = await api.get("/comments");
    setComments(res.data);
  };

  const approveComment = async (id) => {
    await api.patch(`/comments/${id}/approve`);
    fetchComments();
  };

  const deleteComment = async (id) => {
    await api.delete(`/comments/${id}`);
    fetchComments();
  };

  return (
    <div>
      <h2>Manage Comments</h2>

      {comments.map((c) => (
        <div key={c.id}>
          <p>{c.content}</p>
          <small>Status: {c.status}</small>

          <br />

          <button onClick={() => approveComment(c.id)}>Approve</button>
          <button onClick={() => deleteComment(c.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}