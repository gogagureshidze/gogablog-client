import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import {
  Button,
  OutlinedInput,
  InputAdornment,
  IconButton,
  FormControl,
  InputLabel,
  FormHelperText,
  Box,
  Typography,
  CircularProgress,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

import { useParams, useNavigate } from "react-router-dom";

function ResetPassword() {
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isValidToken, setIsValidToken] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const { userId, token } = useParams(); // Ext
  // ract userId and token from URL
  useEffect(() => {
    const validateToken = async () => {
      try {
        const response = await axios.post(
          "https://gogablog-api.onrender.com/api/user/validate",
          {
            token,
          }
        );
        if (response.data.success) {
          setIsValidToken(true);
        } else {
          setErrors("Invalid or expired token.");
        }
      } catch (err) {
        setErrors("An error occurred during token validation.");
      } finally {
        setLoading(false);
      }
    };
    validateToken();
  }, [token]);
  const toggleShowPassword = () => setShowPassword((prev) => !prev);
  const toggleShowConfirmPassword = () =>
    setShowConfirmPassword((prev) => !prev);

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setErrors({});

    if (password !== confirmPassword) {
      setErrors({ password: "Passwords do not match." });
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(
        "https://gogablog-api.onrender.com/api/user/reset",
        {
          password,
          userId,
          token,
        }
      );

      if (response.status === 200) {
        alert("Password reset successful.");
        navigate("/login");
      }
    } catch (err) {
      const errorMessage = err.response?.data?.error || "An error occurred.";
      setErrors({ error: errorMessage });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Navbar />

      <Box
        component="form"
        onSubmit={handleResetPassword}
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
          Reset Password
        </Typography>

        <FormControl
          variant="outlined"
          fullWidth
          error={Boolean(errors.password)}
        >
          <InputLabel htmlFor="password">Password</InputLabel>
          <OutlinedInput
            id="password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            endAdornment={
              <InputAdornment position="end">
                <IconButton onClick={toggleShowPassword} edge="end">
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
          {errors.password && (
            <FormHelperText>{errors.password}</FormHelperText>
          )}
        </FormControl>

        <FormControl
          variant="outlined"
          fullWidth
          error={Boolean(errors.password)}
        >
          <InputLabel htmlFor="confirmPassword">Re-Enter Password</InputLabel>
          <OutlinedInput
            id="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            endAdornment={
              <InputAdornment position="end">
                <IconButton onClick={toggleShowConfirmPassword} edge="end">
                  {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Re-Enter Password"
          />
          {errors.password && (
            <FormHelperText>{errors.password}</FormHelperText>
          )}
        </FormControl>

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
          {loading ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            "Reset Password"
          )}
        </Button>

        {errors.error && (
          <span
            style={{
              fontWeight: "bold",
              textAlign: "center",
              fontSize: "15px",
              color: "red",
              fontFamily: "monospace",
            }}
          >
            {errors.error}
          </span>
        )}
      </Box>

      <Footer />
    </Box>
  );
}

export default ResetPassword;
