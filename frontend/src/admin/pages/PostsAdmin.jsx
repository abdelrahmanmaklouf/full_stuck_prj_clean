import { useEffect, useState } from "react";
import api from "../../services/api";

export default function PostsAdmin() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    const res = await api.get("/posts");
    setPosts(res.data);
  };

  const deletePost = async (id) => {
    await api.delete(`/posts/${id}`);
    fetchPosts();
  };

  return (
    <div>
      <h2>Manage Posts</h2>

      {posts.map((post) => (
        <div key={post.id}>
          <h4>{post.title}</h4>
          <button onClick={() => deletePost(post.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}