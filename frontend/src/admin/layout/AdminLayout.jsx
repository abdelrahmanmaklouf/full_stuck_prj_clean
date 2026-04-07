import { Outlet } from "react-router-dom";
import AdminSidebar from "./Sidebar";

export default function AdminLayout() {
  return (
    <div style={styles.container}>
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content */}
      <div style={styles.main}>
        <Outlet />
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    minHeight: "100vh",
    background: "#f4f6f9",
  },
  main: {
    marginLeft: "220px",
    padding: "25px",
    width: "100%",
    background: "#f4f6f9",
  },
};