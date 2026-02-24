"use client";

import React from "react";
import { Box, Container, Typography, Grid } from "@mui/material";

const benefits = [
  {
    title: "Great hotel deals",
    description:
      "We search for deals with the world's leading hotels, and share our findings with you.",
    illustration: (
      <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Pink circle background */}
        <circle cx="60" cy="60" r="55" fill="#F8C8DC" />
        {/* Door handle */}
        <rect x="78" y="28" width="6" height="22" rx="3" fill="#9CA3AF" />
        <circle cx="81" cy="28" r="5" stroke="#9CA3AF" strokeWidth="3" fill="none" />
        {/* Blue tag body */}
        <rect x="38" y="32" width="38" height="56" rx="6" fill="#0770e3" />
        {/* Tag hole */}
        <circle cx="57" cy="42" r="5" fill="#F8C8DC" />
        {/* Percent symbol */}
        <circle cx="50" cy="56" r="4" stroke="#fff" strokeWidth="2.5" fill="none" />
        <circle cx="64" cy="74" r="4" stroke="#fff" strokeWidth="2.5" fill="none" />
        <line x1="63" y1="54" x2="51" y2="76" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" />
        {/* String */}
        <line x1="57" y1="32" x2="78" y2="32" stroke="#9CA3AF" strokeWidth="2" />
      </svg>
    ),
  },
  {
    title: "Up-to-date pricing",
    description:
      "We always show you the most recent pricing overview we can find, so you know exactly what to expect.",
    illustration: (
      <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Sparkle lines */}
        <line x1="60" y1="8" x2="60" y2="18" stroke="#F59E0B" strokeWidth="3" strokeLinecap="round" />
        <line x1="42" y1="16" x2="47" y2="24" stroke="#F59E0B" strokeWidth="3" strokeLinecap="round" />
        <line x1="78" y1="16" x2="73" y2="24" stroke="#F59E0B" strokeWidth="3" strokeLinecap="round" />
        <line x1="34" y1="28" x2="40" y2="32" stroke="#F59E0B" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="86" y1="28" x2="80" y2="32" stroke="#F59E0B" strokeWidth="2.5" strokeLinecap="round" />
        {/* Dome */}
        <ellipse cx="60" cy="70" rx="36" ry="30" fill="#F59E0B" />
        <ellipse cx="60" cy="70" rx="32" ry="26" fill="#FBBF24" />
        {/* Handle on top */}
        <circle cx="60" cy="38" r="6" fill="#F59E0B" />
        <circle cx="60" cy="38" r="3" fill="#FBBF24" />
        {/* Plate */}
        <ellipse cx="60" cy="88" rx="42" ry="6" fill="#3B3B5C" />
        <ellipse cx="60" cy="86" rx="42" ry="5" fill="#4B4B7C" />
      </svg>
    ),
  },
  {
    title: "Precise searching",
    description:
      "Find hotels with swimming pools, free cancellation, and flexible booking. Or whatever matters most to you.",
    illustration: (
      <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Turquoise circle background */}
        <circle cx="60" cy="60" r="55" fill="#A7F3D0" />
        {/* Scale pillar */}
        <rect x="57" y="40" width="6" height="55" fill="#DC2626" />
        <rect x="50" y="90" width="20" height="5" rx="2" fill="#DC2626" />
        {/* Scale beam */}
        <rect x="20" y="38" width="80" height="5" rx="2" fill="#DC2626" />
        {/* Decorative top */}
        <polygon points="60,28 55,38 65,38" fill="#DC2626" />
        {/* Left pan string */}
        <line x1="28" y1="43" x2="28" y2="60" stroke="#DC2626" strokeWidth="2" />
        <line x1="20" y1="43" x2="36" y2="43" stroke="#DC2626" strokeWidth="2" />
        {/* Left pan - bowl */}
        <path d="M16 60 Q28 78 40 60" fill="#DC2626" />
        <path d="M18 60 Q28 75 38 60" fill="#B91C1C" />
        {/* Receipt in left pan */}
        <rect x="23" y="52" width="10" height="14" rx="1" fill="#fff" />
        <line x1="25" y1="56" x2="31" y2="56" stroke="#D1D5DB" strokeWidth="1" />
        <line x1="25" y1="59" x2="31" y2="59" stroke="#D1D5DB" strokeWidth="1" />
        <line x1="25" y1="62" x2="29" y2="62" stroke="#D1D5DB" strokeWidth="1" />
        {/* Right pan string */}
        <line x1="92" y1="43" x2="92" y2="60" stroke="#DC2626" strokeWidth="2" />
        <line x1="84" y1="43" x2="100" y2="43" stroke="#DC2626" strokeWidth="2" />
        {/* Right pan - bowl */}
        <path d="M80 60 Q92 78 104 60" fill="#DC2626" />
        <path d="M82 60 Q92 75 102 60" fill="#B91C1C" />
        {/* Wine glass in right pan */}
        <ellipse cx="92" cy="52" rx="5" ry="6" fill="#7C2D12" opacity="0.7" />
        <rect x="91" y="56" width="2" height="6" fill="#9CA3AF" />
        <rect x="88" y="62" width="8" height="2" rx="1" fill="#9CA3AF" />
      </svg>
    ),
  },
];

export default function HotelBenefits() {
  return (
    <Box sx={{ bgcolor: "#eff3f8", py: 12 }}>
      <Container maxWidth="lg">
        <Box sx={{ display: "flex", flexDirection: {xs: "column", md: "row"}, justifyContent: "space-between", gap: 4 ,}} > 
          {benefits.map((item, index) => (
            <Box
              key={index}
              sx={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
               
              }}
            >
              {/* Illustration */}
              <Box sx={{ mb: 2 }}>{item.illustration}</Box>

              {/* Title */}
              <Typography
                sx={{
                  fontWeight: 700,
                  fontSize: "24px",
                  color: "#161616",
                  mb: 1,
                  
                }}
              >
                {item.title}
              </Typography>

              {/* Description */}
              <Typography
                sx={{
                  fontSize: "16px",
                  color: "#161616",
                  lineHeight: 1.5,
                }}
              >
                {item.description}
              </Typography>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
}
