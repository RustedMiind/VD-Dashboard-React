// --- (1), (2) & (3): install and import ---
import {
  MapContainer,
  TileLayer,
  Marker,
  useMapEvents,
} from "react-leaflet";
import { Icon, LeafletMouseEvent } from "leaflet";
import { Box, Stack } from "@mui/material";
import img1 from "../../../../assets/images/pngwing.com.png";
import { SetStateAction } from "react";

let TargetPositions: [number, number][] = [];

const MapClickHandler: React.FC<MapClickHandlerProps> = ({ onMapClick }) => {
  const map = useMapEvents({
    click: (event: LeafletMouseEvent) => {
      const { lat, lng } = event.latlng;
      const position: [number, number] = [lat, lng];
      TargetPositions.push(position);
      onMapClick(position);
    },
  });

  return null;
};

export function ShowMap({position,setPosition}:PropsType) {
  const customIcon = new Icon({
    iconUrl: img1,
    iconSize: [20, 20],
  });

  return (
    <Stack
      sx={{
        width: "80vw",
        height: "440px",
        margin: "auto",
      }}
    >
      <MapContainer
        center={[...position]}
        zoom={15}
        scrollWheelZoom={true}
        style={{ width: "100%", height: "100%", position: "relative" }}
      >
        {/* First TileLayer with background color */}
        <TileLayer
          className="tile"
          opacity={0.5}
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[...position]} icon={customIcon}></Marker>

        <MapClickHandler
          onMapClick={(p) => {
            console.log("Map is clicked",p);
            setPosition([...p])
          }}
        />

        <Box
          sx={{
            display: "flex",
            justifyContent: "end",
            mt: 2,
            position: "absolute",
            right: "10px",
            top: "60px",
            zIndex: "100000",
            bgcolor: "primary.contrastText",
          }}
        ></Box>
      </MapContainer>
    </Stack>
  );
}

interface MapClickHandlerProps {
  onMapClick: (position: [number, number]) => void;
}

type PropsType = {
    position: [number, number];
    setPosition: React.Dispatch<SetStateAction<[number, number]>>;
};
