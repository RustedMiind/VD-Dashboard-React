// --- (1), (2) & (3): install and import ---
import {
  MapContainer,
  TileLayer,
  Marker,
  useMapEvents,
  Polyline,
  Polygon,
} from "react-leaflet";
import { Icon, LeafletMouseEvent } from "leaflet";
import { useState } from "react";
import { Button, Stack } from "@mui/material";
import { TypeLocationData } from "../Dialog";

const MapClickHandler: React.FC<MapClickHandlerProps> = ({ onMapClick }) => {
  const map = useMapEvents({
    click: (event: LeafletMouseEvent) => {
      const { lat, lng } = event.latlng;
      const position: [number, number] = [lat, lng];
      onMapClick(position);
    },
  });

  return null;
};
export function Map({
  positionClick,
  setPositionClick,
  updateAmountData,
}: PropsType) {
  const [center, setCenter] = useState({ lat: 13.084622, lng: 80.248357 });
  const customIcon = new Icon({
    iconUrl: "/icons8-select-24.png",
    iconSize: [20, 20],
  });
  const handleMapClick = (position: [number, number]) => {
    setPositionClick([...positionClick, position]);
    updateAmountData({});
  };
  const handleResetClick = () => {
    setPositionClick([]);
  };

  function createPolylines() {
    const polylines = [];

    for (let i = 0; i < positionClick.length - 1; i++) {
      const startPoint = positionClick[i];
      const endPoint = positionClick[i + 1];
      const polyline = <Polyline key={i} positions={[startPoint, endPoint]} />;
      polylines.push(polyline);
    }

    return polylines;
  }

  return (
    <Stack>
      <MapContainer center={center} zoom={12} scrollWheelZoom={true}>
        {/* First TileLayer with background color */}
        <TileLayer
          className="tile"
          opacity={0.5}
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Second TileLayer without background color */}
        <Polygon
          positions={positionClick}
          pathOptions={{ fillColor: "yellow", fillOpacity: 0.4 }}
        />

        <Marker position={[13.084622, 80.248357]} icon={customIcon}></Marker>
        <MapClickHandler onMapClick={handleMapClick} />
        {createPolylines()}
        <Button onClick={handleResetClick}>Reset</Button>
      </MapContainer>
    </Stack>
  );
}

interface MapClickHandlerProps {
  onMapClick: (position: [number, number]) => void;
}

type PropsType = {
  positionClick: [number, number][];
  setPositionClick: React.Dispatch<React.SetStateAction<[number, number][]>>;
  updateAmountData: (partial: Partial<TypeLocationData>) => void;
};
