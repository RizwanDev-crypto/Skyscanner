"use client";

import React from "react";
import { Box, Typography, IconButton, Divider } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

const GuestRow = ({ label, subtitle, value, onIncrement, onDecrement, minVal, maxVal }) => (
  <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", py: 2 }}>
    <Box>
      <Typography sx={{ fontSize: "16px", fontWeight: 700, color: "#111213" }}>{label}</Typography>
      <Typography sx={{ fontSize: "14px", color: "#626971" }}>{subtitle}</Typography>
    </Box>
    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
      <IconButton
        onClick={onDecrement}
        disabled={value <= (minVal || 0)}
        sx={{
          bgcolor: "#E0E4E9",
          borderRadius: "8px",
          p: 1,
          "&.Mui-disabled": { opacity: 0.3 },
          "&:hover": { bgcolor: "#D1D5DB" }
        }}
      >
        <RemoveIcon sx={{ fontSize: "20px", color: "#111213" }} />
      </IconButton>
      <Typography sx={{ fontSize: "16px", fontWeight: 600, minWidth: "20px", textAlign: "center" }}>
        {value}
      </Typography>
      <IconButton
        onClick={onIncrement}
        disabled={value >= (maxVal || Infinity)}
        sx={{
          bgcolor: "#E0E4E9",
          borderRadius: "8px",
          p: 1,
          "&.Mui-disabled": { opacity: 0.3 },
          "&:hover": { bgcolor: "#D1D5DB" }
        }}
      >
        <AddIcon sx={{ fontSize: "20px", color: "#111213" }} />
      </IconButton>
    </Box>
  </Box>
);

const GuestsDropdown = ({ 
  isOpen, 
  adults, 
  setAdults, 
  children, 
  setChildren, 
  rooms, 
  setRooms, 
  childAges, 
  setChildAges, 
  openAgeIndex, 
  setOpenAgeIndex, 
  onClose 
}) => {
  if (!isOpen) return null;

  const ages = [
    "<1 year old",
    ...Array.from({ length: 17 }, (_, i) => `${i + 1} year${i + 1 > 1 ? "s" : ""} old`)
  ];

  const handleAdults = (delta) => {
    const newVal = Math.max(1, Math.min(10, adults + delta));
    setAdults(newVal);
  };

  const handleChildren = (delta) => {
    const newCount = Math.max(0, Math.min(5, children + delta));
    if (newCount === children) return;
    setChildren(newCount);
    setOpenAgeIndex(null);
    if (delta > 0) {
      setChildAges([...childAges, "<1 year old"]);
    } else if (delta < 0 && childAges.length > 0) {
      setChildAges(childAges.slice(0, -1));
    }
  };

  const updateChildAge = (index, age) => {
    const newAges = [...childAges];
    newAges[index] = age;
    setChildAges(newAges);
    setOpenAgeIndex(null);
  };

  const handleRooms = (delta) => {
    const newVal = Math.max(1, Math.min(10, rooms + delta));
    setRooms(newVal);
  };

  return (
    <Box
      onClick={(e) => e.stopPropagation()}
      sx={{
        position: "absolute",
        top: "85px",
        right: 0,
        width: "380px",
        zIndex: 1000,
        backgroundColor: "#fff",
        borderRadius: "8px",
        boxShadow: "0px 8px 30px rgba(0,0,0,0.12)",
        p: 2,
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          right: "103.5px",
          transform: "translate(50%, -100%)",
          width: 0,
          height: 0,
          borderLeft: "10px solid transparent",
          borderRight: "10px solid transparent",
          borderBottom: "10px solid #fff",
        },
      }}
    >
      <GuestRow
        label="Adults"
        subtitle="18+ years"
        value={adults}
        onIncrement={() => handleAdults(1)}
        onDecrement={() => handleAdults(-1)}
        minVal={1}
        maxVal={10}
      />
      <Divider />
      <GuestRow
        label="Children"
        subtitle="0-17 years"
        value={children}
        onIncrement={() => handleChildren(1)}
        onDecrement={() => handleChildren(-1)}
        minVal={0}
        maxVal={5}
      />

      {children > 0 && (
        <Box sx={{ mt: 2, pb: 2 }}>
          <Typography sx={{ fontSize: "16px", color: "#626971", mb: 2, lineHeight: 1.4 }}>
            Add the age of each child so we can give you the best results for room type, size and price.
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {childAges.map((age, idx) => (
              <Box key={idx} sx={{ position: "relative" }}>
                <Typography sx={{ fontSize: "14px", fontWeight: 700, color: "#111213", mb: 0.5 }}>
                  Child {idx + 1}
                </Typography>
                <Box
                  onClick={() => setOpenAgeIndex(openAgeIndex === idx ? null : idx)}
                  sx={{
                    height: "45px",
                    border: "1px solid",
                    borderColor: openAgeIndex === idx ? "#0062E3" : "#D1D5DB",
                    borderRadius: "8px",
                    px: 2,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    cursor: "pointer",
                    backgroundColor: "#fff",
                    "&:hover": { borderColor: openAgeIndex === idx ? "#0062E3" : "#626971" }
                  }}
                >
                  <Typography sx={{ fontSize: "14px", color: "#111213" }}>{age}</Typography>
                  <KeyboardArrowDownIcon
                    sx={{
                      color: "#111213",
                      fontSize: "20px",
                      transform: openAgeIndex === idx ? "rotate(180deg)" : "none",
                      transition: "transform 0.2s"
                    }}
                  />
                </Box>
                {openAgeIndex === idx && (
                  <Box
                    sx={{
                      position: "absolute",
                      top: "70px",
                      left: 0,
                      right: 0,
                      backgroundColor: "#fff",
                      border: "1px solid #D1D5DB",
                      borderRadius: "8px",
                      boxShadow: "0px 4px 20px rgba(0,0,0,0.15)",
                      maxHeight: "250px",
                      overflowY: "auto",
                      zIndex: 1100,
                      py: 1
                    }}
                  >
                    {ages.map((ageOption) => (
                      <Box
                        key={ageOption}
                        onClick={() => updateChildAge(idx, ageOption)}
                        sx={{
                          px: 2,
                          py: 1,
                          fontSize: "14px",
                          color: age === ageOption ? "#fff" : "#111213",
                          backgroundColor: age === ageOption ? "#0062E3" : "transparent",
                          cursor: "pointer",
                          "&:hover": {
                            backgroundColor: age === ageOption ? "#0062E3" : "#f5f7f9"
                          }
                        }}
                      >
                        {ageOption}
                      </Box>
                    ))}
                  </Box>
                )}
              </Box>
            ))}
          </Box>
        </Box>
      )}

      <Divider />
      <GuestRow
        label="Rooms"
        subtitle="Number of rooms"
        value={rooms}
        onIncrement={() => handleRooms(1)}
        onDecrement={() => handleRooms(-1)}
        minVal={1}
        maxVal={10}
      />
      <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 1 }}>
        <Typography
          onClick={onClose}
          sx={{
            color: "#111213",
            fontWeight: 600,
            cursor: "pointer",
            fontSize: "16px",
            textDecoration: "underline",
            "&:hover": { color: "#000" }
          }}
        >
          Done
        </Typography>
      </Box>
    </Box>
  );
};

export default GuestsDropdown;
