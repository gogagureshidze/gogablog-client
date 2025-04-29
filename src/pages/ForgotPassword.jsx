// Login.js
import React, { useState } from "react";
//import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import {
  TextField,
  Button,
  FormControl,
  Box,
  Typography,
  CircularProgress,
} from "@mui/material";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
const [cooldown, setCooldown] = useState(false);

const handleReset = async (e) => {
  e.preventDefault();

  if (cooldown) return; 

  setCooldown(true); 
  setErrors({});
  setLoading(true);

  try {
    const response = await axios.post(
      "https://gogablog-api.onrender.com/api/user/forgotPassword",
      { email }
    );

    if (response.status === 200) {
      console.log("Link sent!");
    }
  } catch (error) {
    if (error.response && error.response.data) {
      setErrors(error.response.data);
    } else {
      alert("Something went wrong. Try again.");
    }
  } finally {
    setLoading(false);
    setTimeout(() => {
      setCooldown(false); // allow again after 30s
    }, 30000);
  }
};

  return (
    <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Navbar />

      <Box
        component="form"
        onSubmit={handleReset}
        sx={{
          width: "100%",
          maxWidth: 600,
          mx: "auto",
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: 2,
          px: 2,
          mb: 20,
        }}
      >
        <Typography
          variant="h4"
          sx={{ marginBottom: "30px" }}
          textAlign="center"
          style={{ fontFamily: "monospace" }}
        >
          Forgot Password
        </Typography>

        <TextField
          label="Email"
          type="email"
          variant="outlined"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={Boolean(errors.email)}
          helperText={errors.email}
          required
        />

        <FormControl
          variant="outlined"
          fullWidth
          error={Boolean(errors.password)}
        ></FormControl>
        <Button
          type="submit"
          variant="contained"
          size="large"
          disabled={loading || cooldown}
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
          {loading ? (
            <CircularProgress size={24} color="inherit" />
          ) : cooldown ? (
            "Please wait... Link is sent!"
          ) : (
            "Send Reset Password Link"
          )}
        </Button>

        <span
          style={{
            fontWeight: "bold",
            textAlign: "center",
            fontSize: "15px",
            color: "red",
            fontFamily: "monospace",
          }}
        >
          {errors ? errors.error : ""}
        </span>
      </Box>

      <Footer />
    </Box>
  );
}

export default ForgotPassword;
