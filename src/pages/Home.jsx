import React, { useContext, useEffect, useState } from "react";
import Post from "../components/Post";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { LoadingScreen } from "../components/LoadingScreen";
import { Snackbar, Alert } from "@mui/material";
import { UserContext } from "../context/userContext";

function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAdminWelcome, setShowAdminWelcome] = useState(false);
  const [username, setUsername] = useState("");
  const { userInfo } = useContext(UserContext);

  console.log(userInfo);
  useEffect(() => {
    try {
      if (userInfo.user.isAdmin === true) {
        setUsername(userInfo.user.username);
        setShowAdminWelcome(true);
      }
    } catch (error) {
      console.error("Error parsing user data from localStorage:", error);
    }
  }, []);

  useEffect(() => {
    fetch("https://gogablog-api.onrender.com/api/post")
      .then((response) => response.json())
      .then((posts) => {
        setPosts(posts);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <div
      className="container"
      style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
    >
      <Navbar />

      <div style={{ flex: 1 }}>
        {posts.length > 0 ? (
          posts.map((post) => <Post key={post._id} {...post} />)
        ) : (
          <h2
            style={{
              textAlign: "center",
              fontFamily: "monospace",
              marginTop: "70px",
              color: "#555",
            }}
          >
            There are no posts.
          </h2>
        )}
      </div>

      <Footer />

      <Snackbar
        open={showAdminWelcome}
        autoHideDuration={4000}
        onClose={() => setShowAdminWelcome(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => setShowAdminWelcome(false)}
          severity="info"
          sx={{ width: "100%" }}
        >
          Welcome Mr. Admin, {username}!
        </Alert>
      </Snackbar>
    </div>
  );
}

export default Home;
