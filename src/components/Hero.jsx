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
import BusinessOutlinedIcon from "@mui/icons-material/BusinessOutlined";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import dayjs from "dayjs";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useEffect, useRef } from "react";

const generateMonths = () => {
  const list = [];
  let start = dayjs().startOf("month");
  for (let i = 0; i < 14; i++) {
    list.push(start.add(i, "month"));
  }
  return list;
};
const monthsList = generateMonths();

const CustomCalendar = ({ value, onChange, onClose, isOpen, showMonthSelect, setShowMonthSelect }) => {
  if (!isOpen) return null;
  return (
    <Box
      onClick={(e) => e.stopPropagation()}
      sx={{
        position: "absolute",
        top: "85px",
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 1000,
        backgroundColor: "#fff",
        borderRadius: "12px",
        boxShadow: "0px 8px 30px rgba(0,0,0,0.12)",
        p: 0,
        width: "350px", 
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
      <DateCalendar
        value={value}
        onChange={(newValue) => {
          onChange(newValue);
          setShowMonthSelect(false);
        }}
        minDate={dayjs()}
        sx={{
          width: "100%",
          minHeight: "420px", 
          overflow: "hidden !important",
          "& *": {
            msOverflowStyle: "none",
            scrollbarWidth: "none",
          },
          "& *::-webkit-scrollbar": {
            display: "none",
          },
          "& .MuiPickersFadeTransitionGroup-root": {
            overflow: "hidden !important",
          },
          "& .MuiDayCalendar-root": {
            overflow: "hidden !important",
            minHeight: "330px",
          },
          "& .MuiPickersCalendarHeader-root": {
            mt: 2,
            px: 3,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          },
          "& .MuiPickersCalendarHeader-labelContainer": {
            margin: 0,
            border: "1px solid #D1D5DB",
            borderRadius: "8px",
            px: 2,
            py: 0.5,
            display: "flex",
            alignItems: "center",
            gap: 1,
            pointerEvents: "none", 
          },
          "& .MuiPickersCalendarHeader-label": {
            fontSize: "1rem",
            fontWeight: 500,
            color: "#111827",
          },
          "& .MuiPickersArrowSwitcher-root": {
            display: "none", 
          },
          "& .MuiDayCalendar-header": {
            justifyContent: "space-between",
            pb: 1,
            borderBottom: "1px solid #E5E7EB",
            px: 1,
          },
          "& .MuiDayCalendar-weekContainer": {
            justifyContent: "space-between",
            margin: "8px 0",
            px: 1,
          },
          "& .MuiTypography-root.MuiDayCalendar-weekDayLabel": {
            color: "#111827",
            fontWeight: 600,
            width: "40px", 
          },
          "& .MuiPickersDay-root": {
            width: "40px",
            height: "40px",
            fontSize: "1.05rem",
            fontWeight: 500,
            "&.MuiPickersDay-outsideMonth": {
              color: "#9CA3AF !important",
            },
            "&:hover": {
              backgroundColor: "#F3F4F6",
            },
            "&.Mui-selected": {
              backgroundColor: "#0062E3 !important",
              color: "#fff !important",
              "&:hover": {
                backgroundColor: "#0052c2 !important",
              },
            },
            "&.MuiPickersDay-today": {
              border: "none",
              fontWeight: "bold",
            },
          },
        }}
        slots={{
          calendarHeader: (props) => {
            const { currentMonth, onMonthChange } = props;
            return (
              <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%", px: 2, py: 1 }}>
                <Button 
                  disabled={currentMonth.isBefore(dayjs(), "month") || currentMonth.isSame(dayjs(), "month")}
                  onClick={() => onMonthChange(currentMonth.subtract(1, "month"), "left")}
                  sx={{ 
                    minWidth: "auto", 
                    p: 1, 
                    color: (currentMonth.isBefore(dayjs(), "month") || currentMonth.isSame(dayjs(), "month")) ? "#D1D5DB" : "#000" 
                  }}
                >
                  <PlayArrowIcon sx={{ transform: "rotate(180deg)", fontSize: "1.5rem" }} />
                </Button>
                
                <Box 
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowMonthSelect(!showMonthSelect);
                  }}
                  sx={{ 
                    border: "1px solid #0062E3", 
                    borderRadius: "8px", 
                    px: 2, 
                    py: 1, 
                    display: "flex", 
                    alignItems: "center", 
                    gap: 5,
                    cursor: "pointer",
                    position: "relative",
                    zIndex: 1002
                  }}
                >
                  <Typography sx={{ fontSize: "1.1rem", fontWeight: 500, color: "#111827" }}>
                    {currentMonth.format("MMMM YYYY")}
                  </Typography>
                  <KeyboardArrowDownIcon sx={{ color: "#374151" }} />

                  {showMonthSelect && (
                    <Box
                      sx={{
                        position: "absolute",
                        top: "100%",
                        left: -1,
                        right: -1,
                        maxHeight: "350px",
                        overflowY: "auto",
                        backgroundColor: "#fff",
                        border: "1px solid #0062E3",
                        borderTop: "none",
                        borderRadius: "0 0 8px 8px",
                        zIndex: 2000,
                        boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
                        "&::-webkit-scrollbar": { display: "none" },
                        scrollbarWidth: "none",
                      }}
                    >
                      {monthsList.map((m, idx) => {
                        const isSelected = m.format("MMMM YYYY") === currentMonth.format("MMMM YYYY");
                        return (
                          <Box
                            key={idx}
                            onClick={(e) => {
                              e.stopPropagation();
                              onMonthChange(m, m.isAfter(currentMonth) ? "right" : "left");
                              setShowMonthSelect(false);
                            }}
                            sx={{
                              px: 2,
                              py: 1.2,
                              fontSize: "1.1rem",
                              color: isSelected ? "#fff" : "#111827",
                              backgroundColor: isSelected ? "#0062E3" : "transparent",
                              "&:hover": {
                                backgroundColor: isSelected ? "#0062E3" : "#f3f7fe",
                              },
                            }}
                          >
                            {m.format("MMMM YYYY")}
                          </Box>
                        );
                      })}
                    </Box>
                  )}
                </Box>

                <Button 
                  onClick={() => onMonthChange(currentMonth.add(1, "month"), "right")}
                  sx={{ minWidth: "auto", p: 1, color: "#000" }}
                >
                  <PlayArrowIcon sx={{ fontSize: "1.5rem" }} />
                </Button>
              </Box>
            );
          }
        }}
      />
      <Box sx={{ display: "flex", justifyContent: "flex-end", px: 3, pb: 2 }}>
        <Typography 
          onClick={onClose}
          sx={{ 
            color: "#111827", 
            fontWeight: 500, 
            cursor: "pointer", 
            textDecoration: "underline",
            "&:hover": { color: "#000" }
          }}
        >
          Close
        </Typography>
      </Box>
    </Box>
  );
};

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
  const [childAges, setChildAges] = useState([]); // Array of strings or numbers
  const [rooms, setRooms] = useState(1);
  const [showGuests, setShowGuests] = useState(false);

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

  const DestDropdown = () => {
    if (!showDest) return null;
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

  const GuestsDropdown = ({ adults, setAdults, children, setChildren, rooms, setRooms, isOpen, onClose }) => {
    if (!isOpen) return null;

    const [openAgeIndex, setOpenAgeIndex] = useState(null);

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
        setChildAges([...childAges, "12 years old"]);
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

    const Row = ({ label, subtitle, value, onIncrement, onDecrement, minVal, maxVal }) => (
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
            right: "103.5px", // Half of parent field width (207px)
            transform: "translate(50%, -100%)",
            width: 0,
            height: 0,
            borderLeft: "10px solid transparent",
            borderRight: "10px solid transparent",
            borderBottom: "10px solid #fff",
          },
        }}
      >
        <Row 
          label="Adults" 
          subtitle="18+ years" 
          value={adults} 
          onIncrement={() => handleAdults(1)} 
          onDecrement={() => handleAdults(-1)} 
          minVal={1}
          maxVal={10}
        />
        <Divider />
        <Row 
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
                    <Typography sx={{ fontSize: "14px", color: "#111213" }}>
                      {age}
                    </Typography>
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
        <Row 
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
          // variant="h1"
          sx={{
            color: "#ffffff",
            fontWeight: 500,
            WebkitTextStroke: "2px #ffffff", // Simulates extra boldness
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
            "@keyframes drift": {
              "0%": { transform: "translateY(0)", color: "#ffffff", WebkitTextStroke: "2px #ffffff" },
              "100%": { transform: "translateY(var(--drift-y))", color: "#05203c", WebkitTextStroke: "2px #05203c" }
            }
          }}
        >
          Find the right hotel today
        </Typography>

        <Paper
          elevation={0}
          sx={{
            backgroundColor: "#05203c",
            borderRadius: "8px",
            p: 3,
            width: "100%",
            overflow: "visible", // Critical for custom absolute calendar
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
              <DestDropdown />
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
                <Typography variant="caption" sx={{ color: "#1616161", fontSize: "1rem" }}>
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
                  p: showGuests ? "22px 22px" : 3, // Adjust padding when border is present to prevent jump
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
                adults={adults} 
                setAdults={setAdults} 
                children={children} 
                setChildren={setChildren} 
                rooms={rooms} 
                setRooms={setRooms} 
                isOpen={showGuests} 
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
                    color: "#D1D5DB", // Gray border color when unchecked
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
                    color: "#D1D5DB", // Gray border color when unchecked
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
