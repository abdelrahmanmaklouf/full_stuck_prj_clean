import { Link } from "react-router-dom";

export default function AdminSidebar() {
  return (
    <aside style={styles.sidebar}>
      <h2 style={styles.title}>Admin Panel</h2>

      <nav style={styles.nav}>
        <Link to="/admin" style={styles.link}>
          Dashboard
        </Link>

        <Link to="/admin/posts" style={styles.link}>
          Posts
        </Link>

        <Link to="/admin/comments" style={styles.link}>
          Comments
        </Link>

        <Link to="/admin/categories" style={styles.link}>
          Categories
        </Link>
      </nav>
    </aside>
  );
}

const styles = {
  sidebar: {
    width: "220px",
    height: "100vh",
    background: "#111",
    color: "#fff",
    padding: "20px",
    position: "fixed",
    left: 0,
    top: 0,
  },
  title: {
    marginBottom: "20px",
    fontSize: "18px",
  },
  nav: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  link: {
    color: "#ccc",
    textDecoration: "none",
    padding: "8px",
    borderRadius: "4px",
  },
};