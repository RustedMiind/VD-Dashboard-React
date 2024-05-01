import {
  MapContainer,
  TileLayer,
  Marker,
  useMapEvents,
  Polyline,
  Polygon,
} from "react-leaflet";
import { Icon, LeafletMouseEvent } from "leaflet";
import { Box, IconButton, Stack, Typography } from "@mui/material";
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
  console.log("Center ", lat, long);
  let _centerLat = lat,
    _centerLong = long;
  if (!!positionClick.length) {
    let n = positionClick.length;
    for (let i = 0; i < n; i++) {
      let _position = positionClick[i];
      _centerLat += _position[0];
      _centerLong += _position[1];
    }
    _centerLat /= positionClick.length;
    _centerLong /= positionClick.length;
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
  console.log("Breakpoint positionClick", positionClick);
  return (
    <Stack
      sx={{
        width: "100%",
        height: "340px",
        margin: "auto",
      }}
    >
      <MapContainer
        center={[lat, long]}
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
