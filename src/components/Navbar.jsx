import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/userContext";
import MobileMenu from "./MobileMenu";
import { DarkModeContext } from "../context/DarkModeContext";

function Navbar() {
  const { setUserInfo, userInfo } = useContext(UserContext);
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const { darkMode, setDarkMode } = useContext(DarkModeContext);

  const changeTheme = () => {
    setDarkMode(!darkMode);
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUserInfo(null);
    navigate("/login");
    setMenuOpen(false);
  };

  return (
    <>
      <div className="navbar">
        <header className="navbar-header">
          <Link to="/" className="logo">
            Goga Blog
          </Link>

          {/* Hamburger icon */}
          <button className="hamburger" onClick={() => setMenuOpen(true)}>
            &#9776;
          </button>

          {/* Desktop nav */}
          <nav className="nav-desktop">
            {userInfo ? (
              <>
                <Link className="nav-link" to="/create">
                  Create New Article
                </Link>
                <a className="nav-link" onClick={changeTheme}>
                  Toggle Theme
                </a>

                <a className="nav-link" onClick={logout}>
                  Logout
                </a>
              </>
            ) : (
              <>
                <Link className="nav-link" to="/login">
                  Login
                </Link>
                <Link className="nav-link" to="/register">
                  Register
                </Link>
              </>
            )}
          </nav>
        </header>
      </div>

      <MobileMenu
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        userInfo={userInfo}
        logout={logout}
      />
    </>
  );
}

export default Navbar;
