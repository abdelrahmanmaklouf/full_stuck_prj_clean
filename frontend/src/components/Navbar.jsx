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
      <div style={styles.container}>

        {/* Left Section */}
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

        {/* Right Section */}
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

      </div>
    </nav>
  );
}

const styles = {
  nav: {
    position: "sticky",
    top: 0,
    zIndex: 1000,
    background: "rgba(17, 17, 24, 0.7)",
    backdropFilter: "blur(12px)",
    borderBottom: "1px solid rgba(255,255,255,0.1)",
  },
  container: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "12px 20px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  left: {
    display: "flex",
    gap: "20px",
    alignItems: "center",
  },
  right: {
    display: "flex",
    gap: "12px",
    alignItems: "center",
  },
  logo: {
    fontWeight: "bold",
    color: "#fff",
    textDecoration: "none",
    fontSize: "20px",
    background: "linear-gradient(135deg, #7C3AED, #A78BFA)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },
  link: {
    color: "#A1A1AA",
    textDecoration: "none",
    fontSize: "14px",
    transition: "0.3s",
  },
  user: {
    color: "#A1A1AA",
    fontSize: "14px",
  },
  button: {
    padding: "6px 12px",
    borderRadius: "8px",
    border: "1px solid rgba(255,255,255,0.1)",
    background: "linear-gradient(135deg, #7C3AED, #A78BFA)",
    color: "#fff",
    cursor: "pointer",
    transition: "0.3s",
  },
};