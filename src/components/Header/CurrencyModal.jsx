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

export default function CurrencyModal({
  open,
  onClose,
  currencySearchQuery,
  setCurrencySearchQuery,
  filteredCurrencies,
  handleCurrencyClick,
  selectedCurrency,
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
          Currency
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
          value={currencySearchQuery}
          onChange={(e) => setCurrencySearchQuery(e.target.value)}
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
          {filteredCurrencies.map((curr) => (
            <Box
              key={curr.code}
              onClick={() => handleCurrencyClick(curr)}
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
              <Typography
                sx={{
                  fontSize: "14px",
                  fontWeight: "bold",
                  width: "35px",
                  color: selectedCurrency?.code === curr.code ? "#00a698" : "#666",
                }}
              >
                {curr.code}
              </Typography>
              <Typography
                sx={{
                  fontSize: "14px",
                  flexGrow: 1,
                  color: selectedCurrency?.code === curr.code ? "#111" : "#444",
                  fontWeight: selectedCurrency?.code === curr.code ? "600" : "400",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {curr.name}
              </Typography>
              {selectedCurrency?.code === curr.code && (
                <CheckIcon sx={{ fontSize: "16px", color: "#00a698" }} />
              )}
            </Box>
          ))}
        </Box>
      </DialogContent>
    </Dialog>
  );
}
