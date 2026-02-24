"use client";

import { createTheme, responsiveFontSizes } from "@mui/material/styles";
let theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1275, 
      xl: 1440, 
    },
  },
  typography: {
    fontFamily: "var(--font-skyscanner)",
    fontSize: 16, // Base font size
    htmlFontSize: 16, // Base HTML font size
    h1: {
      fontSize: "2.25rem", // 36px
      fontWeight: 900,
      lineHeight: 1.2,
    },
    h2: {
      fontSize: "1.75rem", // 28px
      fontWeight: 700,
      lineHeight: 1.3,
    },
    h3: {
      fontSize: "1.5rem", // 24px
      fontWeight: 600,
      lineHeight: 1.4,
    },
    h4: {
      fontSize: "1.25rem", // 20px
      fontWeight: 600,
      lineHeight: 1.4,
    },
    h5: {
      fontSize: "1rem", // 16px
      fontWeight: 600,
      lineHeight: 1.5,
    },
    h6: {
      fontSize: "0.875rem", // 14px
      fontWeight: 600,
      lineHeight: 1.5,
    },
    body1: {
      fontSize: "1rem", // 16px
      lineHeight: 1.5,
    },
    body2: {
      fontSize: "0.875rem", // 14px
      lineHeight: 1.5,
    },
    subtitle1: {
      fontSize: "1rem",
      fontWeight: 500,
      lineHeight: 1.75,
    },
    subtitle2: {
      fontSize: "0.875rem",
      fontWeight: 500,
      lineHeight: 1.57,
    },
    button: {
      fontSize: "0.875rem",
      fontWeight: 400,
      textTransform: "none",
    },
    caption: {
      fontSize: "0.75rem",
      lineHeight: 1.66,
    },
    overline: {
      fontSize: "0.75rem",
      fontWeight: 600,
      textTransform: "uppercase",
      lineHeight: 2.66,
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        body {
          font-family: var(--font-skyscanner);
        }
      `,
    },
  },
});

theme = responsiveFontSizes(theme);

export default theme;
