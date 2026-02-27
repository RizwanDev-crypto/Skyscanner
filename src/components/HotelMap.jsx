"use client";

import React, { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { IconButton, Box } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

// Custom Icon for Hotel Prices
const createPriceIcon = (price, isHovered = false) => {
  return L.divIcon({
    className: "custom-price-marker",
    html: `<div style="
      background-color: ${isHovered ? "#0062E3" : "white"}; 
      color: ${isHovered ? "white" : "#111827"};
      padding: 4px 8px; 
      border-radius: 4px; 
      font-weight: 700; 
      font-size: 12px; 
      box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
      border: 1px solid ${isHovered ? "#0062E3" : "#E5E7EB"};
      white-space: nowrap;
      cursor: pointer;
      transition: all 0.2s ease;
      display: flex;
      align-items: center;
      justify-content: center;
    ">Rs ${price}</div>`,
    iconSize: [60, 30],
    iconAnchor: [30, 15],
  });
};

// Component to handle map controls (centering and zoom)
function MapControls({ center }) {
  const map = useMap();
  const controlsRef = React.useRef(null);
  
  useEffect(() => {
    if (center) {
      map.setView(center, map.getZoom());
    }
  }, [center, map]);

  useEffect(() => {
    if (controlsRef.current) {
      L.DomEvent.disableClickPropagation(controlsRef.current);
      L.DomEvent.disableScrollPropagation(controlsRef.current);
    }
  }, []);

  return (
    <Box 
      ref={controlsRef}
      sx={{ 
        position: "absolute",
        bottom: 20,
        right: 20,
        display: "flex", 
        flexDirection: "column", 
        gap: 1, 
        zIndex: 1000,
      }}
    >
      <IconButton 
        onClick={() => map.zoomIn()}
        sx={{ 
          bgcolor: "white", 
          boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
          "&:hover": { bgcolor: "#f5f5f5" },
          borderRadius: "8px",
          p: 1
        }}
      >
        <AddIcon sx={{ color: "#0062E3" }} />
      </IconButton>
      <IconButton 
        onClick={() => map.zoomOut()}
        sx={{ 
          bgcolor: "white", 
          boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
          "&:hover": { bgcolor: "#f5f5f5" },
          borderRadius: "8px",
          p: 1
        }}
      >
        <RemoveIcon sx={{ color: "#0062E3" }} />
      </IconButton>
    </Box>
  );
}

const HotelMap = ({ 
  hotels = [], 
  center = [33.6844, 73.0479], 
  onHotelClick, 
  zoom = 13, 
  interactive = true,
  hoveredHotelId = null 
}) => {
  // Fix for default marker icons if needed (though we use custom icons)
  useEffect(() => {
    delete L.Icon.Default.prototype._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
      iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
      shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
    });
  }, []);

  return (
    <MapContainer
      key="hotel-map-container"
      center={center}
      zoom={zoom}
      style={{ height: "100%", width: "100%", zIndex: 1 }}
      zoomControl={false}
      dragging={interactive}
      scrollWheelZoom={interactive}
      doubleClickZoom={interactive}
      touchZoom={interactive}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      
      {interactive && <MapControls center={center} />}

      {hotels.map((hotel) => (
        <Marker 
          key={`${hotel.id}-${hoveredHotelId === hotel.id}`} // Re-render when hover state changes
          position={hotel.coords || [33.6844 + (Math.random() - 0.5) * 0.05, 73.0479 + (Math.random() - 0.5) * 0.05]} 
          icon={createPriceIcon(hotel.price, hoveredHotelId === hotel.id)}
          eventHandlers={{
            click: () => {
              if (interactive && onHotelClick) onHotelClick(hotel.id);
            },
          }}
          zIndexOffset={hoveredHotelId === hotel.id ? 1000 : 0} // Ensure hovered marker is on top
        >
          <Popup>
            <div style={{ padding: "5px" }}>
              <div style={{ fontWeight: 700, fontSize: "14px", marginBottom: "4px" }}>{hotel.name}</div>
              <div style={{ color: "#626971", fontSize: "12px" }}>{hotel.location}</div>
              <div style={{ fontWeight: 700, marginTop: "8px", fontSize: "14px" }}>Rs {hotel.price} <span style={{ fontWeight: 400, fontSize: "12px" }}>per night</span></div>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default React.memo(HotelMap);
