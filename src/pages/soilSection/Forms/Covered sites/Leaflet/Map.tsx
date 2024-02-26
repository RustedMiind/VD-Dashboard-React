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
import { TypeLocationData } from "../Dialog";
import ReplayIcon from "@mui/icons-material/Replay";
import { IconButton } from "@mui/material";
import { normalizeLongitude } from "../../../../../methods/normalizeLongitude";
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
export function Map({
  all,
  positionClick,
  setPositionClick,
  updateAmountData,
}: PropsType) {
  const [center, setCenter] = useState<[number, number]>([
    24.774265, 46.738586,
  ]);
  const handleMapClick = (position: [number, number]) => {
    const positionHandler: [number, number] = [
      position[0],
      normalizeLongitude(position[1]),
    ];
    if (position[1] !== positionHandler[1]) {
      setCenter([position[0], positionHandler[1]]);
    }
    setPositionClick([...positionClick, positionHandler]);
    let _positions: { lat: number; long: number }[] = TargetPositions.map(
      (ele) => ({ lat: ele[0], long: ele[1] })
    );
    updateAmountData({ map: _positions });
  };
  const handleResetClick = () => {
    setPositionClick([]);
    TargetPositions = [];
  };
  function createPolylines() {
    const polylines = [];
    if (positionClick) {
      for (let i = 0; i < positionClick.length - 1; i++) {
        const startPoint = positionClick[i];
        const endPoint = positionClick[i + 1];
        const polyline = (
          <Polyline key={i} positions={[startPoint, endPoint]} />
        );
        polylines.push(polyline);
      }
    }

    return polylines;
  }

  return (
    <Stack
      sx={{
        width: "100%",
        height: all ? "500px" : "350px",
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
        {/* First TileLayer with background color */}
        <TileLayer
          className="tile"
          opacity={0.5}
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Polygon
          positions={positionClick}
          pathOptions={{ fillColor: "yellow", fillOpacity: 0.4 }}
        />

        <MapClickHandler onMapClick={handleMapClick} />
        {createPolylines()}
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
        >
          <IconButton onClick={handleResetClick}>
            <ReplayIcon />
          </IconButton>
        </Box>
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
  all?: boolean;
};
