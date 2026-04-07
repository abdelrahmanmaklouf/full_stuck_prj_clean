import { Link, useLocation } from "react-router-dom";

export default function Sidebar() {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <div style={styles.sidebar}>
      <h2 style={styles.title}>⚙️ Admin Panel</h2>

      <ul style={styles.menu}>
        <li>
          <Link
            to="/admin/posts"
            style={{
              ...styles.link,
              ...(isActive("/admin/posts") ? styles.active : {}),
            }}
          >
            📝 Posts
          </Link>
        </li>

        <li>
          <Link
            to="/admin/comments"
            style={{
              ...styles.link,
              ...(isActive("/admin/comments") ? styles.active : {}),
            }}
          >
            💬 Comments
          </Link>
        </li>

        <li>
          <Link
            to="/admin/categories"
            style={{
              ...styles.link,
              ...(isActive("/admin/categories") ? styles.active : {}),
            }}
          >
            📂 Categories
          </Link>
        </li>

        <li>
          <Link
            to="/admin/tags"
            style={{
              ...styles.link,
              ...(isActive("/admin/tags") ? styles.active : {}),
            }}
          >
            🏷️ Tags
          </Link>
        </li>
      </ul>
    </div>
  );
}

const styles = {
  sidebar: {
    width: "220px",
    background: "#111",
    color: "#fff",
    height: "100vh",
    padding: "20px",
    position: "fixed",
    left: 0,
    top: 0,
  },
  title: {
    marginBottom: "30px",
    fontSize: "20px",
  },
  menu: {
    listStyle: "none",
    padding: 0,
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  link: {
    textDecoration: "none",
    color: "#ccc",
    padding: "10px",
    borderRadius: "6px",
    display: "block",
    transition: "0.2s",
  },
  active: {
    background: "#fff",
    color: "#111",
    fontWeight: "bold",
  },
};