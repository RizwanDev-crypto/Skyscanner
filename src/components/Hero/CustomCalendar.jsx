"use client";

import React from "react";
import { Box, Typography, Button, IconButton } from "@mui/material";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { PickersDay } from "@mui/x-date-pickers/PickersDay";
import dayjs from "dayjs";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

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
          },
          day: (props) => {
            const isToday = props.day.isSame(dayjs(), "day");
            return (
              <Box sx={{ position: "relative" }}>
                <PickersDay {...props} />
                {isToday && (
                  <Box
                    sx={{
                      position: "absolute",
                      bottom: "5px",
                      left: "50%",
                      transform: "translateX(-50%)",
                      width: "4px",
                      height: "4px",
                      borderRadius: "50%",
                      backgroundColor: props.selected ? "#fff" : "#0062E3",
                    }}
                  />
                )}
              </Box>
            );
          },
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

export default CustomCalendar;
