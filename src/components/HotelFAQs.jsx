"use client";

import React, { useState } from "react";
import {
  Box,
  Container,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const faqs = [
  {
    question: "How does Skyscanner rank hotels?",
    answer:
      "There's no secret recipe – just a stellar search operation. We scan all the top hotel provider sites, including Booking.com, Agoda and Trip.com to name a few. From there, we compare prices and show you the best options.\n\nYou can also select 'Best' to see our pick of the top hotels based on price, reviews and location.",
  },
  {
    question: "Do I book my hotel directly through Skyscanner?",
    answer:
      "No – as a travel search engine, we'll show you a range of hotel deals, but we don't take bookings or payments. Once you've chosen a hotel, we'll transfer you to the hotel provider's site to complete your booking.",
  },
  {
    question: "How do I know I'm getting a price that reflects the best value?",
    answer: "We always show the best-value price we can find from the hotel suppliers we offer, and give you the most up-to-date price overview.",
  },
  {
    question: "How can Skyscanner help me plan my trip?",
    answer: "We make planning a breeze with simple search filters, handy hotel reviews and accurate pricing. You can also keep everything in one place by comparing flight and car hire prices with us.",
  },
  {
    question:
      "Help! I have too many options. How can I decide which hotel to choose?",
    answer: "The choice overwhelm is real when searching for a hotel, but don’t panic! Get rid of the multiple tabs and windows, and think about what matters most. You may want to find hotels best for families, couples or business trips. Or filter by must-haves, such as spa facilities or parking.\n\nPop your preferences in your search, then watch only the super-relevant results roll in.",
  },
  {
    question: "Will booking a hotel at the last minute be cheaper?",
    answer: "Possibly. It’s all down to supply and demand. If you’re booking a hotel in a quiet destination at a quiet time of year, there’ll likely be a steady stream of rooms available, so a last-minute booking will be cheaper. If you’re booking somewhere in a busy destination at a busy time of year, booking in advance will likely save you money.",
  },
];

export default function HotelFAQs() {
  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <Box sx={{ bgcolor: "#fff", py: 8, }}>
      <Container maxWidth="lg">
        <Typography
          sx={{
            fontWeight: 700,
            fontSize: "2rem",
            color: "#161616",
            mb: 3,
      
          }}
        >
          FAQs
        </Typography>

        {faqs.map((faq, index) => (
          <Accordion
            key={index}
            expanded={expanded === index}
            onChange={handleChange(index)}
            disableGutters
            elevation={0}
            sx={{
              borderBottom: "1px solid #E0E0E0",
              "&:before": { display: "none" },
              bgcolor: "transparent",
            }}
          >
            <AccordionSummary
              expandIcon={
                <ExpandMoreIcon
                  sx={{
                    color: "#161616",
                    fontSize: "24px",
                    transform: expanded === index ? "rotate(180deg)" : "rotate(0deg)",
                    transition: "transform 0.3s ease",
                  }}
                />
              }
              sx={{
                px: 0,
                py: 1.5,
                "& .MuiAccordionSummary-content": { m: 0 },
              }}
            >
              <Typography
                sx={{
                  fontWeight: 600,
                  fontSize: "20px",
                  color: "#161616",
                }}
              >
                {faq.question}
              </Typography>
            </AccordionSummary>
            {faq.answer && (
              <AccordionDetails sx={{ px: 0, pb: 2 }}>
                {faq.answer.split("\n\n").map((para, i) => (
                  <Typography
                    key={i}
                    sx={{
                      fontSize: "16px",
                      color: "#161616",
                      lineHeight: 1.6,
                      mb: i < faq.answer.split("\n\n").length - 1 ? 2 : 0,
                    }}
                  >
                    {para}
                  </Typography>
                ))}
              </AccordionDetails>
            )}
          </Accordion>
        ))}
      </Container>
    </Box>
  );
}
