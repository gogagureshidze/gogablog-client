import "react-quill/dist/quill.snow.css";
import { useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import Editor from "../components/Editor";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Button, CircularProgress, Snackbar, Alert } from "@mui/material";
import UploadIcon from "@mui/icons-material/Upload";

import { UserContext } from "../context/userContext";
export default function CreatePost() {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [uploadMessage, setUploadMessage] = useState("");

  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [loading, setLoading] = useState(false); // New loading state
  const { userInfo } = useContext(UserContext);

  async function createNewPost(ev) {
    ev.preventDefault();
    setLoading(true); // Start loading when form is submitted
    const data = new FormData();
    data.set("title", title);
    data.set("summary", summary);
    data.set("content", content);
    data.set("file", files[0]);

    const response = await fetch("/api/post", {
      method: "POST",
      body: data,
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    });

    if (response.ok) {
      setRedirect(true);
    }
    setLoading(false); // Stop loading after the response
  }

  if (redirect) {
    return <Navigate to={"/"} />;
  }

  return (
    <div
      className="page-container"
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      <Navbar />

      <main style={{ flex: 1 }}>
        <form
          onSubmit={createNewPost}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "15px",
            maxWidth: "800px",
            margin: "30px auto",
            padding: "0 20px",
          }}
        >
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(ev) => setTitle(ev.target.value)}
            required
            style={{ padding: "10px", fontSize: "16px" }}
          />

          <input
            type="text"
            placeholder="Summary"
            value={summary}
            onChange={(ev) => setSummary(ev.target.value)}
            required
            style={{ padding: "10px", fontSize: "16px" }}
          />

          <label htmlFor="file-upload">
            <input
              style={{ display: "none" }}
              id="file-upload"
              name="file-upload"
              type="file"
              required
              onChange={(ev) => {
                const file = ev.target.files[0];
                if (file) {
                  setFiles(ev.target.files);
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
                  backgroundColor: "#14274E", // darker red on hover
                  color: "#facc15",
                },
              }}
            >
              Upload Cover Image
            </Button>
          </label>

          <div style={{ minHeight: "300px" }}>
            <Editor value={content} onChange={setContent} />
          </div>

          <Button
            type="submit"
            variant="contained"
            size="large"
            sx={{
              backgroundColor: "#14274E",
              color: "#FFFFFF",
              transition: "all 0.3s ease",
              "&:hover": {
                backgroundColor: "#FACC15",
                color: "#14274E",
                transform: "translateY(1px)",
                fontWeight: "900",
              },
            }}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : "Create Post"}
          </Button>
        </form>
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
      </main>

      <Footer />
    </div>
  );
}
