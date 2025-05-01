import React, { useContext, useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { formatISO9075 } from "date-fns";
import { UserContext } from "../context/userContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { DarkModeContext } from "../context/DarkModeContext"; // adjust path if needed

import {
  Button,
  CircularProgress,
  TextField,
  IconButton,
  Card,
  CardContent,
  Typography,
  Box,
} from "@mui/material";
import { TiEdit } from "react-icons/ti";
import { MdSave, MdCancel } from "react-icons/md";
import { LoadingScreen } from "../components/LoadingScreen";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
function PostPage() {
  const { id } = useParams();
  const { userInfo } = useContext(UserContext);
    const navigate = useNavigate();
  
  const [postInfo, setPostInfo] = useState(null);
  const [loadingPost, setLoadingPost] = useState(true); // For post loading
  const [comments, setComments] = useState([]);
  const [loadingComments, setLoadingComments] = useState(true); // For comments loading
  const [commentText, setCommentText] = useState("");
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editingText, setEditingText] = useState("");
const { darkMode } = useContext(DarkModeContext);

  const [addingCommentLoading, setAddingCommentLoading] = useState(false);
  const [deletingCommentLoadingId, setDeletingCommentLoadingId] =
    useState(null);
  const [savingCommentLoadingId, setSavingCommentLoadingId] = useState(null);

  // Fetch post and comments when the component mounts or when the id changes
  useEffect(() => {
    fetchPost();
    fetchComments();
  }, [id]);

  const fetchPost = async () => {
    try {
      const response = await fetch(
        `https://gogablog-api.onrender.com/api/post/${id}`
      );
      const postData = await response.json();
      setPostInfo(postData);
    } catch (error) {
      console.error("Error fetching post:", error);
    } finally {
      setLoadingPost(false); // Set post loading state to false
    }
  };

  const fetchComments = async () => {
    setLoadingComments(true);
    try {
      const response = await fetch(
        `https://gogablog-api.onrender.com/api/post/${id}`
      );
      const postData = await response.json();
      setComments(postData.comments || []);
    } catch (error) {
      console.error("Error fetching comments:", error);
    } finally {
      setLoadingComments(false); // Set comments loading state to false
    }
  };

  const handleAddComment = async () => {
    if (!commentText.trim()) return;
    const username = userInfo?.user?.username || "Anonymous";
    setAddingCommentLoading(true);
    try {
      const response = await fetch(
        `https://gogablog-api.onrender.com/api/post/${id}/comment`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, text: commentText }),
        }
      );
      if (response.ok) {
        setCommentText("");
        await fetchComments();
      }
    } catch (error) {
      console.error("Error posting comment:", error);
    } finally {
      setAddingCommentLoading(false);
    }
  };

  const handleDeleteComment = async (commentId) => {
    setDeletingCommentLoadingId(commentId);
    try {
      const response = await fetch(
        `https://gogablog-api.onrender.com/api/post/${id}/comment/${commentId}`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        await fetchComments();
      }
    } catch (error) {
      console.error("Error deleting comment:", error);
    } finally {
      setDeletingCommentLoadingId(null);
    }
  };

  const handleEditComment = (commentId, currentText) => {
    if (editingCommentId === commentId) {
      setEditingCommentId(null);
      setEditingText("");
    } else {
      setEditingCommentId(commentId);
      setEditingText(currentText);
    }
  };

  const handleSaveEditedComment = async (commentId) => {
    setSavingCommentLoadingId(commentId);
    try {
      const response = await fetch(
        `https://gogablog-api.onrender.com/api/post/${id}/comment/${commentId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text: editingText }),
        }
      );
      if (response.ok) {
        await fetchComments();
        setEditingCommentId(null);
        setEditingText("");
      }
    } catch (error) {
      console.error("Error editing comment:", error);
    } finally {
      setSavingCommentLoadingId(null);
    }
  };

  if (loadingPost) {
    return <LoadingScreen></LoadingScreen>;
  }

  if (!postInfo) {
    return <div>Error loading post.</div>;
  }

  const handleDeletePost = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this post?"
    );
    if (!confirmDelete) return;

    try {
      const response = await fetch(
        `https://gogablog-api.onrender.com/api/post/${id}`,
        {
          method: "DELETE",
          credentials: "include",
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
      );
      if (response.ok) {
        navigate("/#");
      } else {
        alert("Failed to delete post.");
      }
    } catch (error) {
      console.error("Error deleting post:", error);
      alert("Something went wrong while deleting the post.");
    }
  };

  return (
    <div
      style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
    >
      <Navbar />
      <div className="page-content" style={{ flex: 1 }}>
        <div className="post-page-container">
          <div className="post-page">
            <h1 style={{ marginBottom: "20px", marginTop: "25px" }}>
              {postInfo.title}
            </h1>
            <time>{formatISO9075(new Date(postInfo.createdAt))}</time>
            <div
              className="author"
              style={{
                color:
                  postInfo.author?.username === "goga"
                    ? "red"
                    : postInfo.author?.username === "Nippleman"
                    ? "green"
                    : "inherit",
                fontWeight:
                  postInfo.author?.username === "goga" ||
                  postInfo.author?.username === "Nippleman"
                    ? "bold"
                    : "normal",
              }}
            >
              by {postInfo.author?.username}
            </div>
            {(userInfo?.user._id === postInfo.author._id ||
              userInfo?.user?.username === "Nippleman") && (
              <div className="edit" style={{ display: "flex", gap: "10px" }}>
                <Link to={`/edit/${postInfo._id}`}>
                  <Button
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
                  >
                    Edit post
                    <TiEdit style={{ fontSize: "20px", marginLeft: "10px" }} />
                  </Button>
                </Link>

                {userInfo?.user?.username === "Nippleman" && (
                  <Button
                    variant="contained"
                    color="error"
                    size="large"
                    onClick={handleDeletePost}
                    sx={{
                      maxWidth: "200px",
                      backgroundColor: "#B91C1C",
                      "&:hover": {
                        backgroundColor: "#7F1D1D",
                        fontWeight: "bold",
                      },
                    }}
                  >
                    Delete Post
                    <DeleteForeverIcon style={{ marginLeft: "10px" }} />
                  </Button>
                )}
              </div>
            )}

            <div className="image">
              <img src={postInfo.cover} alt="Post cover" />
            </div>

            <div
              className="content"
              dangerouslySetInnerHTML={{ __html: postInfo.content }}
            />

            {/* COMMENTS */}
            <Box mt={5}>
              <Typography variant="h5" gutterBottom>
                Comments
              </Typography>

              {loadingComments ? (
                <CircularProgress />
              ) : comments.length === 0 ? (
                <Typography sx={{ color: darkMode ? "#aaa" : "inherit" }}>
                  No comments yet. Be the first!
                </Typography>
              ) : (
                comments.map((comment) => (
                  <Card
                    key={comment._id}
                    variant="outlined"
                    sx={{
                      my: 4,
                      backgroundColor: darkMode ? "#14274E" : "#fff",
                      color: darkMode ? "#ddd" : "#000",
                      borderColor: darkMode ? "#444" : "rgba(0, 0, 0, 0.12)",
                    }}
                  >
                    <CardContent>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            flexGrow: 1,
                          }}
                        >
                          <Typography
                            variant="subtitle2"
                            sx={{
                              color:
                                comment.username === "goga"
                                  ? "red !important"
                                  : comment.username === "Nippleman"
                                  ? "green !important"
                                  : "text.secondary",
                              fontWeight:
                                comment.username === "goga" ||
                                comment.username === "Nippleman"
                                  ? "bold !important"
                                  : "normal",
                            }}
                          >
                            {comment.username}
                          </Typography>

                          <Typography
                            variant="caption"
                            sx={{
                              color: darkMode ? "#aaa" : "text-secondary",
                              marginRight: "45px",
                              marginLeft: "20px",
                            }}
                          >
                            {new Date(comment.createdAt).toLocaleString(
                              undefined,
                              {
                                dateStyle: "medium",
                                timeStyle: "short",
                              }
                            )}
                          </Typography>
                        </Box>

                        {(userInfo?.user?.username === comment.username ||
                          userInfo?.user?.username === "Nippleman") && (
                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "center",
                              marginRight: "25px",
                            }}
                          >
                            <IconButton
                              color="primary"
                              onClick={() =>
                                handleEditComment(comment._id, comment.text)
                              }
                            >
                              {editingCommentId === comment._id ? (
                                <MdCancel />
                              ) : (
                                <TiEdit />
                              )}
                            </IconButton>

                            <IconButton
                              color="error"
                              onClick={() => handleDeleteComment(comment._id)}
                            >
                              {deletingCommentLoadingId === comment._id ? (
                                <CircularProgress size={20} />
                              ) : (
                                <DeleteForeverIcon />
                              )}
                            </IconButton>
                          </Box>
                        )}
                      </Box>

                      {editingCommentId === comment._id ? (
                        <>
                          <TextField
                            fullWidth
                            multiline
                            rows={2}
                            value={editingText}
                            onChange={(e) => setEditingText(e.target.value)}
                            sx={{ mt: 2 }}
                          />
                          <Box sx={{ display: "flex", gap: 1, mt: 1 }}>
                            <IconButton
                              color="primary"
                              onClick={() =>
                                handleSaveEditedComment(comment._id)
                              }
                            >
                              {savingCommentLoadingId === comment._id ? (
                                <CircularProgress size={20} />
                              ) : (
                                <MdSave />
                              )}
                            </IconButton>
                            <IconButton
                              color="secondary"
                              onClick={() => setEditingCommentId(null)}
                            >
                              <MdCancel />
                            </IconButton>
                          </Box>
                        </>
                      ) : (
                        <Typography sx={{ mt: 2 }}>{comment.text}</Typography>
                      )}
                    </CardContent>
                  </Card>
                ))
              )}

              {/* ADD COMMENT */}
              <Box mt={3}>
                <TextField
                  fullWidth
                  multiline
                  rows={2}
                  placeholder="Write your comment..."
                  variant="outlined"
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                />
                <Button
                  variant="contained"
                  sx={{
                    marginTop: 2,
                    backgroundColor: "#14274E",
                    "&:hover": {
                      backgroundColor: "#FACC15",
                      color: "#14274E",
                      fontWeight: "bold",
                    },
                  }}
                  onClick={handleAddComment}
                  disabled={addingCommentLoading || !commentText.trim()}
                >
                  {addingCommentLoading ? (
                    <CircularProgress size={24} sx={{ color: "white" }} />
                  ) : (
                    "Post Comment"
                  )}
                </Button>
              </Box>
            </Box>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default PostPage;
