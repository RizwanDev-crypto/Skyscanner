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
  { id: 1, name: "Galaxy Pro Hotel & Guest H...", distance: "3.61 km from city centre", rating: 3.2, ratingText: "Satisfactory", reviews: 44, price: "Rs2,260", image: "/Hotel cards/imgi_8_2546153102_392x116.jpg", stars: 5 },
  { id: 2, name: "Oriole Luxury Hotel", distance: "3.94 km from city centre", rating: 3.2, ratingText: "Satisfactory", reviews: 44, price: "Rs2,260", image: "/Hotel cards/imgi_10_1555845736_392x116.jpg", stars: 5 },
  { id: 3, name: "Hotel 11", distance: "6.43 km from city centre", rating: 3.6, ratingText: "Good", reviews: 55, price: "Rs3,767", image: "/Hotel cards/imgi_13_2509305285_392x116.jpg", stars: 4 },
  { id: 4, name: "Pearl Continental Hotel", distance: "2.10 km from city centre", rating: 4.1, ratingText: "Very Good", reviews: 120, price: "Rs5,500", image: "/Hotel cards/imgi_11_977462127_392x116.jpg", stars: 5 },
  { id: 5, name: "Serena Hotel Islamabad", distance: "1.80 km from city centre", rating: 4.5, ratingText: "Excellent", reviews: 210, price: "Rs8,900", image: "/Hotel cards/imgi_12_2375313091_392x116.jpg", stars: 5 },
  { id: 6, name: "Margalla View Hotel", distance: "5.20 km from city centre", rating: 3.8, ratingText: "Good", reviews: 67, price: "Rs3,100", image: "/Hotel cards/imgi_8_2539323598_392x116.jpg", stars: 3 },
  { id: 7, name: "Envoy Continental Hotel", distance: "4.50 km from city centre", rating: 3.5, ratingText: "Good", reviews: 89, price: "Rs4,200", image: "/Hotel cards/imgi_9_2236111762_392x116.jpg", stars: 4 },
  { id: 8, name: "Ramada by Wyndham", distance: "2.50 km from city centre", rating: 4.2, ratingText: "Very Good", reviews: 156, price: "Rs6,400", image: "/Hotel cards/imgi_10_1555845736_392x116.jpg", stars: 5 },
  { id: 9, name: "Marriott Hotel", distance: "1.20 km from city centre", rating: 4.6, ratingText: "Excellent", reviews: 302, price: "Rs9,200", image: "/Hotel cards/imgi_11_977462127_392x116.jpg", stars: 5 },
];

const cityHotelMapping = {
  Islamabad: [0, 1, 2, 3, 4, 5, 6, 7, 8], // All
  Karachi: [5, 6, 7],                      // Hotels 6, 7, 8
  Gilgit: [2, 3, 4],                       // Hotels 3, 4, 5
  Lahore: [1, 2, 3],                       // Hotels 2, 3, 4
  Murree: [4, 5, 6],                       // Different set
};

const HotelCard = ({ hotel }) => (
  <Card
    sx={{
      borderRadius: "12px",
       border: "1px solid #c2c3c5ff",
      height: "100%",
      transition: "box-shadow 0.25s ease",
      "&:hover": {
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.30)",
      },
    }}
  >
    <CardMedia
      component="img"
      height="160"
      image={hotel.image}
      alt={hotel.name}
    />
    <CardContent sx={{ p: 2 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          mb: 0.5,
        }}
      >
        <Typography
          variant="subtitle1"
          sx={{ fontWeight: 600, fontSize: "20px", color: "#161616", lineHeight: 1.2 }}
        >
          {hotel.name}
        </Typography>
        <Box sx={{ display: "flex", mt: "4px" }}>
          {[...Array(5)].map((_, i) =>
            i < hotel.stars ? (
              <GradeIcon key={i} sx={{ fontSize: "18px", color: "#f55d42" }} />
            ) : (
              <Box
                key={i}
                component="img"
                src="/rating icons/download (2).svg"
                alt="star"
                sx={{
                  width: "16px",
                  height: "16px",
                  filter: "invert(60%) sepia(0%) saturate(0%) brightness(90%)",
                }}
              />
            )
          )}
        </Box>
      </Box>

      <Typography sx={{ color: "#161616", mb: 1, fontSize: "14px" }}>
        {hotel.distance}
      </Typography>

      <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
        <Box sx={{ display: "flex", alignItems: "baseline", gap: 0.2 }}>
          <Typography component="span" sx={{ fontWeight: 700, fontSize: "16px", color: "#161616" }}>
            {hotel.rating}
          </Typography>
          <Typography component="span" sx={{ fontSize: "12px", color: "#161616" }}>
            /5
          </Typography>
        </Box>
        <Typography sx={{ fontWeight: 700, fontSize: "16px", color: "#161616" }}>
          {hotel.ratingText}
        </Typography>
        <Typography sx={{ fontSize: "12px", color: "#626971", mt: 0.5 }}>
          {hotel.reviews} reviews
        </Typography>
      </Box>

      <Box
        sx={{
          borderTop: "1px solid #c7c5c5ff",
          pt: 2,
          textAlign: "right",
          mx: -2,
          px: 2,
        }}
      >
        <Typography sx={{ fontWeight: 700, color: "#161616", lineHeight: 1, fontSize: "20px" }}>
          {hotel.price}
        </Typography>
        <Typography variant="caption" sx={{ color: "#626971" }}>
          Per night
        </Typography>
      </Box>
    </CardContent>
  </Card>
);

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
            <Grid item xs={12} sm={6} md={6} lg={4} key={hotel.id} width={{xs: "100%",sm: "100%", md: "48.5%", lg: "32%"}}>
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
