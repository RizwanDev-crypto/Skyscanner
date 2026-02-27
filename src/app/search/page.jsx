"use client";

import React, { useState, useEffect, useRef } from "react";
import { Box, Typography, Container, Grid, Paper, Chip, Avatar, Skeleton, Button } from "@mui/material";
import SearchForm from "../../components/SearchForm";
import HotelCard from "../../components/HotelCard";
import TuneIcon from "@mui/icons-material/Tune";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import FilterListIcon from '@mui/icons-material/FilterList';
import FilterDialog from '@/components/FilterDialog';

import dynamic from "next/dynamic";
import { Popover, List, ListItem, ListItemText, ListSubheader, ListItemButton } from "@mui/material";
import MapIcon from "@mui/icons-material/Map";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const HotelMap = dynamic(() => import("../../components/HotelMap"), {
  ssr: false,
  loading: () => (
    <Box sx={{ height: "100%", width: "100%", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "#E5E7EB" }}>
      <Skeleton variant="rectangular" width="100%" height="100%" />
      <Typography sx={{ position: "absolute", fontWeight: 700, color: "#626971" }}>Loading Map...</Typography>
    </Box>
  )
});

export default function SearchPage() {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState("Recommended");
  const [openNearest, setOpenNearest] = useState(false);
  const [selectedNearest, setSelectedNearest] = useState("Nearest first");
  const [showFullMap, setShowFullMap] = useState(false);
  const [isFilterDialogOpen, setIsFilterDialogOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState({
    priceRange: [4751, 53654],
    stars: []
  });
  const [hoveredHotelId, setHoveredHotelId] = useState(null);
  const nearestRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (nearestRef.current && !nearestRef.current.contains(event.target)) {
        setOpenNearest(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    // Mock hotel data
    const mockHotels = [
      { id: 1, name: "Luxury Garden Resort", price: 22500, score: 4.8, stars: 5, location: "Downtown - 0.5 km", image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&auto=format&fit=crop", coords: [33.6844, 73.0479] },
      { id: 2, name: "City Center Inn", price: 12800, score: 3.5, stars: 3, location: "Near Station - 1.2 km", image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&auto=format&fit=crop", coords: [33.6944, 73.0579] },
      { id: 3, name: "Ocean View Hotel", price: 35000, score: 4.9, stars: 5, location: "Beachfront - 2 km", image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800&auto=format&fit=crop", coords: [33.6744, 73.0379] },
      { id: 4, name: "Summit Ridge Hotel", price: 18900, score: 4.2, stars: 4, location: "Uptown - 3 km", image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&auto=format&fit=crop", coords: [33.7044, 73.0679] },
      { id: 5, name: "The Grand Regal", price: 28000, score: 4.5, stars: 4, location: "Center - 0.8 km", image: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800&auto=format&fit=crop", coords: [33.6844, 73.0779] },
      { id: 6, name: "Serena Hotel", price: 45000, score: 4.7, stars: 5, location: "Blue Area - 1.5 km", image: "/Hotel cards/imgi_12_2375313091_392x116.jpg", coords: [33.7144, 73.0879] },
      { id: 7, name: "Marriott Hotel", price: 38500, score: 4.6, stars: 5, location: "Diplomatic Enclave - 2.5 km", image: "/Hotel cards/imgi_11_977462127_392x116.jpg", coords: [33.6644, 73.0279] },
      { id: 8, name: "Centaurus Suites", price: 55000, score: 4.8, stars: 5, location: "Jinnah Avenue - 0.1 km", image: "/Hotel cards/imgi_10_1555845736_392x116.jpg", coords: [33.7044, 73.0579] },
      { id: 9, name: "Ramada by Wyndham", price: 24000, score: 4.0, stars: 4, location: "Club Road - 3.5 km", image: "/Hotel cards/imgi_13_2509305285_392x116.jpg", coords: [33.7244, 73.0979] },
      { id: 10, name: "Avari Hotel", price: 29500, score: 4.3, stars: 4, location: "Saddar - 4 km", image: "/Hotel cards/imgi_8_2539323598_392x116.jpg", coords: [33.6544, 73.0179] },
    ];
    
    setTimeout(() => {
      setHotels(mockHotels);
      setLoading(false);
    }, 1000);
  }, []);

  const getSortedHotels = () => {
    let result = [...hotels];

    // Apply Active Filters First
    result = result.filter(hotel => {
      const priceMatch = hotel.price >= activeFilters.priceRange[0] && hotel.price <= activeFilters.priceRange[1];
      const starMatch = activeFilters.stars.length === 0 || activeFilters.stars.includes(hotel.stars);
      return priceMatch && starMatch;
    });

    if (sortBy === "Lowest price") {
      return result.sort((a, b) => a.price - b.price);
    }
    if (sortBy === "Top reviews") {
      return result.sort((a, b) => b.score - a.score);
    }
    if (sortBy === "Most stars") {
      return result.sort((a, b) => b.stars - a.stars);
    }
    return result; // Default: Recommended (Mocked as default order)
  };
  const sortedHotels = getSortedHotels();

  const handleNearestClick = () => {
    setOpenNearest(!openNearest);
  };

  const handleNearestSelect = (value) => {
    setSelectedNearest(value);
    setOpenNearest(false);
  };

  const handleHotelClickFromMap = (hotelId) => {
    const element = document.getElementById(`hotel-card-${hotelId}`);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "center" });
      // Optional: Add a brief highlight effect
      element.style.transition = "background-color 0.5s";
      element.style.backgroundColor = "#E6F2FF";
      setTimeout(() => {
        element.style.backgroundColor = "transparent";
      }, 1000);
    }
  };

  const nearestCategories = [
    { title: "Distance from city centre", items: ["City centre"] },
    { title: "Airport", items: ["Islamabad International", "Benazir Bhutto"] },
    { title: "Landmark", items: ["Faisal Mosque", "Daman-e-Koh", "Pakistan Monument", "Centaurus Mall", "Lake View Park", "Saidpur Village"] },
    { title: "Transport", items: ["Metro Station", "Daewoo Terminal"] },
    { title: "Shopping", items: ["Giga Mall", "Safa Gold Mall"] },
    { title: "Education", items: ["NUST University", "Quaid-i-Azam University"] },
  ];

  return (
    <Box sx={{ 
      height: { xs: "auto", lg: "100vh" }, 
      display: "flex", 
      flexDirection: "column", 
      overflow: { xs: "visible", lg: "hidden" }, 
      backgroundColor: "#F9FAFB" 
    }}>
      
      {/* Search Bar Area */}
      <Box sx={{ backgroundColor: "#05203c", py: 4, px: 3 }}>
        <Container maxWidth="lg" sx={{ px: { xs: 1, lg: 4 } }}>
          <SearchForm variant="compact" />
        </Container>
      </Box>

      {/* Filter Bar Area (Now single row) */}
      <Box sx={{ backgroundColor: "#fff", borderBottom: "1px solid #E5E7EB", py: 1.5, px: 3 }}>
        <Container maxWidth={false} sx={{ display: "flex", alignItems: "center", gap: 2, px: { xs: 1, lg: 4 } }}>
          <Box sx={{ display: "flex", gap: 1 }}>
            <Button 
               onClick={() => setIsFilterDialogOpen(true)}
               variant="contained" 
               startIcon={<FilterListIcon />} 
               sx={{ 
                 borderRadius: "20px", 
                 textTransform: "none", 
                 bgcolor: "#0062e3", 
                 color: "white",
                 "&:hover": { bgcolor: "#0052c2" }
               }}
            >
              Filters
            </Button>
            {/* Other pill buttons */}
          </Box>
          
          <Typography sx={{ color: "#626971", fontSize: "14px", ml: 1 }}>
            All taxes and fees included | {sortedHotels.length} results
          </Typography>
        </Container>
      </Box>

      {/* Main Content Area */}
      <Box sx={{ 
        flex: 1, 
        display: "flex", 
        flexDirection: { xs: "column", lg: "row" },
        overflow: { xs: "visible", lg: "hidden" }, 
        position: "relative" 
      }}>
        {/* Results List */}
        <Box 
          sx={{ 
            width: { xs: "100%", lg: "55%" }, 
            display: { xs: showFullMap ? "none" : "block", lg: "block" },
            overflowY: { xs: "visible", lg: "auto" }, 
            p: { xs: 0, lg: 4 }, // Removed mobile padding for full-width effect
            backgroundColor: "#F9FAFB" 
          }}
        >
          {/* Sort Options Moved Here */}
          <Box sx={{  
            display: "flex", 
            gap: 3, 
            mb: { xs: 2, lg: 3 }, 
            borderBottom: "1px solid #E5E7EB", 
            width: "100%",
            overflowX: openNearest ? "visible" : "auto", // Allow dropdown to be seen when open
            flexWrap: "nowrap",
            backgroundColor: "#fff", 
            "&::-webkit-scrollbar": { display: "none" },
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            px: 2, 
            position: "relative",
            zIndex: openNearest ? 3100 : 1 // High z-index when dropdown is open
          }}>
            {["Recommended", "Top reviews", "Lowest price", "Most stars"].map((text) => (
              <Box 
                key={text} 
                onClick={() => setSortBy(text)}
                sx={{ 
                  display: "flex", 
                  alignItems: "center", 
                  cursor: "pointer",
                  pb: 1,
                  borderBottom: sortBy === text ? "2px solid #0062E3" : "none",
                  transition: "all 0.2s ease",
                  flexShrink: 0,
                  "&:hover": { color: "#0062E3" }
                }}
              >
                <Typography sx={{ 
                  fontSize: "16px", 
                  fontWeight: 400,
                  color: sortBy === text ? "#0062E3" : "#161616"
                }}>
                  {text}
                </Typography>
              </Box>
            ))}
            
            <Box 
              ref={nearestRef}
              sx={{ 
                display: "flex", 
                alignItems: "center", 
                cursor: "pointer", 
                pb: 1, 
                color: openNearest ? "#0062E3" : "#161616", 
                borderBottom: openNearest ? "2px solid #0062E3" : "none",
                transition: "all 0.2s ease",
                flexShrink: 0,
                "&:hover": { color: "#0062E3" },
                position: "relative" // Added to anchor the custom dropdown
              }}
            >
                <Box 
                  onClick={handleNearestClick}
                  sx={{ display: "flex", alignItems: "center" }}
                >
                  <Typography sx={{ fontSize: "16px", fontWeight: 400 }}>{selectedNearest}</Typography>
                  <KeyboardArrowDownIcon sx={{ fontSize: "18px", ml: 0.5, transform: openNearest ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
                </Box>

                {/* Custom Styled Dropdown matching DestDropdown */}
                {openNearest && (
                  <Box
                    onClick={(e) => e.stopPropagation()}
                    sx={{
                      position: "absolute",
                      top: "50px", 
                      left: { xs: "-100px", sm: "-20px" }, // Better positioning on mobile
                      width: "300px",
                      zIndex: 3200, 
                      backgroundColor: "#fff",
                      borderRadius: "8px",
                      boxShadow: "0px 4px 20px rgba(0,0,0,0.15)",
                      overflow: "visible", 
                      "&::before": {
                        content: '""',
                        position: "absolute",
                        top: "-10px", 
                        left: "25%", 
                        transform: "translateX(-50%)",
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
                        maxHeight: "400px", 
                        overflowY: "auto",
                        "&::-webkit-scrollbar": {
                          width: "6px",
                        },
                        "&::-webkit-scrollbar-thumb": {
                          backgroundColor: "#E5E7EB",
                          borderRadius: "10px",
                        },
                        scrollbarWidth: "thin",
                      }}
                    >
                      <List sx={{ pt: 0, pb: 0 }}>
                        {nearestCategories.map((category, idx) => (
                          <React.Fragment key={idx}>
                            <ListSubheader 
                              sx={{ 
                                bgcolor: '#F3F4F6', 
                                color: '#111827', 
                                fontWeight: 700, 
                                fontSize: '13px',
                                lineHeight: '36px',
                                py: 0,
                            
                              }}
                            >
                              {category.title}
                            </ListSubheader>
                            {category.items.map((item) => (
                              <ListItem 
                                key={item} 
                                disablePadding
                              >
                                <ListItemButton 
                                  onClick={() => handleNearestSelect(item)}
                                  sx={{ 
                                    py: 1,
                                    '&:hover': { bgcolor: '#F9FAFB' } 
                                  }}
                                >
                                  <ListItemText 
                                    primary={item} 
                                    primaryTypographyProps={{ 
                                      fontSize: '14px', 
                                      color: '#374151',
                                      fontWeight: 500
                                    }} 
                                  />
                                </ListItemButton>
                              </ListItem>
                            ))}
                          </React.Fragment>
                        ))}
                      </List>
                    </Box>
                  </Box>
                )}
            </Box>
          </Box>

          {/* Map Preview for Mobile/Tablet */}
          <Box sx={{ display: { xs: "block", lg: "none" }, mb: 3, px: 2 }}>
             <Paper 
                elevation={0} 
                onClick={() => setShowFullMap(true)}
                sx={{ 
                  height: "120px", 
                  width: "100%", 
                  borderRadius: "12px", 
                  overflow: "hidden", 
                  position: "relative",
                  cursor: "pointer",
                  border: "1px solid #E5E7EB",
                  "&:hover .map-overlay": { bgcolor: "rgba(0,0,0,0.05)" }
                }}
             >
                <Box sx={{ height: "100%", pointerEvents: "none", filter: "blur(0.5px)" }}>
                   <HotelMap hotels={sortedHotels.slice(0, 3)} zoom={11} interactive={false} />
                </Box>
                <Box 
                  className="map-overlay"
                  sx={{ 
                    position: "absolute", 
                    top: 0, 
                    left: 0, 
                    right: 0, 
                    bottom: 0, 
                    bgcolor: "transparent",
                    transition: "background-color 0.2s",
                    zIndex: 1
                  }} 
                />
                <Box sx={{ 
                   position: "absolute", 
                   bottom: 12, 
                   left: "50%", 
                   transform: "translateX(-50%)",
                   zIndex: 2
                }}>
                   <Button
                      variant="contained"
                      startIcon={<MapIcon />}
                      sx={{ 
                         bgcolor: "white", 
                         color: "#111827", 
                         fontWeight: 700,
                         borderRadius: "20px",
                         textTransform: "none",
                         px: 3,
                         boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                         "&:hover": { bgcolor: "#f9fafb" }
                      }}
                   >
                      Show on map
                   </Button>
                </Box>
             </Paper>
          </Box>

          <Box sx={{ mb: 3, px: 2 }}>
             <Paper elevation={0} sx={{ p: 2, backgroundColor: "#fff", borderRadius: "8px", border: "1px solid #E5E7EB", mb: 3 }}>
                <Typography variant="body2" sx={{ color: "#626971" }}>
                  We find prices from all across the web – what providers pay us affects how we sort results. <Typography component="span" sx={{ color: "#0062E3", cursor: "pointer", fontSize: "inherit" }}>Learn how Skyscanner works</Typography>
                </Typography>
             </Paper>

             <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                <Typography variant="h6" sx={{ fontWeight: 700 }}>
                   Prices are <Typography component="span" sx={{ color: "#D32F2F", fontWeight: 700, fontSize: "inherit" }}>higher</Typography> than usual
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center", color: "#626971", cursor: "pointer" }}>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>Show price data</Typography>
                  <KeyboardArrowDownIcon sx={{ fontSize: "18px" }} />
                </Box>
             </Box>
          </Box>
          
          <Box sx={{ px: 2, pb: 2 }}>
            {loading ? (
              [...Array(3)].map((_, i) => (
                <Skeleton key={i} variant="rectangular" height={220} sx={{ mb: 2, borderRadius: "12px" }} />
              ))
            ) : (
              sortedHotels.map((hotel) => (
                <Box 
                  key={hotel.id} 
                  id={`hotel-card-${hotel.id}`} 
                  sx={{ borderRadius: "12px", mb: 2 }}
                  onMouseEnter={() => setHoveredHotelId(hotel.id)}
                  onMouseLeave={() => setHoveredHotelId(null)}
                >
                  <HotelCard 
                    hotel={{
                      ...hotel,
                      price: `Rs ${hotel.price.toLocaleString()}`
                    }} 
                    variant="list" 
                  />
                </Box>
              ))
            )}
          </Box>
        </Box>

        {/* Real Map View */}
        <Box 
          sx={{ 
            flex: 1, 
            height: { xs: showFullMap ? "100vh" : "0px", lg: "auto" },
            backgroundColor: "#E5E7EB", 
            position: { xs: showFullMap ? "fixed" : "relative", lg: "relative" },
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: { xs: 2000, lg: 1 },
            display: { 
              xs: showFullMap ? "block" : "none", 
              lg: "block" 
            } 
          }}
        >
          {showFullMap && (
             <Button
                onClick={() => setShowFullMap(false)}
                startIcon={<ArrowBackIcon />}
                sx={{ 
                   position: "absolute", 
                   top: 16, 
                   left: 16, 
                   zIndex: 1000,
                   bgcolor: "white",
                   color: "#111827",
                   fontWeight: 700,
                   borderRadius: "20px",
                   px: 2,
                   py: 1,
                   boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
                   display: { lg: "none" },
                   "&:hover": { bgcolor: "#f3f4f6" }
                }}
             >
                Back to results
             </Button>
          )}
          <HotelMap 
            hotels={sortedHotels} 
            onHotelClick={handleHotelClickFromMap} 
            hoveredHotelId={hoveredHotelId}
          />
        </Box>

        <FilterDialog 
          open={isFilterDialogOpen} 
          onClose={() => setIsFilterDialogOpen(false)} 
          hotels={hotels}
          initialFilters={activeFilters}
          onApply={(newFilters) => {
            setActiveFilters(newFilters);
            setIsFilterDialogOpen(false);
          }}
        />
      </Box>
    </Box>
  );
}


