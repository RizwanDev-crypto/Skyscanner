"use client";

import React, { useState } from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  IconButton,
  Divider,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import HotelOutlinedIcon from "@mui/icons-material/HotelOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import ApartmentOutlinedIcon from "@mui/icons-material/ApartmentOutlined";
import StarIcon from "@mui/icons-material/Star";

const cityHotels = [
  {
    id: 1,
    name: "The Nishat",
    stars: 4,
    location: "Lahore, Pakistan",
    score: 9.5,
    reviews: 1633,
    price: "239.888",
    image: "/Hotelscity/imgi_10_542509699.jpg",
  },
  {
    id: 2,
    name: "Faletti's Hotel",
    stars: 4,
    location: "Lahore, Pakistan",
    score: 8.9,
    reviews: 2886,
    price: "194.565",
    image: "/Hotelscity/imgi_15_1709663225.jpg",
  },
  {
    id: 3,
    name: "Grand Ittehad Boutique Hotel",
    stars: 4,
    location: "Lahore, Pakistan",
    score: 6.2,
    reviews: 33,
    price: "182.493",
    image: "/Hotelscity/imgi_19_1065186429.jpg",
  },
  {
    id: 4,
    name: "Pearl Continental",
    stars: 5,
    location: "Lahore, Pakistan",
    score: 9.2,
    reviews: 4210,
    price: "310.450",
    image: "/Hotelscity/imgi_12_1717631434.jpg",
  },
  {
    id: 5,
    name: "Avari Lahore",
    stars: 5,
    location: "Lahore, Pakistan",
    score: 8.7,
    reviews: 1950,
    price: "205.120",
    image: "/Hotelscity/imgi_13_2074629193.jpg",
  },
  {
    id: 6,
    name: "Luxus Grand Hotel",
    stars: 4,
    location: "Lahore, Pakistan",
    score: 8.5,
    reviews: 1120,
    price: "155.800",
    image: "/Hotelscity/imgi_18_649209008.jpg",
  },
];


const fastFacts = [
  {
    icon: <ApartmentOutlinedIcon sx={{ fontSize: "32px", color: "#161616" }} />,
    label: "Hotel brands to choose from",
    value: "60+",
  },
  {
    icon: <LocationOnOutlinedIcon sx={{ fontSize: "32px", color: "#161616" }} />,
    label: "Hotel destinations to explore",
    value: "5,000+",
  },
  {
    icon: <HotelOutlinedIcon sx={{ fontSize: "32px", color: "#161616" }} />,
    label: "Hotels available worldwide",
    value: "3.2 million",
  },
];

export default function HotelCityBreaks() {
  const marqueeHotels = [...cityHotels, ...cityHotels]; // Duplicate for seamless loop

  return (
    <Box sx={{ bgcolor: "#fff", pb: 8 }}>
      <Container maxWidth="lg">

        {/* ── Hotels for fab city breaks ── */}
        <Box>
          <Typography sx={{ fontWeight: 700, fontSize: "2rem", color: "#161616", mb: 0.5 }}>
            Hotels for fab city breaks
          </Typography>
          <Typography sx={{ fontSize: "1rem", color: "#161616", mb: 3 }}>
           The key to a great city break? A perfectly-placed base. Check out the best city centre hotels.
          </Typography>

          {/* Marquee Container */}
          <Box
            sx={{
              width: "100%",
              overflow: "hidden",
              position: "relative",
              "&::after": {
                content: '""',
                position: "absolute",
                top: 0,
                bottom: 0,
                right: 0,
                width: "40px",
                background: "linear-gradient(to left, #fff, transparent)",
                zIndex: 2,
                pointerEvents: "none"
              },
              "&::before": {
                content: '""',
                position: "absolute",
                top: 0,
                bottom: 0,
                left: 0,
                width: "40px",
                background: "linear-gradient(to right, #fff, transparent)",
                zIndex: 0.5,
                pointerEvents: "none"
              }
            }}
          >
            <Box
              sx={{
                display: "flex",
                gap: 2.8,
                width: "max-content",
                animation: "marquee 30s linear infinite",
                "&:hover": {
                  animationPlayState: "paused",
                },
                "@keyframes marquee": {
                  "0%": { transform: "translateX(0)" },
                  "100%": { transform: "translateX(-50%)" },
                },
              }}
            >
              {marqueeHotels.map((item, index) => (
                <Box key={`${item.id}-${index}`} sx={{ width: "380px", flexShrink: 0 }}>
                  <Box
                    sx={{
                      borderRadius: "16px",
                      height: "440px",
                      position: "relative",
                      overflow: "hidden",
                      cursor: "pointer",
                      "&:hover img": { transform: "scale(1.05)" },
                    }}
                  >
                    {/* Background Image */}
                    <Box
                      component="img"
                      src={item.image}
                      alt={item.name}
                      sx={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        transition: "transform 0.5s ease",
                      }}
                    />

                    {/* Floating Info Box */}
                    <Box
                      sx={{
                        position: "absolute",
                        bottom: 15,
                        left: 15,
                        right: 15,
                        bgcolor: "#fff",
                        borderRadius: "12px",
                        p: 2,
                        boxShadow: "0px 4px 15px rgba(0,0,0,0.1)",
                      }}
                    >
                      <Typography sx={{ fontWeight: 700, fontSize: "18px", color: "#111", mb: 0.5 }}>
                        {item.name}
                      </Typography>

                      {/* Stars */}
                      <Box sx={{ display: "flex", gap: 0.2, mb: 0.5 }}>
                        {[...Array(item.stars)].map((_, i) => (
                          <StarIcon key={i} sx={{ fontSize: "16px", color: "#ff8400" }} />
                        ))}
                      </Box>

                      <Typography sx={{ fontSize: "14px", color: "#666", mb: 1.5 }}>
                        {item.location}
                      </Typography>

                      {/* Rating Section */}
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
                        <Box 
                          sx={{ 
                            bgcolor: item.score >= 9 ? "#00a698" : (item.score >= 8 ? "#3bb54a" : "#fa7d00"), 
                            color: "#fff", 
                            px: 0.6, 
                            py: 0.2, 
                            borderRadius: "4px",
                            fontSize: "13px",
                            fontWeight: 700
                          }}
                        >
                          {item.score}
                        </Box>
                        <Typography sx={{ fontSize: "13px", color: "#666" }}>
                          {item.reviews} reviews
                        </Typography>
                      </Box>

                      <Divider sx={{ mb: 1.5 }} />

                      {/* Price Section */}
                      <Box sx={{ display: "flex", alignItems: "baseline", gap: 0.5 }}>
                        <Typography sx={{ fontSize: "13px", color: "#666" }}>From</Typography>
                        <Typography sx={{ fontWeight: 700, fontSize: "20px", color: "#111" }}>
                          ${item.price}
                        </Typography>
                        <Typography sx={{ fontSize: "13px", color: "#666" }}>per night</Typography>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>
        </Box>

        {/* ── Fast Facts ── */}
        <Box sx={{ mt: 10 }}>
          <Typography sx={{ fontWeight: 600, fontSize: "2rem", color: "#161616", mb: 0.5 }}>
            Fast facts
          </Typography>
          <Typography sx={{ fontSize: "1rem", color: "#161616", mb: 4 }}>
         Sleep easy, armed with the stuff that's good to know before you go.
          </Typography>

          <Box sx={{ display: "flex", gap: { xs: 4, md: 19 }, flexWrap: "wrap" }}>
            {fastFacts.map((fact, index) => (
              <Box key={index} sx={{ display: "flex", flexDirection: "column", gap: 0.5, fontSize: "4px" }}>
                {fact.icon}
                <Typography sx={{ fontSize: "1rem", color: "#161616", mt: 0.5 }}>
                  {fact.label}
                </Typography>
                <Typography sx={{ fontWeight: 700, fontSize: "20px", color: "#161616" }}>
                  {fact.value}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>

      </Container>
    </Box>
  );
}
