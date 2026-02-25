"use client";

import React, { useState } from "react";
import {
  Box,
  Container,
  Typography,
  Paper,
  Grid,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  InputAdornment,
  IconButton,
  Divider,
} from "@mui/material";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import dayjs from "dayjs";
import { useEffect, useRef } from "react";
import DestDropdown from "./DestDropdown";
import GuestsDropdown from "./GuestsDropdown";
import CustomCalendar from "./CustomCalendar";

export default function Hero() {
  const [checkInDate, setCheckInDate] = useState(dayjs());
  const [checkOutDate, setCheckOutDate] = useState(dayjs().add(1, "day"));
  const [showIn, setShowIn] = useState(false);
  const [showOut, setShowOut] = useState(false);
  const [destinations, setDestinations] = useState([]);
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [showDest, setShowDest] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [showMonthSelect, setShowMonthSelect] = useState(false);
  
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [childAges, setChildAges] = useState([]); 
  const [rooms, setRooms] = useState(1);
  const [showGuests, setShowGuests] = useState(false);
  const [openAgeIndex, setOpenAgeIndex] = useState(null);

  const containerRef = useRef(null);

  useEffect(() => {
    fetch("/api/destinations")
      .then((res) => res.json())
      .then((data) => setDestinations(data))
      .catch((err) => console.error("Error fetching destinations:", err));
  }, []);

  const handleInClick = () => {
    setShowIn(!showIn);
    setShowOut(false);
    setShowDest(false);
    setShowGuests(false);
    setShowMonthSelect(false);
  };
  const handleOutClick = () => {
    setShowOut(!showOut);
    setShowIn(false);
    setShowDest(false);
    setShowGuests(false);
    setShowMonthSelect(false);
  };
  const handleDestClick = () => {
    setShowDest(!showDest);
    setShowIn(false);
    setShowOut(false);
    setShowGuests(false);
    setShowMonthSelect(false);
  };
  const handleGuestsClick = () => {
    setShowGuests(!showGuests);
    setShowIn(false);
    setShowOut(false);
    setShowDest(false);
    setShowMonthSelect(false);
  };

  const handleClose = () => {
    setShowIn(false);
    setShowOut(false);
    setShowDest(false);
    setShowGuests(false);
    setShowMonthSelect(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        handleClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const filteredDestinations = destinations.filter(
    (dest) =>
      dest.city.toLowerCase().includes(inputValue.toLowerCase()) ||
      dest.country.toLowerCase().includes(inputValue.toLowerCase())
  );

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
            fontSize: { xs: "1.9rem", md: "4rem", lg: "4rem" },
            mb: 2,
            lineHeight: 1.2,
            fontStyle:"normal", 
            fontFamily:"Arial",
            letterSpacing:"2px",
            position: "relative",
            "--drift-y": { xs: "-20px", sm: "-30px", md: "-30px", lg: "-80px" },
            animation: "drift 3s ease-in-out infinite alternate",
            zIndex: 3,
          }}
        >
          Discover your next <br /> adventure
        </Typography>

        <Paper
          elevation={0}
          sx={{
            backgroundColor: "#05203c",
            p: 1,
            borderRadius: "16px",
            width: "100%",
          }}
        >
          <Box ref={containerRef}>
            <Grid container columnSpacing={0.2} rowSpacing={0.5} sx={{ alignItems: "stretch", position: "relative" }}>
            {/* Destination Field */}
            <Grid 
              item 
              xs={12} 
              md={4.5} 
              width={{ xs: "100%", md: "100%", lg:463 }} 
              sx={{ position: "relative" }}
            >
              <Box
                sx={{
                  backgroundColor: "#fff",
                  borderRadius: { xs: "12px 12px 0 0", lg: "12px 0 0 12px" },
                  p: showDest ? "14px 14px" : 2,
                  height: "70px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-start",
                  pt: showDest ? "10px" : 1.5,
                  cursor: "text",
                  border: showDest ? "1px solid #0062E3" : "none",
                  boxSizing: "border-box"
                }}
                onClick={handleDestClick}
              >
                <Typography sx={{ color: "#626971", fontWeight: 600, fontSize: "14px" }}>
                  Where do you want to go?
                </Typography>
                <TextField
                  fullWidth
                  variant="standard"
                  placeholder="Enter a destination or hotel name"
                  value={inputValue}
                  onChange={(e) => {
                    setInputValue(e.target.value);
                    if (!showDest) setShowDest(true);
                  }}
                  InputProps={{
                    disableUnderline: true,
                    style: { fontSize: "16px", fontWeight: 400 },
                    endAdornment: inputValue && (
                      <InputAdornment position="end">
                        <CancelOutlinedIcon 
                          sx={{ 
                            cursor: "pointer", 
                            color: "#626971",
                            fontSize: "20px",
                            "&:hover": { color: "#111213" }
                          }} 
                          onClick={(e) => {
                            e.stopPropagation();
                            setInputValue("");
                            setSelectedDestination(null);
                          }}
                        />
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>
              <DestDropdown 
                isOpen={showDest}
                filteredDestinations={filteredDestinations}
                setSelectedDestination={setSelectedDestination}
                setInputValue={setInputValue}
                handleInClick={handleInClick}
              />
            </Grid>

            {/* Check-in Field */}
            <Grid 
              item 
              xs={6} 
              md={1.5} 
              width={{ xs: "100%",sm: "25%", md: "25%", lg:201 }} 
              sx={{ cursor: "pointer", position: "relative" }}
              onClick={handleInClick}
            >
              <Box
                sx={{
                  backgroundColor: "#fff",
                  p: showIn ? "14px 14px" : 2,
                  height: "70px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  border: showIn ? "1px solid #0062E3" : "none",
                  borderRadius: { xs: "0 0 0 12px", lg: 0 },
                  zIndex: showIn ? 1 : 0,
                  boxSizing: "border-box"
                }}
              >
                <Typography variant="caption" sx={{ color: "#161616", fontSize: "1rem" }}>
                  Check-in
                </Typography>
                <Typography variant="body1">
                  {checkInDate.format("DD/MM/YYYY")}
                </Typography>
              </Box>
              <CustomCalendar
                value={checkInDate}
                onChange={(date) => {
                  setCheckInDate(date);
                  handleOutClick();
                }}
                onClose={handleClose}
                isOpen={showIn}
                showMonthSelect={showMonthSelect}
                setShowMonthSelect={setShowMonthSelect}
              />
            </Grid>

            {/* Check-out Field */}
            <Grid 
              item 
              xs={6} 
              md={1.5} 
              width={{ xs: "100%",sm: "24.5%", md: "25%", lg:201 }} 
              sx={{ cursor: "pointer", position: "relative" }}
              onClick={handleOutClick}
            >
              <Box
                sx={{
                  backgroundColor: "#fff",
                  p: showOut ? "14px 14px" : 2,
                  height: "70px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  border: showOut ? "1px solid #0062E3" : "none",
                  borderRadius: "0",
                  zIndex: showOut ? 1 : 0,
                  boxSizing: "border-box"
                }}
              >
                <Typography variant="caption" sx={{ color: "#161616", fontSize: "1rem" }}>
                  Check-out
                </Typography>
                <Typography variant="body1">
                  {checkOutDate.format("DD/MM/YYYY")}
                </Typography>
              </Box>
              <CustomCalendar
                value={checkOutDate}
                onChange={(date) => {
                  setCheckOutDate(date);
                  handleGuestsClick();
                }}
                onClose={handleClose}
                isOpen={showOut}
                showMonthSelect={showMonthSelect}
                setShowMonthSelect={setShowMonthSelect}
              />
            </Grid>

            {/* Guests and rooms */}
            <Grid item xs={12} md={2.5} width={{ xs: "100%",sm: "50%", md: "49.6%", lg:207 }} sx={{ pl: "2px !important", cursor: "pointer", position: "relative" }} onClick={handleGuestsClick}>
              <Box
                sx={{
                  backgroundColor: "#fff",
                  borderRadius:{ xs: "0 0 12px 0", lg: "0 12px 12px 0"},
                  p: showGuests ? "22px 22px" : 3, 
                  height: "70px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  border: showGuests ? "1px solid #0062E3" : "none",
                  zIndex: showGuests ? 1 : 0,
                  boxSizing: "border-box"
                }}
              >
                <Typography variant="caption" sx={{ color: "#626971", fontSize:"14px", fontWeight: 600 }}>
                  Guests and rooms
                </Typography>
                <Typography variant="body1" >
                  {adults + children} guest{adults + children > 1 ? 's' : ''}, {rooms} room{rooms > 1 ? 's' : ''}
                </Typography>
              </Box>
              <GuestsDropdown 
                isOpen={showGuests}
                adults={adults}
                setAdults={setAdults}
                children={children}
                setChildren={setChildren}
                rooms={rooms}
                setRooms={setRooms}
                childAges={childAges}
                setChildAges={setChildAges}
                openAgeIndex={openAgeIndex}
                setOpenAgeIndex={setOpenAgeIndex}
                onClose={handleClose}
              />
            </Grid>

            {/* Search Button */}
            <Grid item xs={12} md={2} sx={{ display: "flex", alignItems: "center", pr: 0.5, order: { xs: 2, lg: 0 } }} width={{ xs: "100%", md:"100%", lg:100 }}>
              <Button
                fullWidth
                variant="contained"
                sx={{
                  backgroundColor: "#0062E3",
                  color: "#fff",
                  height: { xs: "56px", md: "47px", lg:"70px" },
                  borderRadius: "8px",
                  fontSize: "1rem",
                  fontWeight: 600,
                  textTransform: "none",
                  ml: {xs: 0, lg: 1.7},
                  "&:hover": { backgroundColor: "#0052c2" },
                }}
              >
                Search
              </Button>
            </Grid>
        

          {/* Bottom Checkboxes */}
          <Box sx={{ display: "flex", gap: 3, pl: 2, pt: 1, order: { xs: 1, lg: 3 }, width: "100%" }}>
            <FormControlLabel
              control={
                <Checkbox
                  size="small"
                  sx={{
                    color: "#D1D5DB", 
                    backgroundColor: "#fff",
                    p: 0,
                    borderRadius: "3px",
                    mr: 1, 
                    "&:hover": { backgroundColor: "#fff" },
                    "&.Mui-checked": {
                      color: "#0062E3",
                      backgroundColor: "#fff",
                    },
                    "& .MuiSvgIcon-root": {
                      fontSize: "20px",
                    }
                  }}
                />
              }
              label={
                <Typography  sx={{ color: "#fff", fontSize:"16px", fontWeight: 500 }}>
                  Free cancellation
                </Typography>
              }
            />
            <FormControlLabel
              control={
                <Checkbox
                  size="small"
                  sx={{
                    color: "#D1D5DB", 
                    backgroundColor: "#fff",
                    p: 0,
                    borderRadius: "3px",
                    mr: 1,
                    "&:hover": { backgroundColor: "#fff" },
                    "&.Mui-checked": {
                      color: "#0062E3",
                      backgroundColor: "#fff",
                    },
                    "& .MuiSvgIcon-root": {
                      fontSize: "20px",
                    }
                  }}
                />
              }
              label={
                <Typography  sx={{ color: "#fff", fontSize:"16px", fontWeight: 500 }}>
                  4 stars +
                </Typography>
              }
            />
          </Box>
          </Grid>
        </Box>
        </Paper>
      </Container>
    </Box>
  );
}
