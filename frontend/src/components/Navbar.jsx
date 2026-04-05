import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav style={{ padding: "10px", background: "#ddd" }}>
      <Link to="/">Home</Link> |{" "}
      <Link to="/create">Create Post</Link> |{" "}
      <Link to="/login">Login</Link> |{" "}
      <Link to="/admin/posts">Admin</Link>
    </nav>
  );
}