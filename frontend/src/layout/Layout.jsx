import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function Layout() {
  return (
    <div>
      <Navbar />

      <div style={{ padding: "20px" }}>
        <Outlet />
      </div>
    </div>
  );
}