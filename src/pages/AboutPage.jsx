import React, { useContext } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Avatar,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { FaLaptopCode, FaSmileBeam, FaUsers } from "react-icons/fa";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { DarkModeContext } from "../context/DarkModeContext"; // adjust path if needed

const AboutPage = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const { darkMode } = useContext(DarkModeContext);


  return (
    <>
      <Navbar></Navbar>
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
            maxWidth: 960,
            width: "100%",
            p: 4,
            backgroundColor: darkMode ? "#1a1a1a" : "#ffffff",
            boxShadow: 6,
            borderRadius: 4,
          }}
        >
          <CardContent>
            <Box sx={{ textAlign: "center", mb: 4 }}>
              <Avatar
                sx={{
                  width: 80,
                  height: 80,
                  mx: "auto",
                  background: "linear-gradient(135deg, #7c4dff,rgb(0, 0, 0))",
                  mb: 2,
                }}
              >
                <FaLaptopCode size={40} color="#ffffff" />
              </Avatar>
              <Typography
                variant="h4"
                gutterBottom
                sx={{ color: darkMode ? "#facc15 !important" : "#14274E" }}
              >
                About This Blog
              </Typography>
              <Typography
                variant="subtitle1"
                sx={{ color: "#7c4dff !important" }}
              >
                Built with ❤️ by a solo developer on a journey
              </Typography>
            </Box>

            <Typography
              variant="body1"
              paragraph
              sx={{ color: darkMode ? "white" : "black" }}
            >
              This blog platform was built by a solo full-stack developer who's
              heading to study Computer Science in London. It's part of my
              portfolio — a real-world project that reflects the skills I’m
              building along the way.
            </Typography>

            {/* Info Block 1 */}
            <Box
              sx={{
                display: "flex",
                flexDirection: isSmallScreen ? "column" : "row",
                alignItems: isSmallScreen ? "center" : "flex-start",
                textAlign: isSmallScreen ? "center" : "left",
                mb: 3,
              }}
            >
              <FaUsers
                size={40}
                color="#7CFC00"
                style={{
                  marginBottom: isSmallScreen ? 8 : 0,
                  marginRight: isSmallScreen ? 0 : 12,
                }}
              />
              <Typography
                variant="body1"
                sx={{ color: darkMode ? "white" : "black" }}
              >
                What makes this app fun is that my friends are actively using it
                — posting, commenting, and making it feel alive.
              </Typography>
            </Box>

            {/* Info Block 2 */}
            <Box
              sx={{
                display: "flex",
                flexDirection: isSmallScreen ? "column" : "row",
                alignItems: isSmallScreen ? "center" : "flex-start",
                textAlign: isSmallScreen ? "center" : "left",
                mb: 3,
                color: darkMode ? "white" : "black",
              }}
            >
              <FaSmileBeam
                size={40}
                color="#facc15"
                style={{
                  marginBottom: isSmallScreen ? 8 : 0,
                  marginRight: isSmallScreen ? 0 : 12,
                }}
              />
              <Typography variant="body1">
                One of them, my closest and beloved friend{" "}
                <strong style={{ color: "green" }}>Nippleman</strong> (aka
                <strong> Mate</strong>), even has admin privileges!
              </Typography>
            </Box>

            <Typography
              variant="body1"
              mt={3}
              sx={{
                color: darkMode ? "#f5f5f5" : "#222",
                fontWeight: 500,
                lineHeight: 1.7,
              }}
            >
              🌙 From <strong>late-night coding sessions</strong> to 😄{" "}
              <strong>countless laughs</strong> shared in the comment section,
              this blog is more than just a portfolio piece — it’s a reflection
              of my{" "}
              <span style={{ color: "#ff4081", fontWeight: "bold" }}>
                passion
              </span>
              ,{" "}
              <span style={{ color: "#7c4dff", fontWeight: "bold" }}>
                growth
              </span>
              , and the{" "}
              <span style={{ color: "#4db6ac", fontWeight: "bold" }}>
                memories
              </span>{" "}
              I’ve built with the people who made it feel alive. I’m{" "}
              <span style={{ color: "#fbc02d", fontWeight: "bold" }}>
                genuinely grateful
              </span>{" "}
              for that... This space holds our <strong>inside jokes</strong>,
              shared interests, and all the little moments that turned lines of
              code into something meaningful ✨. It’s more than just a project —{" "}
              <strong style={{ color: "#ff6f00" }}>
                it’s a piece of my story
              </strong>
              .
            </Typography>
          </CardContent>
        </Card>
      </Box>
      <Footer></Footer>
    </>
  );
};

export default AboutPage;
