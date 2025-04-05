import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { adminRoutes } from "@/constants/routes";
import { LogOut, Menu, X } from "lucide-react";
import "./styles.scss";

const Sidebar = () => {
  const navigate = useNavigate();

  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleCollapse = () => setCollapsed((prev) => !prev);
  const toggleMobile = () => setMobileOpen((prev) => !prev);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <>
      <button className="sidebar__mobile-toggle" onClick={toggleMobile}>
        {mobileOpen ? <X /> : <Menu />}
      </button>

      <aside
        className={`sidebar ${collapsed ? "collapsed" : ""} ${
          mobileOpen ? "open" : ""
        }`}
      >
        <div className="sidebar__header">
          {!collapsed && <h2>Admin</h2>}
          <button
            className={
              collapsed ? `sidebar__collapse-btn` : "sidebar__collapse-button"
            }
            onClick={toggleCollapse}
          >
            <Menu />
          </button>
        </div>

        <nav className="sidebar__nav">
          {adminRoutes.map(({ path, label, icon: Icon }) => (
            <NavLink
              key={path}
              to={path}
              className={({ isActive }) =>
                `sidebar__link ${isActive ? "active" : ""}`
              }
              onClick={() => setMobileOpen(false)}
            >
              <Icon className="sidebar__icon" />
              {!collapsed && <span className="sidebar__label">{label}</span>}
            </NavLink>
          ))}
        </nav>

        <div className="sidebar__footer">
          <button className="sidebar__logout" onClick={handleLogout}>
            <LogOut className="sidebar__icon" />
            {!collapsed && <span className="sidebar__label">Logout</span>}
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
