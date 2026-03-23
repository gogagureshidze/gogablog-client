import React, { useEffect, useContext, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Editor from "../components/Editor";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { LoadingScreen } from "../components/LoadingScreen";
import {
  Button,
  CircularProgress,
  Snackbar,
  Alert,
  LinearProgress,
  Typography,
  Box,
} from "@mui/material";
import UploadIcon from "@mui/icons-material/Upload";
import { UserContext } from "../context/userContext";
import { uploadImage } from "../util/uploadImage";

function EditPost() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { userInfo } = useContext(UserContext);

  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [uploadMessage, setUploadMessage] = useState("");

  // Two separate loading phases so the UI stays informative
  const [uploadPct, setUploadPct] = useState(0);
  const [phase, setPhase] = useState("idle"); // idle | uploading | saving
  const [phaseDelete, setPhaseDelete] = useState("idle"); // idle | deleting
  const busy = phase === "uploading" || phase === "saving";

  useEffect(() => {
    fetch(`${process.env.REACT_APP_SERVER_URL}api/post/${id}`)
      .then((res) => res.json())
      .then((postInfo) => {
        setTitle(postInfo.title);
        setSummary(postInfo.summary);
        setContent(postInfo.content);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <LoadingScreen />;

  const updatePost = async (e) => {
    e.preventDefault();
    setError("");

    try {
      let cover = undefined; // undefined = don't touch existing cover

      // ── Phase 1: upload new image directly to Cloudinary (if changed) ──────
      if (file) {
        setPhase("uploading");
        setUploadPct(0);
        cover = await uploadImage(file, userInfo.token, (pct) =>
          setUploadPct(pct),
        );
      }

      // ── Phase 2: save post — tiny JSON to your server, instant ─────────────
      setPhase("saving");
      const body = { id, title, summary, content };
      if (cover !== undefined) body.cover = cover; // only send if a new image was chosen

      const response = await fetch(
        `${process.env.REACT_APP_SERVER_URL}api/post`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userInfo.token}`,
          },
          body: JSON.stringify(body),
        },
      );

      if (response.ok) {
        navigate("/post/" + id);
      } else {
        const err = await response.json().catch(() => ({}));
        setError(err.error || "Something went wrong, please try again.");
        setPhase("idle");
      }
    } catch (err) {
      console.error("updatePost error:", err);
      setError("Something went wrong, please try again.");
      setPhase("idle");
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    setPhaseDelete("deleting");

    const response = await fetch(
      `${process.env.REACT_APP_SERVER_URL}api/post/${id}`,
      {
        method: "DELETE",
        headers: { Authorization: `Bearer ${userInfo.token}` },
      },
    );

    if (response.ok) {
      navigate("/");
    } else {
      const err = await response.json().catch(() => ({}));
      setError(err.error || "Delete failed.");
      setPhaseDelete("idle");
    }
  };

  return (
    <div
      style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
    >
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
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <input
                type="text"
                value={summary}
                placeholder="Summary"
                onChange={(e) => setSummary(e.target.value)}
              />

              <label htmlFor="file-upload">
                <input
                  style={{ display: "none" }}
                  id="file-upload"
                  accept="image/jpeg,image/png,image/webp,image/gif"
                  name="file-upload"
                  type="file"
                  onChange={(ev) => {
                    const f = ev.target.files[0];
                    if (f) {
                      setFile(f);
                      setUploadMessage(`"${f.name}" ready to upload`);
                      setSnackbarOpen(true);
                    }
                  }}
                />
                <Button
                  variant="contained"
                  component="span"
                  startIcon={<UploadIcon />}
                  fullWidth
                  disabled={busy}
                  sx={{
                    backgroundColor: "#facc15",
                    color: "#14274E",
                    fontWeight: 700,
                    py: 1.5,
                    borderRadius: "8px",
                    textTransform: "none",
                    transition: "all 0.3s ease",
                    "&:hover": { backgroundColor: "#14274E", color: "#facc15" },
                  }}
                >
                  {file ? `✓ ${file.name}` : "Upload Cover Image"}
                </Button>
              </label>

              {/* Progress bar — only visible while uploading the image */}
              {phase === "uploading" && (
                <Box sx={{ mt: 1 }}>
                  <LinearProgress
                    variant="determinate"
                    value={uploadPct}
                    sx={{
                      height: 8,
                      borderRadius: 4,
                      backgroundColor: "#e0e0e0",
                      "& .MuiLinearProgress-bar": {
                        backgroundColor: "#14274E",
                      },
                    }}
                  />
                  <Typography
                    variant="caption"
                    sx={{
                      color: "#14274E",
                      fontWeight: 600,
                      mt: 0.5,
                      display: "block",
                    }}
                  >
                    Uploading image… {uploadPct}%
                  </Typography>
                </Box>
              )}

              {phase === "saving" && (
                <Typography
                  variant="caption"
                  sx={{
                    color: "#14274E",
                    fontWeight: 600,
                    mt: 1,
                    display: "block",
                  }}
                >
                  Saving post…
                </Typography>
              )}

              <Editor onChange={setContent} value={content} />

              <Button
                type="submit"
                variant="contained"
                size="large"
                disabled={busy}
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
              >
                {busy ? (
                  <CircularProgress size={24} sx={{ color: "#fff" }} />
                ) : (
                  <span
                    style={{ textTransform: "capitalize", fontWeight: "bold" }}
                  >
                    Edit Post
                  </span>
                )}
              </Button>

              <Button
                onClick={handleDelete}
                variant="contained"
                size="large"
                disabled={phaseDelete === "deleting"}
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
              >
                {phaseDelete === "deleting" ? (
                  <CircularProgress size={24} sx={{ color: "#fff" }} />
                ) : (
                  <span
                    style={{ textTransform: "capitalize", fontWeight: "bold" }}
                  >
                    Delete Your Post
                  </span>
                )}
              </Button>

              {error && (
                <div style={{ color: "red", marginTop: "10px" }}>{error}</div>
              )}
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
            sx={{ width: "100%", fontSize: "1.1rem", py: 2, px: 4 }}
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
