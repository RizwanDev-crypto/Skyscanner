import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  IconButton,
  TextField,
  Box,
  InputAdornment,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";
import CheckIcon from "@mui/icons-material/Check";

export default function CountryModal({
  open,
  onClose,
  searchQuery,
  setSearchQuery,
  filteredCountries,
  handleCountryClick,
  selectedCountry,
  getCountryCode,
}) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: "12px",
          p: 1,
        },
      }}
    >
      <DialogTitle
        component="div"
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          pb: 1,
        }}
      >
        <Typography component="span" variant="h6" sx={{ fontWeight: "bold" }}>
          Country/Region
        </Typography>
        <IconButton onClick={onClose} size="small">
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <TextField
          placeholder="Search"
          fullWidth
          variant="outlined"
          size="small"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          sx={{
            mb: 3,
            "& .MuiOutlinedInput-root": {
              borderRadius: "8px",
              "& fieldset": { borderColor: "#ccc" },
              "&.Mui-focused fieldset": { borderColor: "#00a698" },
            },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: "#777" }} />
              </InputAdornment>
            ),
          }}
        />

        <Box
          sx={{
            maxHeight: "400px",
            overflowY: "auto",
            pr: 1,
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 1,
          }}
        >
          {filteredCountries.map((country) => (
            <Box
              key={country.name}
              onClick={() => handleCountryClick(country)}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1.5,
                p: 0.8,
                cursor: "pointer",
                borderRadius: "4px",
                transition: "all 0.2s",
                "&:hover": { backgroundColor: "#f5f5f5" },
              }}
            >
              <Box
                sx={{
                  width: 24,
                  height: 18,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  overflow: "hidden",
                }}
              >
                {country.icon && (
                  <img
                    src={`https://flagcdn.com/w40/${getCountryCode(
                      country.icon
                    )}.png`}
                    width="20"
                    alt={country.name}
                    style={{ borderRadius: "2px", objectFit: "cover" }}
                    onError={(e) => {
                      e.target.style.display = "none";
                    }}
                  />
                )}
              </Box>
              <Typography
                sx={{
                  fontSize: "14px",
                  flexGrow: 1,
                  color: selectedCountry?.name === country.name ? "#111" : "#444",
                  fontWeight: selectedCountry?.name === country.name ? "500" : "400",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {country.name}
              </Typography>
              {selectedCountry?.name === country.name && (
                <CheckIcon sx={{ fontSize: "16px", color: "#00a698" }} />
              )}
            </Box>
          ))}
        </Box>
      </DialogContent>
    </Dialog>
  );
}
