import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Comments from "../components/Comments";
import api from "../services/api";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("latest");

  const [totalPages, setTotalPages] = useState(1);

  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const isLoggedIn = !!token;

  useEffect(() => {
    fetchPosts();
  }, [page, sort, category, search]);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await api.get("/api/posts", {
        params: {
          page,
          sort,
          search,
          category,
        },
      });

      const data = res.data;

      console.log("API RESPONSE:", data); // 🔥 مهم للتشخيص

      // ✅ دعم كل أشكال الريسبونس
      const postsData =
        data.posts ||
        data.data ||
        data.rows ||
        data;

      setPosts(Array.isArray(postsData) ? postsData : []);
      setTotalPages(data.pages || data.totalPages || 1);

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
        navigate("/login");
        return;
      }

      await api.post(`/api/posts/${id}/like`);

      setPosts((prev) =>
        prev.map((p) =>
          p.id === id ? { ...p, likes: (p.likes || 0) + 1 } : p
        )
      );
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "900px", margin: "auto" }}>

      {/* 🔥 HEADER */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <h1>📝 Posts</h1>

        <div>
          {!isLoggedIn ? (
            <>
              <button onClick={() => navigate("/login")}>
                Login
              </button>

              <button
                onClick={() => navigate("/register")}
                style={{ marginLeft: "10px" }}
              >
                Sign Up
              </button>
            </>
          ) : (
            <button
              onClick={() => {
                localStorage.removeItem("token");
                window.location.reload();
              }}
            >
              Logout
            </button>
          )}
        </div>
      </div>

      {/* 🔍 Controls */}
      <div
        style={{
          display: "flex",
          gap: "10px",
          flexWrap: "wrap",
          marginBottom: "20px",
        }}
      >
        <input
          placeholder="Search posts..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          style={{ padding: "8px", flex: "1" }}
        />

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

        <select value={sort} onChange={(e) => setSort(e.target.value)}>
          <option value="latest">Latest</option>
          <option value="likes">Most Liked</option>
        </select>
      </div>

      {/* ⏳ Loading */}
      {loading && <p>Loading...</p>}

      {/* ❌ Error */}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* 📭 Empty */}
      {!loading && !error && posts.length === 0 && (
        <p>No posts available</p>
      )}

      {/* 📄 Posts */}
      {posts.map((post) => (
        <div
          key={post.id}
          style={{
            border: "1px solid #ddd",
            borderRadius: "8px",
            padding: "15px",
            marginBottom: "15px",
            background: "#fff",
            cursor: "pointer",
            transition: "0.2s",
          }}
          onClick={() => navigate(`/posts/${post.id}`)}
        >
          <h3>{post.title}</h3>

          <p>
            {post.content
              ? post.content.slice(0, 100)
              : "No content"}...
          </p>

          {/* ❤️ Like */}
          <div style={{ marginTop: "10px" }}>
            {isLoggedIn ? (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleLike(post.id);
                }}
              >
                ❤️ {post.likes || 0}
              </button>
            ) : (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  navigate("/login");
                }}
              >
                Login to like ❤️ {post.likes || 0}
              </button>
            )}
          </div>

          {/* 💬 Comments */}
          <div style={{ marginTop: "10px" }}>
            {isLoggedIn ? (
              <Comments postId={post.id} />
            ) : (
              <p>
                <button onClick={() => navigate("/login")}>
                  Login
                </button>{" "}
                to view comments
              </p>
            )}
          </div>
        </div>
      ))}

      {/* 📄 Pagination */}
      <div style={{ marginTop: "20px", textAlign: "center" }}>
        <button
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
          disabled={page === 1}
        >
          Prev
        </button>

        <span style={{ margin: "0 10px" }}>
          Page {page} of {totalPages}
        </span>

        <button
          onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
          disabled={page === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}