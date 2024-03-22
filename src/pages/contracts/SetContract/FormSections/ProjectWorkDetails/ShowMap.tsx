import {
  MapContainer,
  TileLayer,
  Marker,
  useMapEvents,
  Polyline,
  Polygon,
} from "react-leaflet";
import { Icon, LeafletMouseEvent } from "leaflet";
import { Box, IconButton, Stack } from "@mui/material";
import ReplayIcon from "@mui/icons-material/Replay";
import { normalizeLongitude } from "../../../../../methods/normalizeLongitude";

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
export function ShowMap({
  positionClick,
  setPositionClick,
  lat,
  long,
}: PropsType) {
  let centerLat = lat,
    centerLong = long;

  if (!!positionClick.length) {
    positionClick.forEach(([lat, lng]) => {
      centerLat += lat;
      centerLong += lng;
    });
    centerLat /= positionClick.length;
    centerLong /= positionClick.length;
  }

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
  const handleMapClick = (position: [number, number]) => {
    const positionHandler: [number, number] = [
      position[0],
      normalizeLongitude(position[1]),
    ];
    setPositionClick([...positionClick, positionHandler]);
    // let _positions: { lat: number; long: number }[] = TargetPositions.map(
    //   (ele) => ({ lat: ele[0], long: ele[1] })
    // );
    // updateAmountData({ map: _positions });
  };
  const handleResetClick = () => {
    setPositionClick([]);
  };

  return (
    <Stack
      sx={{
        width: "100%",
        height: "340px",
        margin: "auto",
      }}
    >
      <MapContainer
        center={[centerLat, centerLong]}
        zoom={3}
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
        {/* Second TileLayer without background color */}
        <Polygon
          positions={positionClick}
          pathOptions={{ fillColor: "yellow", fillOpacity: 0.4 }}
        />

        <MapClickHandler onMapClick={(p) => handleMapClick(p)} />
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
  lat: number;
  long: number;
};
