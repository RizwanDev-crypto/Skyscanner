"use client";

import React from "react";
import { Box, Container, Typography } from "@mui/material";
import SearchForm from "../SearchForm";

export default function Hero() {
  return (
    <Box
      sx={{
        position: "relative",
        height: { xs: "auto", md: "80vh" },
        width: "100%",
        display: "flex",
        alignItems: "center",
        zIndex: 10,
      }}
    >
      <video
        autoPlay
        loop
        muted
        playsInline
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          zIndex: 1,
        }}
      >
        <source src="/herovideo/18741009-uhd_3840_2160_30fps.mp4" type="video/mp4" />
      </video>

      {/* Dark Overlay for better text readability */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0,0,0,0.2)",
          zIndex: 2,
        }}
      />
      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 2, py: { xs: 4, md: 0 } }}>
        <Typography
          sx={{
            color: "#ffffff",
            fontWeight: 500,
            WebkitTextStroke: "2px #ffffff", 
            WebkitFontSmoothing: "antialiased",
            fontSize: { xs: "1.9rem", md: "3rem", lg: "4rem" },
            mb: 2,
            lineHeight: 1.2,
            fontStyle:"normal", 
            fontFamily:"Arial",
            letterSpacing:"2px",
            position: "relative",
            "--drift-y": { xs: "-20px", sm: "-30px", md: "-10px", lg: "-80px" },
            animation: "drift 3s ease-in-out infinite alternate",
            zIndex: 3,
          }}
        >
          Discover your next  adventure
        </Typography>

        <SearchForm variant="hero" />
      </Container>
    </Box>
  );
}
