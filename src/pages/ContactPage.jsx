import React, { useState, useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import emailjs from "emailjs-com";
import {
  Box,
  TextField,
  Button,
  Typography,
  CircularProgress,
  Card,
  CardContent,
} from "@mui/material";
import { DarkModeContext } from "../context/DarkModeContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function ContactPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false); // Loading state for the button
  const { darkMode } = useContext(DarkModeContext);

  const SERVICE_ID = process.env.REACT_APP_EMAILJS_SERVICE_ID;
  const TEMPLATE_ID = process.env.REACT_APP_EMAILJS_TEMPLATE_ID;
  const PUBLIC_KEY = process.env.REACT_APP_EMAILJS_PUBLIC_KEY;
  const form = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true); // Start loading animation
    emailjs
      .sendForm(SERVICE_ID, TEMPLATE_ID, e.target, PUBLIC_KEY)
      .then(() => {
        alert("Message Sent!");
        setFormData({ name: "", email: "", message: "" });
        navigate("/#");
      })
      .catch(() => {
        alert("Oops something went wrong, please try again!");
      })
      .finally(() => {
        setLoading(false); // Stop loading animation
      });
  };

  return (
    <>
      <Navbar />
      <Box
        sx={{
          minHeight: "100vh",
          backgroundColor: darkMode ? "#1c253b" : "#f0f2f5",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          p: 4,
        }}
      >
        <Card
          sx={{
            maxWidth: 720,
            width: "100%",
            p: 4,
            backgroundColor: darkMode ? "#1a1a1a" : "#ffffff",
            boxShadow: 6,
            borderRadius: 4,
          }}
        >
          <CardContent>
            <Typography
              variant="h4"
              align="center"
              gutterBottom
              sx={{
                background: "linear-gradient(to right, #3b82f6, #7c4dff)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                fontWeight: "bold",
              }}
            >
              Contact and Get In Touch
            </Typography>

            <form ref={form} onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="Name"
                name="name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                variant="outlined"
                required
                sx={{
                  mb: 3,
                  input: { color: darkMode ? "black" : "#000" },
                  "& .MuiInputLabel-root": {
                    color: darkMode ? "#7c4dff" : "#333", // Change label color for dark and light mode
                  },
                  "& .MuiInputBase-input::placeholder": {
                    color: "#000", // Always black placeholder for name field
                  },
                }}
                placeholder="Enter your name"
              />

              <TextField
                fullWidth
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                variant="outlined"
                required
                sx={{
                  mb: 3,
                  input: { color: darkMode ? "black" : "#000" },
                  "& .MuiInputLabel-root": {
                    color: darkMode ? "#7c4dff" : "#333", // Change label color for dark and light mode
                  },
                  "& .MuiInputBase-input::placeholder": {
                    color: "black", // Always black placeholder for email field
                  },
                }}
                placeholder="Enter your email"
              />

              <TextField
                fullWidth
                label="Message"
                name="message"
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                multiline
                rows={5}
                variant="outlined"
                required
                sx={{
                  mb: 3,
                  textarea: { color: darkMode ? "#fff" : "#000" },
                  "& .MuiInputLabel-root": {
                    color: darkMode ? "#ccc" : "#333", // Change label color for dark and light mode
                  },
                }}
              />

              <Button
                type="submit"
                fullWidth
                sx={{
                  background:
                    "linear-gradient(to right, rgb(1, 61, 159), rgba(124, 77, 255, 0.69))",
                  color: "white",
                  py: 1.5,
                  fontWeight: "bold",
                  "&:hover": {
                    background: "#2563eb",
                  },
                }}
                disabled={loading} // Disable button when loading
              >
                {loading ? (
                  <CircularProgress size={24} sx={{ color: "white" }} />
                ) : (
                  "Send Message"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </Box>
      <Footer />
    </>
  );
}

export default ContactPage;
