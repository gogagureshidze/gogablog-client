import "react-quill/dist/quill.snow.css";
import { useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import Editor from "../components/Editor";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Button, CircularProgress, Snackbar, Alert, LinearProgress, Typography, Box } from "@mui/material";
import UploadIcon from "@mui/icons-material/Upload";
import { UserContext } from "../context/userContext";
import { uploadImage } from "../util/uploadImage";

export default function CreatePost() {
  const [snackbarOpen, setSnackbarOpen]   = useState(false);
  const [uploadMessage, setUploadMessage] = useState("");
  const [title, setTitle]                 = useState("");
  const [summary, setSummary]             = useState("");
  const [content, setContent]             = useState("");
  const [file, setFile]                   = useState(null);
  const [redirect, setRedirect]           = useState(false);

  // Two separate loading phases so the UI stays informative
  const [uploadPct, setUploadPct]         = useState(0);   // 0–100 during image upload
  const [phase, setPhase]                 = useState("idle"); // idle | uploading | saving

  const { userInfo } = useContext(UserContext);
  const busy = phase === "uploading" || phase === "saving";

  async function createNewPost(ev) {
    ev.preventDefault();

    try {
      let cover = "";

      // ── Phase 1: upload image directly to Cloudinary from the browser ──────
      if (file) {
        setPhase("uploading");
        setUploadPct(0);
        cover = await uploadImage(file, userInfo.token, (pct) => setUploadPct(pct));
      }

      // ── Phase 2: save post — tiny JSON to your server, instant ─────────────
      setPhase("saving");
      const response = await fetch(`${process.env.REACT_APP_SERVER_URL}api/post`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
        body: JSON.stringify({ title, summary, content, cover }),
      });

      if (response.ok) {
        setRedirect(true);
      } else {
        const err = await response.json().catch(() => ({}));
        console.error("Create post failed:", err);
        setPhase("idle");
      }
    } catch (err) {
      console.error("createNewPost error:", err);
      setPhase("idle");
    }
  }

  if (redirect) return <Navigate to={"/"} />;

  return (
    <div className="page-container" style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
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
              accept="image/jpeg,image/png,image/webp,image/gif"
              type="file"
              required
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
            <Box>
              <LinearProgress
                variant="determinate"
                value={uploadPct}
                sx={{ height: 8, borderRadius: 4, backgroundColor: "#e0e0e0",
                  "& .MuiLinearProgress-bar": { backgroundColor: "#14274E" } }}
              />
              <Typography variant="caption" sx={{ color: "#14274E", fontWeight: 600, mt: 0.5, display: "block" }}>
                Uploading image… {uploadPct}%
              </Typography>
            </Box>
          )}

          {phase === "saving" && (
            <Typography variant="caption" sx={{ color: "#14274E", fontWeight: 600 }}>
              Saving post…
            </Typography>
          )}

          <div style={{ minHeight: "300px" }}>
            <Editor value={content} onChange={setContent} />
          </div>

          <Button
            type="submit"
            variant="contained"
            size="large"
            disabled={busy}
            sx={{
              backgroundColor: "#14274E",
              color: "#FFFFFF",
              transition: "all 0.3s ease",
              "&:hover": { backgroundColor: "#FACC15", color: "#14274E", transform: "translateY(1px)", fontWeight: "900" },
            }}
          >
            {phase === "uploading" ? <CircularProgress size={24} sx={{ color: "#fff" }} />
              : phase === "saving" ? <CircularProgress size={24} sx={{ color: "#fff" }} />
              : "Create Post"}
          </Button>
        </form>

        <Snackbar
          open={snackbarOpen}
          autoHideDuration={2000}
          onClose={() => setSnackbarOpen(false)}
          anchorOrigin={{ vertical: "center", horizontal: "center" }}
        >
          <Alert onClose={() => setSnackbarOpen(false)} severity="success" variant="filled"
            sx={{ width: "100%", fontSize: "1.1rem", py: 2, px: 4 }}>
            {uploadMessage}
          </Alert>
        </Snackbar>
      </main>

      <Footer />
    </div>
  );
}