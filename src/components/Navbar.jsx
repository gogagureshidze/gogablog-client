import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/userContext";

function Navbar() {
  const { setUserInfo, userInfo } = useContext(UserContext);
  const navigate = useNavigate();


  const logout = () => {
    localStorage.clear()
    setUserInfo(null);
    navigate("/login");
  };


  return (
    <div
      className="navbar"
      style={{
        backgroundColor: "#14274E", // dark blue background
        margin: 0,
        padding: "10px 20px",
        color: "white",
        borderBottom: "1px solid rgba(255,255,255,0.1)",
        position: "relative",
        zIndex: 1000,
      }}
    >
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        <Link
          to="/"
          className="logo"
          style={{
            color: "white",
            fontSize: "24px",
            fontWeight: "bold",
            textDecoration: "none",
            fontFamily: "monospace",
          }}
        >
          Goga Blog
        </Link>
        <nav
          style={{
            display: "flex",
            gap: "15px",
            alignItems: "center",
          }}
        >
          {userInfo ? (
            <>
              <Link
                className="nav-link"
                style={{ marginRight: "10px" }}
                to="/create"
              >
                Create New Article
              </Link>
              {/*eslint-disable-next-line */}
              <a className="nav-link" onClick={logout}>
                Logout
              </a>
            </>
          ) : (
            <>
              <Link className="nav-link" to="/login">
                Login
              </Link>
              <Link to="/register" className="nav-link">
                Register
              </Link>
            </>
          )}
        </nav>
      </header>
    </div>
  );
}



export default Navbar;
