"use client";

import React, { useState } from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  IconButton,
} from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

const travelOptionsData = {
  "Popular hotel chains": [
    "Best Western Premier hotels in Islamabad",
    "Hilton Dubai hotel deals",
    "Flair Lahore hotel deals",
    "No hotel chain Jeddah hotel deals",
    "Rosewood Hotels Jeddah hotel deals",
    "Continental Jeddah hotel deals",
    "Swiss International hotels in Lahore",
    "Best Western hotels in Islamabad",
    "Mövenpick Karachi hotel deals",
    "Marriott London hotel deals",
    "Accor Paris hotel deals",
    "Hyatt New York hotel deals"
  ],
  "Top countries": ["United Arab Emirates", "United Kingdom", "Saudi Arabia", "Pakistan", "United States", "France", "Turkey", "Thailand", "Germany"],
  "Hotels near airports": ["Dubai Airport Hotels", "London Heathrow Hotels", "Islamabad International Hotels", "Jeddah Airport Hotels"],
  "Hotels by star rating": ["5 Star Hotels", "4 Star Hotels", "3 Star Hotels", "2 Star Hotels", "1 Star Hotels"],
  "Popular cities": ["Dubai", "London", "Jeddah", "Islamabad", "Karachi", "Lahore", "Istanbul", "Paris", "Bangkok"],
  "Find hotels by region": ["Middle East", "Europe", "South Asia", "Southeast Asia", "North America"],
  "Popular neighbourhoods": ["Downtown Dubai", "Paddington London", "Gulberg Lahore", "F-7 Islamabad"],
};

const ITEMS_PER_PAGE = 9;

export default function TravelOptions() {
  const [activeTab, setActiveTab] = useState("Popular hotel chains");
  const [page, setPage] = useState(0);

  const currentLinks = travelOptionsData[activeTab] || [];
  const totalPages = Math.ceil(currentLinks.length / ITEMS_PER_PAGE);
  const displayedLinks = currentLinks.slice(
    page * ITEMS_PER_PAGE,
    (page + 1) * ITEMS_PER_PAGE
  );

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setPage(0);
  };

  const handleNext = () => setPage((prev) => (prev + 1) % totalPages);
  const handlePrev = () => setPage((prev) => (prev - 1 + totalPages) % totalPages);

  return (
    <Box sx={{ bgcolor: "#fff", py: 8 }}>
      <Container maxWidth="lg">
        <Typography
          sx={{
            fontWeight: 600,
            fontSize: "24px",
            color: "#161616",
            mb: 4,
          }}
        >
          More travel options
        </Typography>

        {/* Tabs */}
        <Box
          sx={{
            display: "flex",
            gap: 1.5,
            mb: 5,
            flexWrap: "wrap",
            overflowX: "auto",
            pb: 1,
            "&::-webkit-scrollbar": { display: "none" },
          }}
        >
          {Object.keys(travelOptionsData).map((tab) => (
            <Button
              key={tab}
              onClick={() => handleTabChange(tab)}
              sx={{
                borderRadius: "8px",
                px: 1.5,
                py: 0.5,
                textTransform: "none",
                fontSize: "14px",
                
                border: "1px solid",
                borderColor: activeTab === tab ? "#05203C" : "#D1D5DB",
                bgcolor: activeTab === tab ? "#05203C" : "transparent",
                color: activeTab === tab ? "#fff" : "#161616",
                whiteSpace: "nowrap",
                "&:hover": {
                  bgcolor: activeTab === tab ? "#05203C" : "#F3F4F6",
                  borderColor: activeTab === tab ? "#05203C" : "#626971",
                },
              }}
            >
              {tab}
            </Button>
          ))}
        </Box>

        {/* Links Grid */}
        <Grid 
          container 
          columnSpacing={13} 
          rowSpacing={{ xs: 1.5, sm: 0 }} 
          sx={{ minHeight: "160px" }}
        >
          {[0, 1, 2].map((colIndex) => (
            <Grid item xs={12} sm={4} key={colIndex}>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
                {displayedLinks
                  .slice(colIndex * 3, colIndex * 3 + 3)
                  .map((link, linkIndex) => (
                    <Typography
                      key={linkIndex}
                      sx={{
                        fontSize: "14px",
                        color: "#161616",
                        cursor: "pointer",
                        "&:hover": {  textDecoration: "underline" },
                      }}
                    >
                      {link}
                    </Typography>
                  ))}
              </Box>
            </Grid>
          ))}
        </Grid>

        {/* Carousel Controls */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mt: 6,
          }}
        >
          <IconButton onClick={handlePrev} disabled={totalPages <= 1}>
            <ChevronLeftIcon sx={{ color: totalPages <= 1 ? "#C9CDD1" : "#161616" }} />
          </IconButton>

          <Box sx={{ display: "flex", gap: 1 }}>
            {[...Array(totalPages)].map((_, i) => (
              <Box
                key={i}
                onClick={() => setPage(i)}
                sx={{
                  width: i === page ? "20px" : "8px",
                  height: "8px",
                  borderRadius: "4px",
                  bgcolor: i === page ? "#05203C" : "#C9CDD1",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                }}
              />
            ))}
          </Box>

          <IconButton onClick={handleNext} disabled={totalPages <= 1}>
            <ChevronRightIcon sx={{ color: totalPages <= 1 ? "#C9CDD1" : "#161616" }} />
          </IconButton>
        </Box>
      </Container>
    </Box>
  );
}
