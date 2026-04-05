import { useEffect, useState } from "react";
import api from "../../../services/api";
import { Link } from "react-router-dom";

export default function PostsList() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    const res = await api.get("/posts");
    setPosts(res.data);
  };

  const handleDelete = async (id) => {
    await api.delete(`/posts/${id}`);
    fetchPosts();
  };

  return (
    <div>
      <h2>Posts</h2>

      <Link to="/admin/posts/new">Create Post</Link>

      {posts.map((post) => (
        <div key={post.id} style={{ border: "1px solid #ccc", margin: 10, padding: 10 }}>
          <h4>{post.title}</h4>

          <Link to={`/admin/posts/edit/${post.id}`}>Edit</Link>

          <button onClick={() => handleDelete(post.id)}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}