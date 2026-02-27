"use client";

import React, { useState } from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Button,
  Card,
  CardMedia,
  CardContent,
  IconButton,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import GradeIcon from "@mui/icons-material/Grade";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

const cities = ["Islamabad", "Karachi", "Gilgit", "Lahore", "Murree"];

const hotels = [
  { id: 1, name: "Oriole Luxury Hotel", distance: "3.94 km from city centre", rating: 3.2, ratingText: "Satisfactory", reviews: 44, price: "Rs2,267", image: "/Hotel cards/imgi_10_1555845736_392x116.jpg", stars: 5 },
  { id: 2, name: "Hotel 11", distance: "6.43 km from city centre", rating: 3.6, ratingText: "Good", reviews: 56, price: "Rs3,778", image: "/Hotel cards/imgi_13_2509305285_392x116.jpg", stars: 4 },
  { id: 3, name: "Swiss Cottage", distance: "5.24 km from city centre", rating: 1, ratingText: "Below average", reviews: 2, price: "Rs2,645", image: "/Hotel cards/imgi_8_2539323598_392x116.jpg", stars: 3 },
  { id: 4, name: "Pearl Continental Hotel", distance: "2.10 km from city centre", rating: 4.1, ratingText: "Very Good", reviews: 120, price: "Rs5,500", image: "/Hotel cards/imgi_11_977462127_392x116.jpg", stars: 5 },
  { id: 5, name: "Serena Hotel Islamabad", distance: "1.80 km from city centre", rating: 4.5, ratingText: "Excellent", reviews: 210, price: "Rs8,900", image: "/Hotel cards/imgi_12_2375313091_392x116.jpg", stars: 5 },
  { id: 6, name: "Margalla View Hotel", distance: "5.20 km from city centre", rating: 3.8, ratingText: "Good", reviews: 67, price: "Rs3,100", image: "/Hotel cards/imgi_8_2539323598_392x116.jpg", stars: 3 },
  { id: 7, name: "Envoy Continental Hotel", distance: "4.50 km from city centre", rating: 3.5, ratingText: "Good", reviews: 89, price: "Rs4,200", image: "/Hotel cards/imgi_9_2236111762_392x116.jpg", stars: 4 },
  { id: 8, name: "Ramada by Wyndham", distance: "2.50 km from city centre", rating: 4.2, ratingText: "Very Good", reviews: 156, price: "Rs6,400", image: "/Hotel cards/imgi_10_1555845736_392x116.jpg", stars: 5 },
  { id: 9, name: "Marriott Hotel", distance: "1.20 km from city centre", rating: 4.6, ratingText: "Excellent", reviews: 302, price: "Rs9,200", image: "/Hotel cards/imgi_11_977462127_392x116.jpg", stars: 5 },
  { id: 10, name: "Avari Towers", distance: "0.50 km from city centre", rating: 4.4, ratingText: "Very Good", reviews: 450, price: "Rs 7,800", image: "/Hotel cards/imgi_13_2509305285_392x116.jpg", stars: 5 },
  { id: 11, name: "Shangrila Resort", distance: "2.00 km from city centre", rating: 4.8, ratingText: "Exceptional", reviews: 180, price: "Rs 12,500", image: "/Hotel cards/imgi_12_2375313091_392x116.jpg", stars: 5 },
  { id: 12, name: "Royal Palm Hotel", distance: "4.80 km from city centre", rating: 4.0, ratingText: "Very Good", reviews: 92, price: "Rs 6,200", image: "/Hotel cards/imgi_8_2546153102_392x116.jpg", stars: 4 },
  { id: 13, name: "Pine View Resort", distance: "1.50 km from city centre", rating: 3.9, ratingText: "Good", reviews: 64, price: "Rs 4,500", image: "/Hotel cards/imgi_9_2236111762_392x116.jpg", stars: 4 },
  { id: 14, name: "The Nishat Hotel", distance: "3.20 km from city centre", rating: 4.3, ratingText: "Very Good", reviews: 215, price: "Rs 8,200", image: "/Hotel cards/imgi_11_977462127_392x116.jpg", stars: 5 },
  { id: 15, name: "Pearl Continental Karachi", distance: "1.20 km from city centre", rating: 4.2, ratingText: "Very Good", reviews: 310, price: "Rs 9,500", image: "/Hotel cards/imgi_10_1555845736_392x116.jpg", stars: 5 },
  { id: 16, name: "Islamabad Club", distance: "2.50 km from city centre", rating: 4.6, ratingText: "Excellent", reviews: 145, price: "Rs 15,000", image: "/Hotel cards/imgi_12_2375313091_392x116.jpg", stars: 5 },
  { id: 17, name: "Luxus Grand Hotel", distance: "0.80 km from city centre", rating: 4.5, ratingText: "Excellent", reviews: 278, price: "Rs 11,200", image: "/Hotel cards/imgi_13_2509305285_392x116.jpg", stars: 5 },
  { id: 18, name: "Byramji Hotel", distance: "3.50 km from city centre", rating: 3.8, ratingText: "Good", reviews: 52, price: "Rs 5,800", image: "/Hotel cards/imgi_8_2539323598_392x116.jpg", stars: 4 },
  { id: 19, name: "Fairy Meadows Cottages", distance: "10.00 km from city centre", rating: 4.9, ratingText: "Exceptional", reviews: 89, price: "Rs 7,500", image: "/Hotel cards/imgi_11_977462127_392x116.jpg", stars: 5 },
];

const cityHotelMapping = {
  Islamabad: [0, 1, 2, 4, 8, 15],         // Islamabad selection
  Karachi: [9, 14, 6, 7],                // Karachi selection (Avari, PC Karachi +)
  Gilgit: [10, 18, 2, 3],                // Gilgit selection (Shangrila, Fairy Meadows +)
  Lahore: [11, 13, 16, 1],               // Lahore selection (Royal Palm, Nishat, Luxus +)
  Murree: [12, 17, 4, 5],                // Murree selection (Pine View, Byramji +)
};

import HotelCard from "./HotelCard";

export default function HotelsInCountry() {
  const [selectedCity, setSelectedCity] = useState("Islamabad");
  const [page, setPage] = useState(0);

  const theme = useTheme();
  const isLg = useMediaQuery(theme.breakpoints.up("lg"));
  const isMd = useMediaQuery(theme.breakpoints.up("md"));

  const cardsPerPage = isLg ? 3 : (isMd ? 2 : 1);

  // Get filtered hotels for the selected city
  const cityFilteredHotels = cityHotelMapping[selectedCity].map(index => hotels[index]);

  const totalPages = Math.ceil(cityFilteredHotels.length / cardsPerPage);
  const visibleHotels = cityFilteredHotels.slice(page * cardsPerPage, (page + 1) * cardsPerPage);

  const handlePrev = () => setPage((p) => Math.max(p - 1, 0));
  const handleNext = () => setPage((p) => Math.min(p + 1, totalPages - 1));

  return (
    <Box sx={{ bgcolor: "#fff", pb: 8 }}>
      <Container maxWidth="lg">
        <Typography sx={{ fontWeight: 300, color: "#161616", fontSize: "32px" }}>
          Hotels in your home country
        </Typography>
        <Typography sx={{ color: "#161616", mb: 4, fontSize: "16px" }}>
          Your next adventure may be closer than you think. Discover hotels just beyond your doorstep.
        </Typography>

        {/* City Tabs */}
        <Box 
          sx={{ 
            display: "flex", 
            gap: 1.5, 
            mb: 4, 
            flexWrap: { xs: "nowrap", sm: "wrap" },
            overflowX: { xs: "auto", sm: "visible" },
            pb: { xs: 1, sm: 0 },
            "&::-webkit-scrollbar": { display: "none" },
            msOverflowStyle: "none",
            scrollbarWidth: "none",
          }}
        >
          {cities.map((city) => (
            <Button
              key={city}
              onClick={() => { setSelectedCity(city); setPage(0); }}
              sx={{
                borderRadius: "8px",
                px: 3,
                textTransform: "none",
                fontSize: "14px",
                border: "1px solid",
                borderColor: selectedCity === city ? "#002B36" : "#D1D5DB",
                bgcolor: selectedCity === city ? "#002B36" : "transparent",
                color: selectedCity === city ? "#fff" : "#161616",
                "&:hover": {
                  bgcolor: selectedCity === city ? "#002B36" : "#F3F4F6",
                  borderColor: selectedCity === city ? "#002B36" : "#626971",
                },
              }}
            >
              {city}
            </Button>
          ))}
        </Box>

        {/* Hotel Grid */}
        <Grid container spacing={2.8}>
          {visibleHotels.map((hotel) => (
            <Grid item xs={12} sm={12} md={6} lg={4} key={hotel.id} width={{xs: "100%",sm: "100%", md: "48.5%", lg: "32%"}}>
              <HotelCard hotel={hotel} />
            </Grid>
          ))}
        </Grid>

        {/* Pagination Row */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mt: 4,
            px: 0,
          }}
        >
          {/* Prev Button */}
          <IconButton
            onClick={handlePrev}
            disabled={page === 0}
            sx={{
              color: page === 0 ? "#C9CDD1" : "#161616",
              fontSize: "14px",
              gap: 0.5,
              borderRadius: "4px",
              "&:hover": { bgcolor: "transparent" },
              "&.Mui-disabled": { color: "#C9CDD1" },
            }}
          >
            <ChevronLeftIcon sx={{ fontSize: "28px" }} />
          </IconButton>

          {/* Dots */}
          <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
            {[...Array(totalPages)].map((_, i) => (
              <Box
                key={i}
                onClick={() => setPage(i)}
                sx={{
                  width: i === page ? "20px" : "8px",
                  height: "8px",
                  borderRadius: "4px",
                  bgcolor: i === page ? "#002B36" : "#C9CDD1",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                }}
              />
            ))}
          </Box>

          {/* Next Button */}
          <IconButton
            onClick={handleNext}
            disabled={page === totalPages - 1}
            sx={{
              color: page === totalPages - 1 ? "#C9CDD1" : "#161616",
              fontSize: "14px",
              gap: 0.5,
              borderRadius: "4px",
              "&:hover": { bgcolor: "transparent" },
              "&.Mui-disabled": { color: "#C9CDD1" },
            }}
          >
            <ChevronRightIcon sx={{ fontSize: "28px" }} />
          </IconButton>
        </Box>
      </Container>
    </Box>
  );
}
