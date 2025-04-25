import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import {
  TextField,
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
import { UserContext } from "../context/userContext";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loadingLogin, setLoadingLogin] = useState(false);
  const [loadingForgot, setLoadingForgot] = useState(false);
  const navigate = useNavigate();
  const { setUserInfo } = useContext(UserContext);

  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrors({});
    setLoadingLogin(true);

    try {
      const response = await axios.post(
        "https://gogablog-api.onrender.com/api/user/login",
        { email, password }
      );

      if (response.status === 200) {
        localStorage.setItem("user", response.data);
        setUserInfo(response.data);
        alert("Login successful.");
        navigate("/");
      }
    } catch (error) {
      if (error.response?.data) {
        setErrors(error.response.data);
      } else {
        alert("Something went wrong. Try again.");
      }
    } finally {
      setLoadingLogin(false);
    }
  };

  const handleForgotPassword = () => {
    setLoadingForgot(true);
    // Optional: you could simulate a brief loading or just navigate immediately
    navigate("/forgot-password");
  };

  return (
    <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Navbar />

      <Box
        component="form"
        onSubmit={handleLogin}
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
          Log In
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
        >
          <InputLabel htmlFor="password">Password</InputLabel>
          <OutlinedInput
            id="password"
            type={showPassword ? "text" : "password"}
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
            endAdornment={
              <InputAdornment position="end">
                <IconButton onClick={togglePasswordVisibility} edge="end">
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
          disabled={loadingLogin}
        >
          {loadingLogin ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            "Login"
          )}
        </Button>

        <Button
          onClick={handleForgotPassword}
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
          disabled={loadingForgot}
        >
          {loadingForgot ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            "Forgot Password"
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
          {errors?.error || ""}
        </span>
      </Box>

      <Footer />
    </Box>
  );
}

export default Login;
