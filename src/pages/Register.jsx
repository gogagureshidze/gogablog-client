import React, { useContext, useState } from "react";
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
import { UserContext } from "../context/userContext"; // Import the UserContext


function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);
  const { setUserInfo } = useContext(UserContext); // Get the setUserInfo function from context

  const register = async (e) => {
    e.preventDefault();
    setErrors({});
    setLoading(true);
    try {
      const response = await axios.post(
        "https://gogablog-api.onrender.com/api/user/register",
        { username, email, password },
        { withCredentials: true }
      );

      if (response.status === 201) {
        alert("Registration successful.");
        setUserInfo(response.data); // Assuming response.data contains user info
        navigate("/login");
      }
    } catch (error) {
      console.error("Error:", error);
      if (error.response && error.response.data) {
        setErrors(error.response.data);
      } else {
        alert("Something went wrong. Try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Navbar />

      <Box
        component="form"
        onSubmit={register}
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
          style={{ fontFamily: "monospace" }}
          textAlign="center"
        >
          Register
        </Typography>

        <TextField
          label="Username"
          variant="outlined"
          fullWidth
          value={username}
          required
          onChange={(e) => setUsername(e.target.value)}
          error={Boolean(errors.username)}
          helperText={errors.username}
        />

        <TextField
          label="Email"
          type="email"
          variant="outlined"
          fullWidth
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
          error={Boolean(errors.email)}
          helperText={errors.email}
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
              <InputAdornment
                sx={{
                  backgroundColor: "#fff", // White background
                  borderRadius: "50%", // Optional: make it circular
                  padding: "20px", // Optional: control spacing
                }}
                position="end"
              >
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
          disabled={loading}
        >
          {loading ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            "Register"
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

export default Register;
