import { useEffect, useState } from "react";
import Comments from "../components/Comments";

const API_URL = import.meta.env.VITE_API_URL;

export default function Home() {
  const [posts, setPosts] = useState([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("latest");

  const [totalPages, setTotalPages] = useState(1);

  // ✅ auth
  const token = localStorage.getItem("token");
  const isLoggedIn = !!token;

  // ✅ fetch posts whenever anything changes
  useEffect(() => {
    fetchPosts();
  }, [page, sort, category, search]);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      setError(null);

      let url = `${API_URL}/api/posts?page=${page}&sort=${sort}`;

      if (search) url += `&search=${search}`;
      if (category) url += `&category=${category}`;

      const res = await fetch(url);

      if (!res.ok) throw new Error("Request failed");

      const data = await res.json();

      setPosts(data.posts || []);
      setTotalPages(data.pages || 1);
    } catch (err) {
      console.error(err);
      setError("Failed to load posts");
    } finally {
      setLoading(false);
    }
  };

  const handleLike = async (id) => {
    try {
      if (!isLoggedIn) {
        window.location.href = "/login";
        return;
      }

      await fetch(`${API_URL}/api/posts/${id}/like`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setPosts((prev) =>
        prev.map((p) =>
          p.id === id ? { ...p, likes: p.likes + 1 } : p
        )
      );
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h1>Posts</h1>

      {/* 🔍 Search */}
      <input
        placeholder="Search posts..."
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setPage(1); // reset pagination on search
        }}
      />

      {/* 🏷 Category */}
      <select
        value={category}
        onChange={(e) => {
          setCategory(e.target.value);
          setPage(1);
        }}
      >
        <option value="">All Categories</option>
        <option value="1">Tech</option>
        <option value="2">Sports</option>
      </select>

      {/* 🔃 Sort */}
      <select
        value={sort}
        onChange={(e) => setSort(e.target.value)}
      >
        <option value="latest">Latest</option>
        <option value="likes">Most Liked</option>
      </select>

      {/* ⏳ Loading */}
      {loading && <p>Loading...</p>}

      {/* ❌ Error */}
      {error && <p>{error}</p>}

      {/* 📄 Empty */}
      {!loading && posts.length === 0 && (
        <p>No posts available</p>
      )}

      {/* 📄 Posts */}
      {posts.map((post) => (
        <div
          key={post.id}
          style={{
            border: "1px solid #ccc",
            margin: "10px",
            padding: "10px",
          }}
        >
          <h3>{post.title}</h3>
          <p>{post.content}</p>

          {/* ❤️ Like */}
          {isLoggedIn ? (
            <button onClick={() => handleLike(post.id)}>
              ❤️ {post.likes}
            </button>
          ) : (
            <button onClick={() => (window.location.href = "/login")}>
              Login to like ❤️ {post.likes}
            </button>
          )}

          {/* 💬 Comments */}
          {isLoggedIn ? (
            <Comments postId={post.id} />
          ) : (
            <p>
              <a href="/login">Login</a> to view and add comments
            </p>
          )}
        </div>
      ))}

      {/* 📄 Pagination */}
      <div style={{ marginTop: "20px" }}>
        <button
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
          disabled={page === 1}
        >
          Prev
        </button>

        <span>
          {" "}
          Page {page} of {totalPages}{" "}
        </span>

        <button
          onClick={() =>
            setPage((p) => Math.min(p + 1, totalPages))
          }
          disabled={page === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}