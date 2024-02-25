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
import { Box, Stack } from "@mui/material";
import ReplayIcon from "@mui/icons-material/Replay";
import { IconButton } from "@mui/material";
import { TypeLocationData } from "../../../../Forms/Covered sites/Dialog";
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
export function Map() {
  const [center, setCenter] = useState({ lat: 21.4925, lng: 39.17757 });

  const handleMapClick = (position: [number, number]) => {
    // setPositionClick([...positionClick, position]);
    let _positions: { lat: number; long: number }[] = TargetPositions.map(
      (ele) => ({ lat: ele[0], long: ele[1] })
    );
  };

  // function createPolylines() {
  //   const polylines = [];
  //   if (positionClick) {
  //     for (let i = 0; i < positionClick.length - 1; i++) {
  //       const startPoint = positionClick[i];
  //       const endPoint = positionClick[i + 1];
  //       const polyline = (
  //         <Polyline key={i} positions={[startPoint, endPoint]} />
  //       );
  //       polylines.push(polyline);
  //     }
  //   }

  //   return polylines;
  // }
  return (
    <Stack
      sx={{
        width: "100%",
        margin: "auto",
      }}
    >
      <MapContainer
        center={center}
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
        {/* <Polygon
          positions={positionClick}
          pathOptions={{ fillColor: "yellow", fillOpacity: 0.4 }}
        /> */}

        <MapClickHandler onMapClick={handleMapClick} />
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
  positionClick?: [number, number][];
  setPositionClick?: React.Dispatch<React.SetStateAction<[number, number][]>>;
  updateAmountData?: (partial: Partial<TypeLocationData>) => void;
  all?: boolean;
};
