"use client";

import React, { useState, useEffect, useRef, Suspense } from "react";
import {
  Box,
  Typography,
  Paper,
  Grid,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  InputAdornment,
  IconButton,
} from "@mui/material";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import dayjs from "dayjs";
import { useRouter, useSearchParams } from "next/navigation";
import DestDropdown from "../Hero/DestDropdown";
import GuestsDropdown from "../Hero/GuestsDropdown";
import CustomCalendar from "../Hero/CustomCalendar";

function SearchFormContent({ variant = "hero" }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  
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
    // Parse URL params on mount
    const dest = searchParams.get("dest");
    const checkin = searchParams.get("checkin");
    const checkout = searchParams.get("checkout");
    const ads = searchParams.get("adults");
    const chs = searchParams.get("children");
    const rs = searchParams.get("rooms");

    if (dest) setInputValue(dest);
    if (checkin) setCheckInDate(dayjs(checkin));
    if (checkout) setCheckOutDate(dayjs(checkout));
    if (ads) setAdults(parseInt(ads));
    if (chs) setChildren(parseInt(chs));
    if (rs) setRooms(parseInt(rs));
  }, [searchParams]);

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

  const handleSearch = () => {
    // Generate search query parameters or state as needed
    const params = new URLSearchParams({
      dest: selectedDestination?.city || inputValue,
      checkin: checkInDate.format("YYYY-MM-DD"),
      checkout: checkOutDate.format("YYYY-MM-DD"),
      adults: adults.toString(),
      children: children.toString(),
      rooms: rooms.toString()
    });
    router.push(`/search?${params.toString()}`);
  };

  const filteredDestinations = destinations.filter(
    (dest) =>
      dest.city.toLowerCase().includes(inputValue.toLowerCase()) ||
      dest.country.toLowerCase().includes(inputValue.toLowerCase())
  );

  const isCompact = variant === "compact";

  return (
    <Paper
      elevation={0}
      sx={{
        backgroundColor: isCompact ? "transparent" : "#05203c",
        p: isCompact ? 0 : 2,
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
            md={12}
            lg={isCompact ? 4 : 4.5} 
            sx={{ position: "relative" }}
          >
            <Box
              sx={{
                backgroundColor: "#fff",
                borderRadius: { xs: "12px 12px 0 0", lg: isCompact ? "8px 0 0 8px" : "12px 0 0 12px" },
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
            xs={12} 
            sm={12}
            md={3}
            lg={isCompact ? 1.5 : 1.5} 
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
                borderRadius: { xs: 0, md: "0 0 0 12px", lg: 0 },
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
                // If new check-in is after or same as current check-out, advance check-out
                if (date.isAfter(checkOutDate) || date.isSame(checkOutDate)) {
                  setCheckOutDate(date.add(1, "day"));
                }
                handleOutClick();
              }}
              onClose={handleClose}
              isOpen={showIn}
              showMonthSelect={showMonthSelect}
              setShowMonthSelect={setShowMonthSelect}
              minDate={dayjs()}
            />
          </Grid>

          {/* Check-out Field */}
          <Grid 
            item 
            xs={12} 
            sm={12}
            md={3}
            lg={isCompact ? 1.5 : 1.5} 
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
              minDate={checkInDate}
            />
          </Grid>

          {/* Guests and rooms */}
          <Grid 
            item 
            xs={12} 
            md={6}
            lg={isCompact ? 2.5 : 2.5} 
            sx={{ cursor: "pointer", position: "relative" }} 
            onClick={handleGuestsClick}
          >
            <Box
              sx={{
                backgroundColor: "#fff",
                borderRadius: { xs: "0 0 12px 12px", md: "0 0 12px 0", lg: isCompact ? 0 : "0 12px 12px 0" },
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
          <Grid 
            item 
            xs={12} 
            md={12}
            lg={isCompact ? 2.5 : 2} 
            sx={{ display: "flex", alignItems: "center", pr: 0.5 }}
          >
            <Button
              fullWidth
              variant="contained"
              onClick={handleSearch}
              sx={{
                backgroundColor: "#0062E3",
                color: "#fff",
                height: isCompact ? "70px" : { xs: "56px", md: "47px", lg: "70px" },
                borderRadius: isCompact ? { xs: "8px", lg: "0 8px 8px 0" } : "8px",
                fontSize: "1rem",
                fontWeight: 600,
                textTransform: "none",
                ml: isCompact ? 0 : { xs: 0, lg: 1.7 },
                "&:hover": { backgroundColor: "#0052c2" },
              }}
            >
              Search
            </Button>
          </Grid>

          {/* Bottom Checkboxes (only in hero variant) */}
          {!isCompact && (
            <Box sx={{ display: "flex", gap: 3, pl: 2, pt: 1, width: "100%" }}>
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
                      "&.Mui-checked": { color: "#0062E3", backgroundColor: "#fff" },
                      "& .MuiSvgIcon-root": { fontSize: "20px" }
                    }}
                  />
                }
                label={<Typography sx={{ color: "#fff", fontSize: "16px", fontWeight: 500 }}>Free cancellation</Typography>}
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
                      "&.Mui-checked": { color: "#0062E3", backgroundColor: "#fff" },
                      "& .MuiSvgIcon-root": { fontSize: "20px" }
                    }}
                  />
                }
                label={<Typography sx={{ color: "#fff", fontSize: "16px", fontWeight: 500 }}>4 stars +</Typography>}
              />
            </Box>
          )}
        </Grid>
      </Box>
    </Paper>
  );
}

export default function SearchForm(props) {
  return (
    <Suspense fallback={<Box sx={{ height: "70px", backgroundColor: "#05203c", borderRadius: "16px" }} />}>
      <SearchFormContent {...props} />
    </Suspense>
  );
}
