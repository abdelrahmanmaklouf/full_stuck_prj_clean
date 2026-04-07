import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../admin/layout/Sidebar";

export default function MainLayout() {
  const location = useLocation();

  // نحدد هل الصفحة Admin ولا لا
  const isAdmin = location.pathname.startsWith("/admin");

  return (
    <div style={styles.wrapper}>
      {/* Navbar يظهر في كل الصفحات */}
      <Navbar />

      <div style={styles.container}>
        {/* Sidebar يظهر فقط في admin */}
        {isAdmin && <Sidebar />}

        <main
          style={{
            ...styles.main,
            marginLeft: isAdmin ? "200px" : "0",
          }}
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
}

const styles = {
  wrapper: {
    minHeight: "100vh",
    background: "#0A0A0F",
    color: "#fff",
  },
  container: {
    display: "flex",
  },
  main: {
    flex: 1,
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "20px",
  },
};