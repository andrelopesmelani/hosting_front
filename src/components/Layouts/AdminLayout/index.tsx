import { Outlet } from "react-router-dom";
import Sidebar from "@/components/Layouts/Sidebar";
import "./styles.scss";

const AdminLayout = () => {
  return (
    <div className="admin-layout" style={{ display: "flex" }}>
      <Sidebar />
      <main style={{ flex: 1, padding: '40px' }}>
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
