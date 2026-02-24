import localFont from "next/font/local";

export const skyscannerRelative = localFont({
  src: [
    {
      path: "../../public/fonts/SkyscannerRelative-Book-f9356ad6.woff2",
      weight: "400",
      style: "normal",
    },
    // Adding the TTF as well for better compatibility if needed, 
    // but Next.js usually handles woff2 best.
  ],
  variable: "--font-skyscanner",
}); 