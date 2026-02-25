import * as React from "react";
import Box from "@mui/material/Box";
import Hero from "@/components/Hero";
import HotelFeatures from "@/components/HotelFeatures";
import HotelCityBreaks from "@/components/HotelCityBreaks";
import HotelBenefits from "@/components/HotelBenefits";
import HotelFAQs from "@/components/HotelFAQs";
import TravelOptions from "@/components/TravelOptions";
import Footer from "@/components/Footer";
import HotelsInCountry from "@/components/HotelsInCountry";

export default function Home() {
  return (
    <Box>
      <Hero />
      <HotelFeatures />
      <HotelsInCountry />
      <HotelCityBreaks />
      <HotelBenefits />
       <HotelFAQs />
      <TravelOptions />
      <Footer />
    </Box>
  );
}
