import { useEffect, useState } from "react";
import api from "../services/api";
import { Link } from "react-router-dom";

export default function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const res = await api.get("/posts");

      console.log("POSTS API:", res.data);

      // ✅ ضمان إن البيانات array
      const postsData = Array.isArray(res.data)
        ? res.data
        : res.data?.posts || [];

      setPosts(postsData);

    } catch (err) {
      console.error(err);
      setPosts([]);
    }
  };

  return (
    <div id="app">
      <h1>🔥 Feed</h1>

      <div className="feed">
        {Array.isArray(posts) &&
          posts.map((post) => (
            <div key={post._id || post.id} className="card">
              <h2>{post.title}</h2>

              <p>
                {post.content
                  ? post.content.slice(0, 120)
                  : ""}...
              </p>

              <div style={{ marginTop: "10px", display: "flex", gap: "10px" }}>
                <span>👍 {post.likes || 0}</span>

                <Link to={`/posts/${post._id || post.id}`} className="btn">
                  View
                </Link>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}