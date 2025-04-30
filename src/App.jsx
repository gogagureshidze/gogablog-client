import "./App.css";
import { HashRouter, Routes, Route } from "react-router-dom"; // Changed to HashRouter
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Create from "./pages/Create";
import PostPage from "./pages/PostPage";
import EditPost from "./pages/EditPost";
import ForgotPassword from "./pages/ForgotPassword";

import { UserContext } from "./context/userContext";
import React, { useContext, useState } from "react";
import { LoadingScreen } from "./components/LoadingScreen";
import ResetPassword from "./pages/ResetPassword";

function App() {
  const { userInfo } = useContext(UserContext);
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <HashRouter> {/* Updated to HashRouter */}
      {!isLoaded && <LoadingScreen onComplete={() => setIsLoaded(true)} />}

      <div className={`fade-in-container ${isLoaded ? "loaded" : ""}`}>
        <Routes>
          <Route path="/" element={userInfo ? <Home /> : <Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/create" element={<Create />} />
          <Route path="/post/:id" element={<PostPage />} />
          <Route path="/edit/:id" element={<EditPost />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route
            path="/api/reset-password/:userId/:token"
            element={<ResetPassword />}
          />
        </Routes>
      </div>
    </HashRouter> 
  );
}

export default App;


//$2a$07$rpw8IvjOygKTTqmENmUtYumFVn5WZ8cZv/YtnOTBLt347akgqDTSa