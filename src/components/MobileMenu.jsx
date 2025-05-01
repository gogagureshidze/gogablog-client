import React, { useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { DarkModeContext } from "../context/DarkModeContext";

function MobileMenu({ menuOpen, setMenuOpen, userInfo, logout }) {
  const { darkMode, setDarkMode } = useContext(DarkModeContext);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "auto";
  }, [menuOpen]);

  const changeTheme = () => {
    setDarkMode(!darkMode);
    setMenuOpen(false);
  }
  return (
    <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
      <div className="menu-links">
        {userInfo ? (
          <>
            <Link to="/" onClick={() => setMenuOpen(false)}>
              Home
            </Link>
            <Link to="/create" onClick={() => setMenuOpen(false)}>
              Create New Article
            </Link>
            <a onClick={changeTheme}>Toggle Theme</a>

            <a onClick={logout}>Logout</a>
            <a style={{ marginTop: "40px" }} onClick={() => setMenuOpen(false)}>
              Cancel
            </a>
          </>
        ) : (
          <>
            <Link to="/login" onClick={() => setMenuOpen(false)}>
              Login
            </Link>
            <Link to="/register" onClick={() => setMenuOpen(false)}>
              Register
            </Link>
            <a style={{ marginTop: "50px" }} onClick={() => setMenuOpen(false)}>
              Cancel
            </a>
          </>
        )}
      </div>
    </div>
  );
}


export default MobileMenu;