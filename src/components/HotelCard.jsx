"use client";

import React, { useState, useEffect } from "react";
import { Box, Typography, Paper, Card, CardMedia, CardContent } from "@mui/material";
import GradeIcon from "@mui/icons-material/Grade";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import LocationOnIcon from "@mui/icons-material/LocationOn";

const HotelCard = ({ hotel, variant = "grid" }) => {
  const [currentImage, setCurrentImage] = useState(hotel.image || "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&auto=format&fit=crop");
  const [isHovered, setIsHovered] = useState(false);

  // Fallback images if hotel.images is not provided
  const galleryImages = hotel.images || [
    hotel.image || "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&auto=format&fit=crop",
    "/Hotel cards/imgi_10_1555845736_392x116.jpg",
    "/Hotel cards/imgi_11_977462127_392x116.jpg",
    "/Hotel cards/imgi_12_2375313091_392x116.jpg",
    "/Hotel cards/imgi_13_2509305285_392x116.jpg"
  ].slice(0, 5); // Take up to 5 images for the main and thumbnails

  // Update currentImage if hotel.image changes (e.g. when switching filters/cities)
  useEffect(() => {
    setCurrentImage(hotel.image || "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&auto=format&fit=crop");
  }, [hotel.image]);

  if (variant === "list") {
    return (
      <Paper
        elevation={0}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          mb: 2,
          borderRadius: "12px",
          overflow: "hidden",
          border: "1px solid #E5E7EB",
          cursor: "pointer",
          height: { xs: "auto", sm: "220px" },
          position: "relative",
          "&:hover": { borderColor: "#0062E3", boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)" }
        }}
      >
        <Box sx={{ width: { xs: "100%", sm: "240px" }, height: { xs: "200px", sm: "100%" }, position: "relative", overflow: "hidden" }}>
          <img
            src={currentImage}
            alt={hotel.name}
            style={{ width: "100%", height: "100%", objectFit: "cover", transition: "all 0.3s ease" }}
          />
          
          {/* Thumbnails Overlay */}
          <Box
            sx={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              display: "flex",
              gap: "2px",
              p: "4px",
              bgcolor: "rgba(0,0,0,0.1)",
              backdropFilter: "blur(2px)",
              transform: isHovered ? "translateY(0)" : "translateY(100%)",
              transition: "transform 0.3s ease-in-out",
              zIndex: 2
            }}
          >
            {galleryImages.slice(1, 5).map((img, idx) => (
              <Box
                key={idx}
                onMouseEnter={() => setCurrentImage(img)}
                sx={{
                  flex: 1,
                  height: "40px",
                  borderRadius: "4px",
                  overflow: "hidden",
                  border: currentImage === img ? "2px solid #fff" : "none",
                  boxSizing: "border-box"
                }}
              >
                <img src={img} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </Box>
            ))}
          </Box>
        </Box>
        <Box sx={{ p: 2, flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between", gap: { xs: 2, sm: 0 } }}>
          <Box>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <Typography variant="h6" sx={{ fontWeight: 700, fontSize: "1.1rem", color: "#111827" }}>
                {hotel.name}
              </Typography>
              <FavoriteBorderIcon sx={{ color: "#626971", cursor: "pointer" }} />
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", mt: 0.5 }}>
              {[...Array(5)].map((_, i) =>
                i < Math.floor(hotel.rating || hotel.stars || 4) ? (
                  <GradeIcon key={i} sx={{ fontSize: "16px", color: "#FBBC05" }} />
                ) : (
                  <GradeIcon key={i} sx={{ fontSize: "16px", color: "#D1D5DB" }} />
                )
              )}
            </Box>
            <Typography variant="body2" sx={{ color: "#626971", mt: 1, display: "flex", alignItems: "center" }}>
              <LocationOnIcon sx={{ fontSize: "14px", mr: 0.5 }} />
              {hotel.distance || hotel.location || "1.5 km from center"}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", mt: { xs: 1, sm: 0 } }}>
            <Box>
              <Typography variant="caption" sx={{ color: "#626971" }}>
                {hotel.ratingText || "Good"} ({hotel.reviews || "1,240"} reviews)
              </Typography>
            </Box>
            <Box sx={{ textAlign: "right" }}>
              <Typography sx={{ fontSize: "1.25rem", fontWeight: 700, color: "#111827" }}>
                {hotel.price || "Rs 15,200"}
              </Typography>
              <Typography variant="caption" sx={{ color: "#626971" }}>
                per night
              </Typography>
            </Box>
          </Box>
        </Box>
      </Paper>
    );
  }

  return (
    <Card
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      sx={{
        borderRadius: "12px",
        border: "1px solid #E5E7EB",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        transition: "box-shadow 0.25s ease",
        overflow: "hidden",
        boxShadow: "none",
        position: "relative",
        "&:hover": { boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.08)" },
      }}
    >
      <Box sx={{ position: "relative", width: "100%", height: "180px", overflow: "hidden" }}>
        <CardMedia
          component="img"
          sx={{ height: "100%", width: "100%", objectFit: "cover", transition: "all 0.3s ease" }}
          image={currentImage}
          alt={hotel.name}
        />
        
        {/* Thumbnails Overlay */}
        <Box
          sx={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            display: "flex",
            gap: "2px",
            p: "4px",
            bgcolor: "rgba(0,0,0,0.1)",
            backdropFilter: "blur(2px)",
            transform: isHovered ? "translateY(0)" : "translateY(100%)",
            transition: "transform 0.3s ease-in-out",
            zIndex: 2
          }}
        >
          {galleryImages.slice(1, 5).map((img, idx) => (
            <Box
              key={idx}
              onMouseEnter={() => setCurrentImage(img)}
              sx={{
                flex: 1,
                height: "40px",
                borderRadius: "4px",
                overflow: "hidden",
                border: currentImage === img ? "2px solid #fff" : "none",
                boxSizing: "border-box",
                cursor: "pointer"
              }}
            >
              <img src={img} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </Box>
          ))}
        </Box>
      </Box>

      <CardContent sx={{ p: 2, flexGrow: 1, display: "flex", flexDirection: "column", gap: 0.5 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <Typography sx={{ fontWeight: 700, fontSize: "1.1rem", color: "#111827", lineHeight: 1.2 }}>
            {hotel.name}
          </Typography>
          <Box sx={{ display: "flex" }}>
            {[...Array(5)].map((_, i) => (
              <GradeIcon 
                key={i} 
                sx={{ 
                  fontSize: "16px", 
                  color: i < (hotel.stars || 4) ? "#ff5a5f" : "#D1D5DB" 
                }} 
              />
            ))}
          </Box>
        </Box>
        
        <Typography variant="body2" sx={{ color: "#626971", fontSize: "14px" }}>
          {hotel.distance || "3.94 km from city centre"}
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center", mt: 1, gap: 1 }}>
          <Typography sx={{ fontWeight: 700, fontSize: "14px", color: "#111827" }}>
            {hotel.score || hotel.rating || "3.2"}/5
          </Typography>
          <Typography sx={{ fontWeight: 600, fontSize: "14px", color: "#111827" }}>
            {hotel.ratingText || "Satisfactory"}
          </Typography>
          <Typography sx={{ fontSize: "13px", color: "#626971" }}>
            {hotel.reviews || "44"} reviews
          </Typography>
        </Box>
      </CardContent>
      
      <Box sx={{ borderTop: "1px solid #E5E7EB", p: 1.5, textAlign: "right", mt: "auto" }}>
        <Typography sx={{ fontSize: "1.25rem", fontWeight: 700, color: "#111827" }}>
          {hotel.price || "Rs 2,267"}
        </Typography>
        <Typography sx={{ fontSize: "12px", color: "#626971", mt: -0.5 }}>
          Per night
        </Typography>
      </Box>
    </Card>
  );
};

export default HotelCard;
