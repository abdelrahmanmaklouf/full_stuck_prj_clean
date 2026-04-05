import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div style={{ width: "200px", background: "#eee", height: "100vh", padding: "10px" }}>
      <h3>Admin</h3>

      <ul style={{ listStyle: "none", padding: 0 }}>
        <li><Link to="/admin/posts">Posts</Link></li>
        <li><Link to="/admin/comments">Comments</Link></li>
        <li><Link to="/admin/categories">Categories</Link></li>
        <li><Link to="/admin/tags">Tags</Link></li>
      </ul>
    </div>
  );
}