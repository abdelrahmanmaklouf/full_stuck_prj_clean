import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav style={styles.nav}>
      <div style={styles.left}>
        <Link to="/" style={styles.logo}>
          BlogApp
        </Link>

        {user && (
          <>
            <Link to="/" style={styles.link}>Home</Link>
            <Link to="/create" style={styles.link}>Create Post</Link>
          </>
        )}

        {user?.role === "admin" && (
          <Link to="/admin" style={styles.link}>
            Admin
          </Link>
        )}
      </div>

      <div style={styles.right}>
        {user ? (
          <>
            <span style={styles.user}>
              {user.email}
            </span>
            <button onClick={handleLogout} style={styles.button}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" style={styles.link}>Login</Link>
            <Link to="/register" style={styles.link}>Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    padding: "10px 20px",
    background: "#111",
    color: "#fff",
    alignItems: "center",
  },
  left: {
    display: "flex",
    gap: "15px",
    alignItems: "center",
  },
  right: {
    display: "flex",
    gap: "10px",
    alignItems: "center",
  },
  logo: {
    fontWeight: "bold",
    color: "#fff",
    textDecoration: "none",
    fontSize: "18px",
  },
  link: {
    color: "#ddd",
    textDecoration: "none",
  },
  user: {
    color: "#aaa",
    fontSize: "14px",
  },
  button: {
    padding: "5px 10px",
    cursor: "pointer",
  },
};