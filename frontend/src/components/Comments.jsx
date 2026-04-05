import { useEffect, useState } from "react";
import { getComments, addComment } from "../services/commentService";

export default function Comments({ postId }) {
  const [comments, setComments] = useState([]);

  const [name, setName] = useState("");
  const [content, setContent] = useState("");

  const [loading, setLoading] = useState(false);

  // load comments
  useEffect(() => {
    fetchComments();
  }, [postId]);

  const fetchComments = async () => {
    try {
      const res = await getComments(postId);

      // غالبًا هترجع pending + approved
      const approved = res.data.filter(c => c.status === "approved");

      setComments(approved);
    } catch (err) {
      console.error(err);
    }
  };

  // add comment
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

    } catch (err) {
      alert("Error adding comment");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h4>Comments</h4>

      {/* list */}
      {comments.map((c) => (
        <div key={c.id}>
          <strong>{c.name}</strong>
          <p>{c.content}</p>
        </div>
      ))}

      {/* form */}
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <textarea
          placeholder="Write comment"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <button disabled={loading}>
          {loading ? "Sending..." : "Add Comment"}
        </button>
      </form>
    </div>
  );
}