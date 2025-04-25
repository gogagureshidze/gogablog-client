import React, { useEffect } from "react";
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Editor from "../components/Editor";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { LoadingScreen } from "../components/LoadingScreen";
import { Button, CircularProgress, Snackbar, Alert } from "@mui/material";
import { UserContext } from "../context/userContext";
import UploadIcon from "@mui/icons-material/Upload";
import { useContext } from "react";
function EditPost() {
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [uploadMessage, setUploadMessage] = useState("");
  const { id } = useParams();
  const {userInfo} = useContext(UserContext)
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [circularLoading, setCircularLoading] = useState(false);
    const [circularLoadingDelete, setCircularLoadingDelete] = useState(false);


  useEffect(() => {
    fetch("/api/post/" + id).then((response) => {
      response.json().then((postInfo) => {
        setTitle(postInfo.title);
        setSummary(postInfo.summary);
        setContent(postInfo.content);
        setLoading(false);
      });
    });
  }, [id]);

  if (loading) {
    return (
      <div>
        <LoadingScreen></LoadingScreen>
      </div>
    );
  }

  const updatePost = async (e) => {
    e.preventDefault();
    setCircularLoading(true);

    const data = new FormData();

    data.append("title", title);
    data.append("summary", summary);
    data.append("content", content);
    data.append("id", id);

    if (file) {
      data.append("file", file);
    }

    const response = await fetch(
      "https://gogablog-api.onrender.com/api/post/",
      {
        method: "PUT",
        body: data,
        credentials: "include",
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
    );

    if (response.ok) {
      setCircularLoading(false);

      navigate("/post/" + id);
      setError("");
    } else {
      setCircularLoading(false);

      setError(response.message);
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    setCircularLoadingDelete(true);

    const response = await fetch(`/api/post/${id}`, {
      method: "DELETE",
      credentials: "include",
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    });

    if (response.ok) {
      setCircularLoadingDelete(false);

      navigate("/");
      setError("");
    } else {
      setCircularLoadingDelete(false);
      setError(response.message);
    }
  };

return (
  <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
    <Navbar />
    <div style={{ flex: 1 }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginTop: "30px",
        }}
      >
        <div className="edit-post-container">
          <form onSubmit={updatePost}>
            <input
              type="title"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <input
              type="summary"
              value={summary}
              placeholder="Summary"
              onChange={(e) => setSummary(e.target.value)}
            />

            <label htmlFor="file-upload">
              <input
                style={{ display: "none" }}
                id="file-upload"
                name="file-upload"
                type="file"
                onChange={(ev) => {
                  const file = ev.target.files[0];
                  if (file) {
                    setFile(ev.target.files[0]);
                    setUploadMessage(`"${file.name}" uploaded successfully`);
                    setSnackbarOpen(true);
                  }
                }}
              />
              <Button
                variant="contained"
                component="span"
                startIcon={<UploadIcon />}
                fullWidth
                sx={{
                  backgroundColor: "#facc15",
                  color: "#14274E",
                  fontWeight: 700,
                  py: 1.5,
                  borderRadius: "8px",
                  textTransform: "none",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    backgroundColor: "#14274E",
                    color: "#facc15",
                  },
                }}
              >
                Upload Cover Image
              </Button>
            </label>
            <Editor onChange={setContent} value={content}></Editor>
            <Button
              type="submit"
              variant="contained"
              size="large"
              sx={{
                backgroundColor: "#14274E",
                color: "#FFFFFF",
                marginTop: "20px",
                transition: "all 0.3s ease",
                "&:hover": {
                  backgroundColor: "#FACC15",
                  color: "#14274E",
                  transform: "translateY(1px)",
                  fontWeight: "900",
                },
              }}
              disabled={circularLoading}
            >
              {circularLoading ? (
                <CircularProgress size={24} />
              ) : (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "10px",
                    textTransform: "capitalize",
                    fontWeight: "bold",
                  }}
                >
                  Edit Post
                </div>
              )}
            </Button>
            <Button
              onClick={handleDelete}
              variant="contained"
              size="large"
              sx={{
                backgroundColor: "#850000",
                color: "#FFFFFF",
                transition: "all 0.3s ease",
                marginTop: "10px",
                "&:hover": {
                  backgroundColor: "#5C0000",
                  color: "#FFFFFF",
                  transform: "translateY(1px)",
                  fontWeight: "bold",
                },
              }}
              disabled={circularLoadingDelete}
            >
              {circularLoadingDelete ? (
                <CircularProgress size={24} />
              ) : (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "10px",
                    textTransform: "capitalize",
                    fontWeight: "bold",
                  }}
                >
                  DELETE post
                </div>
              )}
            </Button>
            <span>{error && <div>{error}</div>}</span>
          </form>
        </div>
      </div>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={2000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: "center", horizontal: "center" }}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity="success"
          variant="filled"
          sx={{
            width: "100%",
            fontSize: "1.1rem",
            py: 2,
            px: 4,
          }}
        >
          {uploadMessage}
        </Alert>
      </Snackbar>
    </div>
    <Footer />
  </div>
);

}

export default EditPost;
