import { Outlet, Link } from "react-router-dom";

export default function AdminLayout() {
  return (
    <div style={{ display: "flex" }}>
      
      {/* Sidebar */}
      <div style={{ width: "200px", background: "#eee", padding: "10px" }}>
        <h3>Admin</h3>

        <ul>
          <li><Link to="/admin/posts">Posts</Link></li>
          <li><Link to="/admin/comments">Comments</Link></li>
          <li><Link to="/admin/categories">Categories</Link></li>
          <li><Link to="/admin/tags">Tags</Link></li>
        </ul>
      </div>

      {/* Content */}
      <div style={{ flex: 1, padding: "20px" }}>
        <Outlet />
      </div>

    </div>
  );
}