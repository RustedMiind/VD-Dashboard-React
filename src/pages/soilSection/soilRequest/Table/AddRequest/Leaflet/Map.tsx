import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import { Stack } from "@mui/material";
import { Icon } from "leaflet";
import img1 from "../../../../../../assets/images/pngwing.com.png";
import { normalizeLongitude } from "../../../../../../methods/normalizeLongitude";

export function MapComponent({
  selectedPin,
  setSelectedPin,
  handleCloseMap,
}: PropsType) {
  const [center, setCenter] = useState<[number, number]>([
    24.774265, 46.738586,
  ]);
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
        const long = normalizeLongitude(lng);
        const position: [number, number] = [lat, long];
        handlePinClick(position);
        if (long !== lng) {
          setCenter([lat, long]);
        }
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
        key={`${(center[0], center[1])}`}
        center={center}
        zoom={7}
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

type SelectedPinType = [number, number] | null;

type PropsType = {
  selectedPin: SelectedPinType;
  setSelectedPin: (value: SelectedPinType) => void;
  handleCloseMap: () => void;
};
