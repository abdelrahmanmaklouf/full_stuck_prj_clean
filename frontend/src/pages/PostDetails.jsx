import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";
import { addComment } from "../services/commentService";
import { toggleLike } from "../services/postService";

export default function PostDetails() {
  const { id } = useParams();

  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [content, setContent] = useState("");

  useEffect(() => {
    fetchPost();
    fetchComments();
  }, []);

  const fetchPost = async () => {
    const res = await api.get(`/posts/${id}`);
    setPost(res.data);
  };

  const fetchComments = async () => {
    const res = await api.get(`/comments?postId=${id}`);
    setComments(res.data);
  };

  const handleLike = async () => {
    await toggleLike(id);
    fetchPost();
  };

  const handleComment = async () => {
    if (!content) return;

    await addComment({
      content,
      postId: id,
    });

    setContent("");
    fetchComments();
  };

  if (!post) return <p>Loading...</p>;

  return (
    <div id="app">
      {/* Post */}
      <div className="card">
        <h1>{post.title}</h1>
        <p>{post.content}</p>

        <button onClick={handleLike}>
          👍 Like ({post.likes || 0})
        </button>
      </div>

      {/* Add Comment */}
      <div className="card">
        <h2>Add Comment</h2>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write a comment..."
        />
        <button onClick={handleComment}>Post</button>
      </div>

      {/* Comments */}
      <div className="feed">
        {comments.map((c) => (
          <div key={c.id} className="card">
            <strong style={{ color: "#c084fc" }}>
              {c.User?.name}
            </strong>
            <p>{c.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}