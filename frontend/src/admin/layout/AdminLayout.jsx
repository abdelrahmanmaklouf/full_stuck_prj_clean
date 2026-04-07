import { Outlet } from "react-router-dom";
import AdminSidebar from "./Sidebar";

export default function AdminLayout() {
  return (
    <div style={{ display: "flex" }}>
      <AdminSidebar />

      <div style={{ marginLeft: "220px", padding: "20px", width: "100%" }}>
        <Outlet />
      </div>
    </div>
  );
} 