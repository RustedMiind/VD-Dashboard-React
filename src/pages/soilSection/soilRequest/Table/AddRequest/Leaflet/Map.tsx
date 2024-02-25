import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import { Stack } from "@mui/material";
import { Icon } from "leaflet";
import img1 from "../../../../../../assets/images/pngwing.com.png";

export function Map() {
  const [selectedPin, setSelectedPin] = useState<[number, number] | null>(null);
  const customIcon = new Icon({
    iconUrl: img1,
    iconSize: [50, 50],
  });

  const handlePinClick = (position: [number, number]) => {
    setSelectedPin(position);
  };

  const MapClickHandler = () => {
    const map = useMapEvents({
      click: (event) => {
        const { lat, lng } = event.latlng;
        const position: [number, number] = [lat, lng];
        handlePinClick(position);
      },
    });

    return null;
  };

  return (
    <Stack
      sx={{
        width: "100%",
        height: "350px",
        margin: "auto",
      }}
    >
      <MapContainer
        center={[51.505, -0.09]}
        zoom={15}
        scrollWheelZoom={true}
        style={{ width: "100%", height: "100%", position: "relative" }}
      >
        <TileLayer
          className="tile"
          opacity={0.5}
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {selectedPin && <Marker position={selectedPin} icon={customIcon} />}
        <MapClickHandler />
      </MapContainer>
    </Stack>
  );
}
