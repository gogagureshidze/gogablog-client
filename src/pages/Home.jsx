import React, { useEffect, useState } from "react";
import Post from "../components/Post";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { LoadingScreen } from "../components/LoadingScreen";

function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/post")
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
    return (
      <LoadingScreen></LoadingScreen>
    );
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
    </div>
  );
}

export default Home;
