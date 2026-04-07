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
    <div style={styles.container}>
      <h2 style={styles.title}>💬 Manage Comments</h2>

      <div style={styles.card}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th>Content</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {comments.map((c) => (
              <tr key={c.id} style={styles.row}>
                <td style={styles.content}>{c.content}</td>

                <td>
                  <span
                    style={{
                      ...styles.badge,
                      background:
                        c.status === "approved" ? "#d4edda" : "#fff3cd",
                      color:
                        c.status === "approved" ? "#155724" : "#856404",
                    }}
                  >
                    {c.status}
                  </span>
                </td>

                <td style={styles.actions}>
                  <button
                    style={styles.approveBtn}
                    onClick={() => approveComment(c.id)}
                  >
                    Approve
                  </button>

                  <button
                    style={styles.deleteBtn}
                    onClick={() => deleteComment(c.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: "20px",
  },
  title: {
    marginBottom: "20px",
  },
  card: {
    background: "#fff",
    padding: "15px",
    borderRadius: "10px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
    overflowX: "auto",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
  },
  row: {
    borderBottom: "1px solid #eee",
  },
  content: {
    maxWidth: "400px",
    padding: "10px",
  },
  actions: {
    display: "flex",
    gap: "10px",
    padding: "10px",
  },
  badge: {
    padding: "5px 10px",
    borderRadius: "6px",
    fontSize: "12px",
    fontWeight: "bold",
    textTransform: "capitalize",
  },
  approveBtn: {
    padding: "6px 10px",
    border: "none",
    borderRadius: "6px",
    background: "#28a745",
    color: "#fff",
    cursor: "pointer",
  },
  deleteBtn: {
    padding: "6px 10px",
    border: "none",
    borderRadius: "6px",
    background: "#dc3545",
    color: "#fff",
    cursor: "pointer",
  },
};