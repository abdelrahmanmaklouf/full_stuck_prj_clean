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

      const res = await api.get("/posts", {
        params: { page, sort, search, category },
      });

      const data = res.data;

      const postsData =
        data.posts || data.data || data.rows || data;

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

      await api.post(`/posts/${id}/like`);

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
    <div style={styles.container}>

      {/* Header */}
      <div style={styles.header}>
        <h1 style={styles.title}>📝 Posts</h1>

        <div>
          {!isLoggedIn ? (
            <>
              <button style={styles.primaryBtn} onClick={() => navigate("/login")}>
                Login
              </button>

              <button style={styles.secondaryBtn} onClick={() => navigate("/register")}>
                Sign Up
              </button>
            </>
          ) : (
            <button
              style={styles.dangerBtn}
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

      {/* Filters */}
      <div style={styles.filters}>
        <input
          placeholder="Search posts..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          style={styles.input}
        />

        <select
          value={category}
          onChange={(e) => {
            setCategory(e.target.value);
            setPage(1);
          }}
          style={styles.select}
        >
          <option value="">All Categories</option>
          <option value="1">Tech</option>
          <option value="2">Sports</option>
        </select>

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          style={styles.select}
        >
          <option value="latest">Latest</option>
          <option value="likes">Most Liked</option>
        </select>
      </div>

      {/* States */}
      {loading && <p style={styles.center}>Loading...</p>}
      {error && <p style={styles.error}>{error}</p>}
      {!loading && !error && posts.length === 0 && (
        <p style={styles.center}>No posts available</p>
      )}

      {/* Posts */}
      <div style={styles.grid}>
        {posts.map((post) => (
          <div
            key={post.id}
            style={styles.card}
            onClick={() => navigate(`/posts/${post.id}`)}
          >
            <h3 style={styles.postTitle}>{post.title}</h3>

            <p style={styles.postContent}>
              {post.content ? post.content.slice(0, 120) : "No content"}...
            </p>

            <div style={styles.actions}>
              {isLoggedIn ? (
                <button
                  style={styles.likeBtn}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleLike(post.id);
                  }}
                >
                  ❤️ {post.likes || 0}
                </button>
              ) : (
                <button
                  style={styles.likeBtn}
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate("/login");
                  }}
                >
                  Login ❤️ {post.likes || 0}
                </button>
              )}
            </div>

            <div style={{ marginTop: "10px" }}>
              {isLoggedIn ? (
                <Comments postId={post.id} />
              ) : (
                <button style={styles.smallBtn} onClick={() => navigate("/login")}>
                  Login to view comments
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div style={styles.pagination}>
        <button
          style={styles.pageBtn}
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
          disabled={page === 1}
        >
          Prev
        </button>

        <span>
          Page {page} of {totalPages}
        </span>

        <button
          style={styles.pageBtn}
          onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
          disabled={page === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: "20px",
    maxWidth: "1000px",
    margin: "auto",
    background: "#f7f7f7",
    minHeight: "100vh",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "20px",
  },
  title: {
    margin: 0,
  },
  filters: {
    display: "flex",
    gap: "10px",
    marginBottom: "20px",
  },
  input: {
    padding: "10px",
    flex: 1,
    borderRadius: "6px",
    border: "1px solid #ccc",
  },
  select: {
    padding: "10px",
    borderRadius: "6px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "1fr",
    gap: "15px",
  },
  card: {
    background: "#fff",
    padding: "15px",
    borderRadius: "10px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
    cursor: "pointer",
    transition: "0.2s",
  },
  postTitle: {
    marginBottom: "10px",
  },
  postContent: {
    color: "#555",
  },
  actions: {
    marginTop: "10px",
  },
  likeBtn: {
    padding: "6px 10px",
    borderRadius: "6px",
    border: "none",
    cursor: "pointer",
    background: "#eee",
  },
  smallBtn: {
    padding: "6px 10px",
    fontSize: "12px",
  },
  pagination: {
    marginTop: "20px",
    display: "flex",
    justifyContent: "center",
    gap: "10px",
    alignItems: "center",
  },
  pageBtn: {
    padding: "8px 12px",
  },
  primaryBtn: {
    marginRight: "10px",
    padding: "6px 12px",
  },
  secondaryBtn: {
    padding: "6px 12px",
  },
  dangerBtn: {
    padding: "6px 12px",
    background: "red",
    color: "#fff",
    border: "none",
  },
  center: {
    textAlign: "center",
  },
  error: {
    color: "red",
    textAlign: "center",
  },
};