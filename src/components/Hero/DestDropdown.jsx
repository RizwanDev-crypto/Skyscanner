"use client";

import React from "react";
import { Box, Typography } from "@mui/material";
import BusinessOutlinedIcon from "@mui/icons-material/BusinessOutlined";

const DestDropdown = ({ isOpen, filteredDestinations, setSelectedDestination, setInputValue, handleInClick }) => {
  if (!isOpen) return null;
  return (
    <Box
      onClick={(e) => e.stopPropagation()}
      sx={{
        position: "absolute",
        top: "85px",
        left: 0,
        right: 0,
        zIndex: 1000,
        backgroundColor: "#fff",
        borderRadius: "8px",
        boxShadow: "0px 4px 20px rgba(0,0,0,0.15)",
        overflow: "visible", 
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: "50%",
          transform: "translate(-50%, -100%)",
          width: 0,
          height: 0,
          borderLeft: "10px solid transparent",
          borderRight: "10px solid transparent",
          borderBottom: "10px solid #fff",
        },
      }}
    >
      <Box 
        sx={{ 
          maxHeight: "300px", 
          overflowY: "auto",
          "&::-webkit-scrollbar": {
            display: "none",
            width: 0,
            height: 0,
          },
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        {filteredDestinations.length > 0 ? (
          filteredDestinations.map((option, index) => (
            <Box
              key={index}
              onClick={() => {
                setSelectedDestination(option);
                setInputValue(`${option.city}, ${option.country}`);
                handleInClick();
              }}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
                py: 1.5,
                px: 2,
                cursor: "pointer",
                "&:hover": { backgroundColor: "#f5f7f9" },
              }}
            >
              <BusinessOutlinedIcon sx={{ color: "#626971" }} />
              <Box>
                <Typography sx={{ fontSize: "16px", fontWeight: 600, color: "#111213" }}>
                  {option.city}
                </Typography>
                <Typography sx={{ fontSize: "14px", color: "#626971" }}>
                  {option.province}, {option.country}
                </Typography>
              </Box>
            </Box>
          ))
        ) : (
          <Typography sx={{ p: 2, color: "#626971", textAlign: "center" }}>
            No results found
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default DestDropdown;
