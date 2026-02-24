"use client";

import { Box, Container, Grid, Typography, Link, IconButton } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";

export default function Footer() {
  const [openSections, setOpenSections] = useState({
    Explore: false,
    Company: false,
    Partners: false,
    Trips: false,
  });

  const toggleSection = (section) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const column1 = ["Help", "Privacy Settings", "Log In"];
  const column2 = ["Cookie policy", "Privacy policy", "Terms of service", "Company Details"];
  
  const column3Data = [
    { 
      name: "Explore", 
      items: [
        { name: "Flights", hasPlus: true },
        { name: "Car hire", hasPlus: true },
        { name: "Hotels", hasPlus: true },
        { name: "App" },
        { name: "Sitemap" }
      ] 
    },
    { 
      name: "Company", 
      items: [
        { name: "About us" },
        { name: "Why Skyscanner?" },
        { name: "Media" },
        { name: "Our people" },
        { name: "Accessibility" },
        { name: "Sustainability" },
        { name: "Jobs" },
        { name: "Security" }
      ] 
    },
    { 
      name: "Partners", 
      items: [
        { name: "Work with us" },
        { name: "Advertise with us" },
        { name: "Travel Insight" },
        { name: "Affiliates" },
        { name: "Travel APIs" }
      ] 
    },
    { 
      name: "Trips", 
      items: [
        { name: "Flights", hasPlus: true },
        { name: "Hotels", hasPlus: true },
        { name: "Car hire", hasPlus: true }
      ] 
    },
  ];

  return (
    <Box sx={{ bgcolor: "#05203C", pt: 8, pb: 4, color: "#fff" }}>
      <Container maxWidth="lg" >
        <Grid container spacing={{ xs: 4, md: 16, lg: 27 }} sx={{ mb: 1}}>
          {/* Logo/Region Column */}
          <Grid item xs={12} md={4}>
            <Box
              sx={{
                bgcolor: "rgba(255, 255, 255, 0.1)",
                borderRadius: "8px",
                p: 1.5,
                width: "fit-content",
                cursor: "pointer",
                "&:hover": { bgcolor: "rgba(255, 255, 255, 0.15)" },
              }}
            >
              <Typography sx={{ fontSize: "12px", fontWeight: 600 ,}}>
                Pakistan · English (UK) · Rs PKR
              </Typography>
            </Box>
          </Grid>

          {/* Combined Links Columns 1 & 2 */}
          <Grid item xs={12} md={5}>
            <Box sx={{ display: "flex", gap: { xs: 14, sm: 4, md: 12, lg: 20 } }}>
              <Box>
                {column1.map((item) => (
                  <Box key={item} sx={{ mb: 2 }}>
                    <Link
                      href="#"
                      underline="none"
                      sx={{
                        color: "#fff",
                        fontSize: "14px",
                        fontWeight: 600,
                        "&:hover": { textDecoration: "underline" },
                      }}
                    >
                      {item}
                    </Link>
                  </Box>
                ))}
              </Box>

              <Box>
                {column2.map((item) => (
                  <Box key={item} sx={{ mb: 2 }}>
                    <Link
                      href="#"
                      underline="none"
                      sx={{
                        color: "#fff",
                        fontSize: "14px",
                        fontWeight: 600,
                        "&:hover": { textDecoration: "underline" },
                      }}
                    >
                      {item}
                    </Link>
                  </Box>
                ))}
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12} md={3}>
            {column3Data.map((section) => {
              const isOpen = openSections[section.name];
              return (
                <Box key={section.name} sx={{ mb: 2 }}>
                  <Box
                    onClick={() => toggleSection(section.name)}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      width: "230px",
                      cursor: "pointer",
                      mb: isOpen && section.items?.length > 0 ? 2 : 0,
                      "&:hover": {
                        "& .text": { textDecoration: "underline" },
                      },
                    }}
                  >
                    <Typography
                      className="text"
                      sx={{
                        color: "#fff",
                        fontSize: "15px",
                        fontWeight: 600,
                      }}
                    >
                      {section.name}
                    </Typography>
                    {isOpen ? (
                      <KeyboardArrowUpIcon sx={{ fontSize: "20px" }} />
                    ) : (
                      <KeyboardArrowDownIcon sx={{ fontSize: "20px" }} />
                    )}
                  </Box>

                  {isOpen && section.items && (
                    <Box sx={{ pl: 2 }}>
                      {section.items.map((item, index) => (
                        <Box
                          key={item.name}
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            width: "214px",
                            mb: index === section.items.length - 1 ? 0 : 2,
                            cursor: "pointer",
                            "&:hover": { textDecoration: "underline" },
                          }}
                        >
                          <Typography sx={{ fontSize: "14px", color: "#fff", fontWeight: 600 }}>
                            {item.name}
                          </Typography>
                          {item.hasPlus && <AddIcon sx={{ fontSize: "16px" }} />}
                        </Box>
                      ))}
                    </Box>
                  )}
                </Box>
              );
            })}
          </Grid>
        </Grid>

        {/* Copyright */}
        <Box sx={{ textAlign: "center" , mt: 4 }}>
          <Typography sx={{ fontSize: "14px", color: "#EFF3F8", fontWeight: 500 }}>
            © Skyscanner Ltd 2002 – 2026
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
