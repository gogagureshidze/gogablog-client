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
import {
  FaLaptopCode,
  FaSmileBeam,
  FaUsers,
} from "react-icons/fa";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { DarkModeContext } from "../context/DarkModeContext";

const AboutPage = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const { darkMode } = useContext(DarkModeContext);

  return (
    <>
      <Navbar />
      <Box
        sx={{
          minHeight: "100vh",
          background: darkMode
            ? "radial-gradient(circle at bottom, #1c253b, #0e0e0e)"
            : "#f4f6f9",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          p: 4,
          marginBottom: 0,
        }}
      >
        <Card
          sx={{
            maxWidth: 960,
            width: "100%",
            p: 4,
            backgroundColor: darkMode ? "#121212" : "#ffffff",
            boxShadow: 10,
            borderRadius: 4,
            border: darkMode ? "2px solid #333" : "2px solid #eee",
          }}
        >
          <CardContent>
            <Box sx={{ textAlign: "center", mb: 4 }}>
              <Avatar
                sx={{
                  width: 100,
                  height: 100,
                  mx: "auto",
                  background:
                    "linear-gradient(135deg, rgb(124, 77, 255),rgb(0, 0, 0))",
                  mb: 2,
                  boxShadow: 4,
                }}
              >
                <FaLaptopCode size={50} color="#ffffff" />
              </Avatar>
              <Typography
                variant="h2"
                gutterBottom
                sx={{
                  color: darkMode ? "red !important" : "#0d47a1",
                  fontWeight: "bold",
                  fontSize: "2.5rem",
                  marginBottom: "40px",
                }}
              >
                About This Blog
              </Typography>
              <Typography
                variant="h3"
                gutterBottom
                sx={{
                  color: darkMode ? "#ffeb3b" : "#0d47a1",
                  fontWeight: "bold",
                  fontSize: "2.5rem",
                  marginBottom: "30px",
                }}
              >
                👋 Hey there! I'm{" "}
                <span style={{ color: "#00bcd4" }}>Goga Gureshidze</span>
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  color: "#e91e63 !important",
                  fontWeight: 500,
                }}
              >
                This isn’t just a demo app. This is where fun, creativity,
                friendship and inside jokes colide! 🎉
              </Typography>
            </Box>

            <Typography
              variant="body1"
              paragraph
              sx={{
                color: darkMode ? "white" : "#333",
                fontSize: "1.15rem",
              }}
            >
              : I built this blog platform with a huge dose of love ❤️ as a
              full-stack solo dev project in high school. But it's more than
              just a site to show off my code. It’s a home — for me, for my
              friends, and for all the funny interests and ideas we turned into
              app.
              <br />
              <br />
              Soon I'll be moving to{" "}
              <span style={{ color: "orange", fontWeight: "bold" }}>
                London
              </span>{" "}
              🇬🇧 to study{" "}
              <span style={{ color: "#03a9f4", fontWeight: "bold" }}>
                Computer Science
              </span>{" "}
              — but this app will always be in my Heart. 💻
            </Typography>

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
                size={70}
                color="#00e676"
                style={{
                  marginBottom: isSmallScreen ? 8 : 0,
                  marginRight: isSmallScreen ? 0 : 16,
                }}
              />
              <Typography
                variant="body1"
                sx={{ color: darkMode ? "white" : "#222", fontSize: "1.2rem" }}
              >
                My ride-or-die homie{" "}
                <strong style={{ color: "#00e676" }}>
                  Mate (aka Nippleman) 💚
                </strong>{" "}
                has admin privileges and helped me through every step of the
                jorney.
              </Typography>
            </Box>

            <Box
              sx={{
                display: "flex",
                flexDirection: isSmallScreen ? "column" : "row",
                alignItems: isSmallScreen ? "center" : "flex-start",
                textAlign: isSmallScreen ? "center" : "left",
                mb: 3,
              }}
            >
              <FaSmileBeam
                size={70}
                color="#facc15"
                style={{
                  marginBottom: isSmallScreen ? 8 : 0,
                  marginRight: isSmallScreen ? 0 : 16,
                }}
              />
              <Typography
                variant="body1"
                sx={{
                  fontSize: "1.2rem",
                  color: darkMode ? "#e0e0e0" : "#333",
                }}
              >
                The inside jokes, the quotes, the ridiculous characters — it was
                all spontaneous. We didn’t plan it, we just had fun together.
              </Typography>
            </Box>



            <Typography
              variant="body1"
              sx={{
                fontSize: "1.2rem",
                color: darkMode ? "#f5f5f5" : "#333",
                margin: "50px 0",
                lineHeight: 1.6,
                textAlign: "center",
              }}
            >
              <span style={{ color: "#9575cd" }}>
                🌙 From late-night coding sessions
              </span>{" "}
              to <span style={{ color: "#fdd835" }}>😄 countless laughs</span>{" "}
              shared in the comment section, this blog is more than just a{" "}
              <span style={{ color: "#4dd0e1", fontWeight: "bold" }}>
                portfolio piece
              </span>{" "}
              — it’s a reflection of my{" "}
              <span style={{ color: "#f06292", fontWeight: "bold" }}>
                passion
              </span>
              ,{" "}
              <span style={{ color: "#4caf50", fontWeight: "bold" }}>
                growth
              </span>
              , and the{" "}
              <span style={{ color: "#ff7043", fontWeight: "bold" }}>
                memories
              </span>{" "}
              I’ve built with the people who made it feel{" "}
              <span style={{ color: "#29b6f6", fontWeight: "bold" }}>
                alive
              </span>
              .
              <br />
              I’m genuinely{" "}
              <span style={{ color: "#81c784", fontWeight: "bold" }}>
                grateful
              </span>{" "}
              for that... This space holds our{" "}
              <span style={{ color: "#ffb300" }}>inside jokes</span>,{" "}
              <span style={{ color: "#7986cb" }}>shared interests</span>, and
              all the{" "}
              <span style={{ color: "#ce93d8", fontWeight: "bold" }}>
                little moments
              </span>{" "}
              that turned lines of code into{" "}
              <span style={{ color: "#f48fb1" }}>something meaningful ✨</span>.
              <br />
              It’s more than just a project — it’s{" "}
              <span style={{ color: "#00e5ff", fontWeight: "bold" }}>
                a piece of my story
              </span>
              .
            </Typography>

            <Typography
              variant="body1"
              mt={4}
              sx={{
                color: darkMode ? "#f5f5f5" : "#222",
                fontWeight: 500,
                fontSize: "1.25rem",
                lineHeight: 1.8,
                textAlign: "center",
              }}
            >
              ✨ This wasn’t just an app. This was real. And if you were part of
              it — even for a second — you’re part of it forever.
              <br />
              We weren’t just users. We were friends, jokers, dreamers, and
              creators.
              <br />
              We made something a little bit silly and a Cozy.
              <br />
              <br />
              When the comments go quiet and the updates stop — remember, we
              were here. We lived it.
            </Typography>

            <Typography
              mt={5}
              sx={{
                textAlign: "center",
                color: "#f06292",
                fontSize: "1.35rem",
                fontWeight: "bold",
              }}
            >
              This app holds more than features — it holds moments, memories,
              and friendship. 🛸
            </Typography>
          </CardContent>
        </Card>
      </Box>
      <Footer />
    </>
  );
};

export default AboutPage;
