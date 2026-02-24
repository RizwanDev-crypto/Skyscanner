"use client";

import React from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Breadcrumbs,
  Link,
} from "@mui/material";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import SearchIcon from "@mui/icons-material/Search";
import LocalOfferOutlinedIcon from "@mui/icons-material/LocalOfferOutlined";
import GppGoodOutlinedIcon from "@mui/icons-material/GppGoodOutlined";

export default function HotelFeatures() {
  const brands = [
    { name: "Booking.com", src: "/favourite brands/imgi_2_h_bc.png" },
    { name: "Trip.com", src: "/favourite brands/imgi_3_d_ct.png" },
    { name: "Hotels.com", src: "/favourite brands/imgi_4_h_hc.png" },
    { name: "HYATT", src: "/favourite brands/imgi_5_h_hy.png", customHeight: { xs: "25px", md: "40px" } },
    { name: "Expedia", src: "/favourite brands/imgi_6_h_xp.png", customHeight: { xs: "28px", md: "45px" } },
    { name: "INTERCONTINENTAL", src: "/favourite brands/imgi_7_h_ic.png" },
  ];

  return (
    <Box sx={{ bgcolor: "#fff", pt: 4, pb: 8 }}>
      <Container maxWidth="lg">
        {/* Breadcrumbs */}
        <Breadcrumbs
          separator={<ArrowDropUpIcon sx={{ color: "#c4cbd1", transform: "rotate(90deg)", fontSize: "20px" }} />}
          aria-label="breadcrumb"
          sx={{ mb: 4 }}
        >
          <Link
            underline="none"
            color="inherit"
            href="/"
            sx={{
              color: "#161616",
              fontSize: "16px",
              textDecoration: "underline",
              textUnderlineOffset: "3px",
              "&:hover": { textDecoration: "none" },
            }}
          >
            Home
          </Link>
          <Typography color="text.primary" sx={{ fontSize: "16px", color: "#626971" }}>
            Hotels
          </Typography>
        </Breadcrumbs>

        {/* Feature Columns */}
        <Grid container spacing={{ xs: 3, md: 4 }} sx={{ mb: 8 }}>
          <Grid item xs={12} md={4} width={{ xs: "100%", sm: "24.5%", md: "25%", lg: "31%" }}>
            <Box sx={{ display: "flex", gap: 1 }}>
              <SearchIcon sx={{ color: "#161616", fontSize: "28px" }} />
              <Typography sx={{ color: "#161616", fontSize: "14px", fontWeight: 700, lineHeight: 1.4 }}>
                Find the best-value hotel for your dates, search by price or preferences
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4} width={{ xs: "100%", sm: "24.5%", md: "25%", lg: "31%" }}>
            <Box sx={{ display: "flex", gap: 2 }}>
              <LocalOfferOutlinedIcon sx={{ color: "#111213", fontSize: "24px" }} />
              <Typography sx={{ color: "#111213", fontSize: "14px", fontWeight: 700, lineHeight: 1.4 }}>
                Compare hotel deals across hundreds of providers, all in one place
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4} width={{ xs: "100%", sm: "24.5%", md: "25%", lg: "31%" }}>
            <Box sx={{ display: "flex", gap: 2 }}>
              <GppGoodOutlinedIcon sx={{ color: "#111213", fontSize: "24px" }} />
              <Typography sx={{ color: "#111213", fontSize: "14px", fontWeight: 700, lineHeight: 1.4 }}>
                Look out for hotels with free cancellation or excellent ratings
              </Typography>
            </Box>
          </Grid>
        </Grid>

        {/* Brand Section */}
        <Box>
          <Typography sx={{ color: "#161616", fontWeight: 700, fontSize: "2rem", mb: 4 }}>
            Compare hotels across your favourite brands
          </Typography>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: { xs: 3, md: 5 }, alignItems: "center" }}>
            {brands.map((brand, index) => (
              <Box key={index} sx={{ display: "flex", alignItems: "center" }}>
                <Box
                  component="img"
                  src={brand.src}
                  alt={brand.name}
                  sx={{
                    height: brand.customHeight || { xs: "35px", md: "60px" },
                    width: "auto",
                    maxWidth: "200px",
                    objectFit: "contain",
                    opacity: 0.9,
                    "&:hover": { opacity: 1 },
                  }}
                />
              </Box>
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
