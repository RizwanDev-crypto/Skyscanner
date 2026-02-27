import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  Typography,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Slider,
  TextField,
  FormControlLabel,
  Checkbox,
  Radio,
  RadioGroup,
  Button,
  Grid,
  Divider,
  ListItemButton
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ApartmentIcon from "@mui/icons-material/Apartment";
import PoolIcon from "@mui/icons-material/Pool";
import LocalOfferOutlinedIcon from "@mui/icons-material/LocalOfferOutlined";
import TuneIcon from "@mui/icons-material/Tune";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";

const categories = [
  { id: "price", label: "Price Range", icon: <MonetizationOnIcon /> },
  { id: "stars", label: "Star Rating", icon: <StarOutlineIcon /> },
  { id: "review", label: "Review Score", icon: <ThumbUpOutlinedIcon /> },
  { id: "rated", label: "Highly Rated by Guests", icon: <ThumbUpOutlinedIcon /> },
  { id: "type", label: "Accommodation Type", icon: <ApartmentIcon /> },
  { id: "facilities", label: "Hotel Facilities", icon: <PoolIcon /> },
  { id: "rate", label: "Rate type", icon: <LocalOfferOutlinedIcon /> },
  { id: "brands", label: "Brands", icon: <LocalOfferOutlinedIcon /> },
  { id: "chains", label: "Chains", icon: <AccountBalanceIcon /> },
];

const FilterDialog = ({ open, onClose, onApply, hotels = [], initialFilters = { priceRange: [4751, 53654], stars: [] } }) => {
  const [activeTab, setActiveTab] = useState("price");
  const [priceRange, setPriceRange] = useState(initialFilters.priceRange);
  const [selectedStars, setSelectedStars] = useState(initialFilters.stars);
  const [priceMode, setPriceMode] = useState("night");

  const handlePriceChange = (event, newValue) => {
    setPriceRange(newValue);
  };

  const handleStarChange = (star) => {
    setSelectedStars(prev => 
      prev.includes(star) ? prev.filter(s => s !== star) : [...prev, star]
    );
  };

  const getFilteredCount = () => {
    return hotels.filter(hotel => {
      const priceMatch = hotel.price >= priceRange[0] && hotel.price <= priceRange[1];
      const starMatch = selectedStars.length === 0 || selectedStars.includes(hotel.stars);
      return priceMatch && starMatch;
    }).length;
  };

  const filteredCount = getFilteredCount();
  const SKYSCANNER_BLUE = "#0062e3";

  return (
    <Dialog 
      open={open} 
      onClose={onClose} 
      fullWidth 
      maxWidth="md"
      PaperProps={{
        sx: { borderRadius: "12px", height: "80vh", maxHeight: "700px" }
      }}
    >
      <DialogTitle sx={{ p: 2, display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #E5E7EB" }}>
        <Typography variant="h6" fontWeight={700}>Filters</Typography>
        <IconButton onClick={onClose} size="small">
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ p: 0, display: "flex", flexDirection: { xs: "column", md: "row" }, overflow: "hidden" }}>
        {/* Sidebar (Categories) */}
        <Box sx={{ 
          width: { xs: "100%", md: "280px" }, 
          borderRight: { xs: "none", md: "1px solid #E5E7EB" },
          borderBottom: { xs: "1px solid #E5E7EB", md: "none" },
          bgcolor: "#fff",
          overflowX: { xs: "auto", md: "hidden" },
          flexShrink: 0
        }}>
          <List sx={{ 
            py: 0, 
            display: { xs: "flex", md: "block" },
            flexDirection: { xs: "row", md: "column" },
            "&::-webkit-scrollbar": { display: "none" },
            msOverflowStyle: "none",
            scrollbarWidth: "none"
          }}>
            {categories.map((cat) => (
              <ListItem 
                key={cat.id}
                disablePadding
              >
                <ListItemButton 
                  onClick={() => setActiveTab(cat.id)}
                  selected={activeTab === cat.id}
                  sx={{
                    py: 1.5,
                    px: { xs: 2.5, md: 2 },
                    minWidth: { xs: "max-content", md: "auto" },
                    borderLeft: { 
                      xs: "none", 
                      md: activeTab === cat.id ? `4px solid ${SKYSCANNER_BLUE}` : "4px solid transparent" 
                    },
                    borderBottom: { 
                      xs: activeTab === cat.id ? `3px solid ${SKYSCANNER_BLUE}` : "3px solid transparent", 
                      md: "none" 
                    },
                    bgcolor: activeTab === cat.id ? "rgba(0, 98, 227, 0.04)" : "transparent",
                    "&.Mui-selected": { bgcolor: "rgba(0, 98, 227, 0.08)" },
                    "&.Mui-selected:hover": { bgcolor: "rgba(0, 98, 227, 0.12)" },
                  }}
                >
                  <ListItemIcon sx={{ 
                    minWidth: { xs: 30, md: 40 }, 
                    color: activeTab === cat.id ? "#111827" : "#626971" 
                  }}>
                    {cat.icon}
                  </ListItemIcon>
                  <ListItemText 
                    primary={cat.label} 
                    primaryTypographyProps={{ 
                      fontSize: "14px", 
                      fontWeight: activeTab === cat.id ? 700 : 500,
                      color: activeTab === cat.id ? "#111827" : "#374151",
                      noWrap: true
                    }} 
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>

        {/* Content Area */}
        <Box sx={{ flex: 1, p: 3, overflowY: "auto" }}>
          {activeTab === "price" && (
            <Box>
              <Typography variant="h6" fontWeight={700} gutterBottom>Price Range (PKR)</Typography>
              
              {/* Histogram Placeholder */}
              <Box sx={{ height: 60, display: "flex", alignItems: "flex-end", gap: "2px", mb: 2, px: 2 }}>
                  {[4, 6, 8, 12, 18, 25, 30, 40, 50, 45, 35, 20, 15, 10, 8, 6, 4].map((h, i) => (
                    <Box key={i} sx={{ flex: 1, bgcolor: "#E5E7EB", height: `${h}%`, borderRadius: "2px 2px 0 0" }} />
                  ))}
              </Box>

              <Slider
                value={priceRange}
                onChange={handlePriceChange}
                min={4751}
                max={53654}
                sx={{
                  color: SKYSCANNER_BLUE,
                  height: 4,
                  "& .MuiSlider-thumb": {
                    width: 24,
                    height: 24,
                    backgroundColor: "#fff",
                    border: `2px solid ${SKYSCANNER_BLUE}`,
                    "&:hover, &.Mui-focusVisible": {
                      boxShadow: `0px 0px 0px 8px rgba(0, 98, 227, 0.16)`,
                    },
                    "&.Mui-active": {
                      boxShadow: `0px 0px 0px 14px rgba(0, 98, 227, 0.16)`,
                    },
                  },
                  "& .MuiSlider-rail": {
                    opacity: 0.32,
                    backgroundColor: SKYSCANNER_BLUE,
                  },
                }}
              />

              <Grid container spacing={2} sx={{ mt: 2 }}>
                <Grid item xs={6}>
                  <TextField 
                    label="Min" 
                    fullWidth 
                    value={priceRange[0]} 
                    variant="outlined" 
                    size="small"
                    InputProps={{ readOnly: true }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField 
                    label="Max" 
                    fullWidth 
                    value={priceRange[1]} 
                    variant="outlined" 
                    size="small"
                    InputProps={{ readOnly: true }}
                  />
                </Grid>
              </Grid>

              {filteredCount === 0 && (
                <Box sx={{ mt: 2, p: 1.5, bgcolor: "#FEF2F2", border: "1px solid #FCA5A5", borderRadius: "8px" }}>
                  <Typography variant="body2" color="#B91C1C" fontWeight={500}>
                    No hotels found in this price range. Try expanding your search.
                  </Typography>
                </Box>
              )}

              <Box sx={{ mt: 4 }}>
                <Typography variant="body2" fontWeight={700} gutterBottom>Show price as:</Typography>
                <RadioGroup row value={priceMode} onChange={(e) => setPriceMode(e.target.value)}>
                  <FormControlLabel value="total" control={<Radio sx={{ color: SKYSCANNER_BLUE, '&.Mui-checked': { color: SKYSCANNER_BLUE } }} />} label={<Typography variant="body2">Total Stay</Typography>} />
                  <FormControlLabel value="night" control={<Radio sx={{ color: SKYSCANNER_BLUE, '&.Mui-checked': { color: SKYSCANNER_BLUE } }} />} label={<Typography variant="body2">Price Per Night</Typography>} />
                </RadioGroup>
              </Box>

              <Divider sx={{ my: 4 }} />

              <Box>
                 <Typography variant="h6" fontWeight={700} gutterBottom>Popular Filters</Typography>
                 <Grid container spacing={2}>
                    <Grid item xs={6}>
                       <FormControlLabel 
                          control={<Checkbox sx={{ color: SKYSCANNER_BLUE, '&.Mui-checked': { color: SKYSCANNER_BLUE } }} />} 
                          label={<Box sx={{ display: "flex", justifyContent: "space-between", width: "100%", gap: 4 }}><Typography variant="body2">Today's Deals</Typography> <Typography variant="caption" color="text.secondary">17</Typography></Box>} 
                       />
                    </Grid>
                    <Grid item xs={6}>
                       <FormControlLabel 
                          control={<Checkbox sx={{ color: SKYSCANNER_BLUE, '&.Mui-checked': { color: SKYSCANNER_BLUE } }} />} 
                          label={<Typography variant="body2">Breakfast Included</Typography>} 
                       />
                    </Grid>
                 </Grid>
              </Box>

              <Box sx={{ mt: 4 }}>
                 <Typography variant="h6" fontWeight={700} gutterBottom>Districts/Areas</Typography>
                 <TextField placeholder="Search districts" fullWidth size="small" variant="outlined" sx={{ mb: 2 }} />
                 {/* Area checkboxes could go here */}
              </Box>
            </Box>
          )}

          {activeTab === "stars" && (
            <Box>
              <Typography variant="h6" fontWeight={700} gutterBottom>Star Rating</Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Refine your results by hotel star ratings.
              </Typography>

              {filteredCount === 0 && (
                <Box sx={{ mb: 3, p: 1.5, bgcolor: "#FEF2F2", border: "1px solid #FCA5A5", borderRadius: "8px" }}>
                  <Typography variant="body2" color="#B91C1C" fontWeight={500}>
                    Your current combination of filters shows 0 matches.
                  </Typography>
                </Box>
              )}

              <List sx={{ py: 0 }}>
                {[5, 4, 3, 2, 1].map((star) => {
                  const hotelCountForStar = hotels.filter(h => h.stars === star).length;
                  return (
                    <ListItem 
                      key={star}
                      dense 
                      disableGutters 
                      sx={{ py: 0.5 }}
                    >
                      <FormControlLabel
                        sx={{ width: "100%", ml: 0 }}
                        control={
                          <Checkbox 
                            checked={selectedStars.includes(star)}
                            onChange={() => handleStarChange(star)}
                            sx={{ color: SKYSCANNER_BLUE, '&.Mui-checked': { color: SKYSCANNER_BLUE } }} 
                          />
                        }
                        label={
                          <Box sx={{ display: "flex", justifyContent: "space-between", width: "100%", alignItems: "center" }}>
                            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                              <Typography variant="body2">{star} Stars</Typography>
                              <Box sx={{ display: "flex" }}>
                                {[...Array(star)].map((_, i) => (
                                  <StarOutlineIcon key={i} sx={{ fontSize: "16px", color: "#FFB000" }} />
                                ))}
                              </Box>
                            </Box>
                            <Typography variant="caption" color="text.secondary">
                              {hotelCountForStar}
                            </Typography>
                          </Box>
                        }
                      />
                    </ListItem>
                  );
                })}
              </List>
            </Box>
          )}

          {activeTab !== "price" && activeTab !== "stars" && (
            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", opacity: 0.5 }}>
               <TuneIcon sx={{ fontSize: 48, mb: 2 }} />
               <Typography>Options for {categories.find(c => c.id === activeTab).label} will appear here.</Typography>
            </Box>
          )}
        </Box>
      </DialogContent>

      <DialogActions sx={{ p: 2, borderTop: "1px solid #E5E7EB", justifyContent: "space-between" }}>
        <Button 
          variant="outlined" 
          onClick={() => setPriceRange([4751, 53654])}
          sx={{ 
            borderRadius: "20px", 
            textTransform: "none", 
            px: 3,
            color: "#111827",
            borderColor: "#D1D5DB",
            "&:hover": { borderColor: "#111827", bgcolor: "transparent" }
          }}
        >
          Reset All Filters
        </Button>
        <Button 
          variant="contained" 
          onClick={() => onApply({ priceRange, stars: selectedStars })}
          disabled={filteredCount === 0}
          sx={{ 
            borderRadius: "20px", 
            textTransform: "none", 
            px: 4,
            bgcolor: SKYSCANNER_BLUE,
            fontWeight: 700,
            "&:hover": { bgcolor: "#0052c2" }
          }}
        >
          {filteredCount === 0 ? "No Results" : `Show ${filteredCount} Results`}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default FilterDialog;
