import { NavLink, useNavigate } from "react-router-dom";
import "./styles.scss";

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };
  return (
    <header className="user-header">
      <div className="user-header__container">
        <h1 className="user-header__logo">HostPro</h1>
        <nav className="user-header__nav">
          <NavLink to="/plans">Plans</NavLink>
          <NavLink to="/my-domains">My Domains</NavLink>
          <button
            onClick={handleLogout}
            className="user-header__login-btn"
          >
            Logout
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
